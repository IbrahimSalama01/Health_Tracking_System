import { environment } from './../../../environments/environment';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { inject } from '@angular/core';
import {Router} from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
// import {AuthService} from '../..//Core/services/auth/auth.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  // const authService = inject(AuthService);
  const excludedUrls = ['/login', '/register','/reset-password'];
  const url = req.url;


  const urlParts = url.split('/');

  if (!excludedUrls.includes(urlParts[-1]))  {
    const token = localStorage.getItem('token');
    // const token = firstValueFrom(authService.token$);
    console.log("Intercepted");
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
