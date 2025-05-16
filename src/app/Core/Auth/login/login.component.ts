import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submitLogin() {
  if (this.form.valid) {
    const credentials = this.form.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Redirect to dashboard or home page
        if(response.user.role == 'patient'){
          this.router.navigate(['/dashboard']);}
        else if(response.user.role == 'doctor'){
          this.router.navigate(['/dashboard/doctor']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Optionally show error message in the UI
      }
    });
  } else {
    this.form.markAllAsTouched();
  }
}

}
