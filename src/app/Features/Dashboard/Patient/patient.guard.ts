import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../Core/services/auth/auth.service';
import { user } from '../../../utils/Interfaces';
export const patientGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
  let role = null;
  authService.user$.subscribe((user: user|null) => {
    role = user?.role
  });
  if (role != 'patient' && role != 'doctor') {
    return false;
  }
  return true;
};
