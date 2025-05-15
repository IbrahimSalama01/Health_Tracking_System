import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { inject } from '@angular/core';
import {Router} from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
//import {AuthService} from '../Services/auth.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const excludedUrls = ['/login', '/signup', '/terms-and-conditions','/','/forgot-password','/reset-password'];
  const url = req.url;
  if (!excludedUrls.some((excludedUrl) => url.includes(excludedUrl))) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    else{
      router.navigate(['/login']);
    }
  }
  return next(req).pipe(
    finalize(() => {
      if (!excludedUrls.some((excludedUrl) => url.includes(excludedUrl))) {
        tap(() => {

          catchError((error:HttpErrorResponse) => {
            if (error.status === 401) {
              router.navigate(['/login']);
            }
            return throwError(() => error);
          })
        })
      }
    })
  );
};
