import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const loggedInGuard: CanActivateFn = async (route, state) => {
   const router = inject(Router);
  const authService = inject(AuthService);

  const token = await firstValueFrom(authService.token$);
  const currentUser = await firstValueFrom(authService.user$);

  if (token && currentUser) {
    if(currentUser.role == 'doctor')
      return router.createUrlTree(['/dashboard/doctor']);
    else
      
      return router.createUrlTree(['/dashboard']);
  } else {
    return true;
  }
};
