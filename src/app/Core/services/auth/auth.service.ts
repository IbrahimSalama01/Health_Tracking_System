import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'process.env.API_URL/auth';

  constructor(private http: HttpClient) {}

  // method to register a new user
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
        catchError(this.handleError)
      );
  }

  // method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
