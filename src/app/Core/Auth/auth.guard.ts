import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = await firstValueFrom(authService.token$);
  const currentUser = await firstValueFrom(authService.user$);

  if (!token || !currentUser) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }
};
