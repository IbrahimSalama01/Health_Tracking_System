import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { user } from '../../../utils/Interfaces';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;
  private isBrowser: boolean;

  private tokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<user | null>;
  private refreshTokenSubject: BehaviorSubject<string | null>;

  token$: Observable<string | null>;
  user$: Observable<user | null>;
  refreshToken$: Observable<string | null>;

  private refreshTimeout: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const token = this.isBrowser ? localStorage.getItem('token') : null;
    const userData = this.isBrowser ? localStorage.getItem('user') : null;
    const refreshToken = this.isBrowser ? localStorage.getItem('refreshToken') : null;

    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.userSubject = new BehaviorSubject<user | null>(
      userData ? JSON.parse(userData) : null
    );
    this.refreshTokenSubject = new BehaviorSubject<string | null>(refreshToken);

    this.token$ = this.tokenSubject.asObservable();
    this.user$ = this.userSubject.asObservable();
    this.refreshToken$ = this.refreshTokenSubject.asObservable();

    // If already logged in via localStorage, check token
    if (token && refreshToken && this.userSubject.value) {
      let exp: number | undefined;
      try {
        exp = jwtDecode<{ exp: number }>(token).exp;
      } catch (e) {
        console.error('Invalid token:', e);
        this.logout();
        return;
      }

      if (!exp || exp * 1000 < Date.now()) {
        // Token expired, try to refresh immediately
        this.getRefreshedToken();
      } else {
        // Token valid, schedule a refresh
        this.scheduleRefreshToken();
      }
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setSession(response.token, response.refreshToken, response.user);
        this.scheduleRefreshToken();
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
    }
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.refreshTokenSubject.next(null);

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  private setSession(token: string, refreshToken: string, user: user): void {
    this.userSubject.next(user);
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.setTokens(token, refreshToken);
  }
  private setTokens(token: string, refreshToken: string) {
    this.tokenSubject.next(token);
    this.refreshTokenSubject.next(refreshToken);
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

  async scheduleRefreshToken() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    console.log('Scheduling token refresh...');
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) return;

    let expirationDate: number;
    try {
      expirationDate = jwtDecode<{ exp: number }>(token).exp;
    } catch (e) {
      console.error('Failed to decode token for refresh scheduling:', e);
      this.logout();
      return;
    }

    const buffer = 60 * 1000; // 1 minute
    const timeToRefresh = (expirationDate * 1000 - Date.now()) - buffer;
    if (timeToRefresh <= 0) {
      console.warn('Token already expired or too close to expiry for scheduling.');
      return;
    }

    this.refreshTimeout = setTimeout(async () => {
      await this.getRefreshedToken();
    }, timeToRefresh);
  }
getRefreshedToken(): Observable<{ token: string; refreshToken: string } | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return of(null);

  return this.http
    .post<{ token: string; refreshToken: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
    .pipe(
      tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.scheduleRefreshToken();
      }),
      catchError((err) => {
        this.logout();
        return of(null);
      })
    );
}

}
