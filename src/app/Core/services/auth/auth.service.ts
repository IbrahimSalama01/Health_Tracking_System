import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { user } from '../../../utils/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;
  private isBrowser: boolean;

  private tokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<user | null>;

  token$: Observable<string | null>;
  user$: Observable<user | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const token = this.isBrowser ? localStorage.getItem('token') : null;
    const userData = this.isBrowser ? localStorage.getItem('user') : null;

    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.userSubject = new BehaviorSubject<user | null>(
      userData ? JSON.parse(userData) : null
    );

    this.token$ = this.tokenSubject.asObservable();
    this.user$ = this.userSubject.asObservable();
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setSession(response.token, response.user);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  private setSession(token: string, user: user): void {
    this.tokenSubject.next(token);
    this.userSubject.next(user);
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
