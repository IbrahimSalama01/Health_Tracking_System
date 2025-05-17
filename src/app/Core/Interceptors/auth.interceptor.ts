import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const excludedUrls = ['/login', '/register', '/reset-password'];
  const url = req.url;
  const authService = inject(AuthService);
  // Get the last part of the URL path for matching
  const urlParts = url.split('/');
  const lastSegment = '/' + urlParts[urlParts.length - 1];

  if (!excludedUrls.includes(lastSegment)) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      router.navigate(['/login']);
    }
  }

  return next(req).pipe(
    tap(() => {
      // Optional: Add logic here for successful responses if needed
    }),
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
