import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  if (!token) {
    return router.createUrlTree(['/login']);
  }
  else
    return true;
};
