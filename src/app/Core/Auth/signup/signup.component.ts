import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DatePickerModule,
    SelectButtonModule,
    FileUploadModule,
    MessageModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nationalId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]),
    dateOfBirth: new FormControl(null),
    role: new FormControl(null, Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    profileImage: new FormControl(null),
    agreeTerms: new FormControl(false, Validators.requiredTrue)
  });

  profileImagePreview: string | null = null;

  roles = [
    { label: 'Patient', value: 'patient' },
    { label: 'Doctor', value: 'doctor' },
    { label: 'Admin', value: 'admin' },
  ];

  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.patchValue({ profileImage: file });
      const reader = new FileReader();
      reader.onload = () => this.profileImagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      // API
    } else {
      this.form.markAllAsTouched();
    }
  }
}
