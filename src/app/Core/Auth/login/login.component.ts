import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule,} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submitLogin() {
    if (this.form.valid) {
      const credentials = this.form.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful! Redirecting...',
            life: 3000,
          });

          setTimeout(() => {
            if (response.user.role === 'patient') {
              this.router.navigate(['/dashboard']);
            } else if (response.user.role === 'doctor') {
              this.router.navigate(['/dashboard/doctor']);
            }
          }, 3000);
        },
        error: (err) => {
          console.error('Login failed:', err);

          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'Invalid credentials or server error.',
            life: 5000,
          });

          this.form.get('password')?.setErrors({ invalid: true });
        },
      });
    } else {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.',
        life: 5000,
      });
    }
  }
}
