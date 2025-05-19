import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { throwError, from, switchMap, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const excludedUrls = ['/login', '/register', '/reset-password'];
  const url = req.url;
  const urlParts = url.split('/');
  const lastSegment = '/' + urlParts[urlParts.length - 1];

  // Bypass excluded URLs
  if (!excludedUrls.includes(lastSegment)) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => error);
        }

        // Call AuthService to get new tokens
        return from(authService.getRefreshedToken()).pipe(
          switchMap((tokens: { token: string, refreshToken: string } | null) => {
            if (tokens?.token && tokens?.refreshToken) {
              // Save new tokens
              localStorage.setItem('token', tokens.token);
              localStorage.setItem('refreshToken', tokens.refreshToken);

              const clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${tokens.token}`),
              });
              return next(clonedReq);
            } else {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => error);
            }
          }),
          catchError(refreshError => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
