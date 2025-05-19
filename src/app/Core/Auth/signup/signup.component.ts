import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { SpecializationComponent } from '../../../Shared/side-bar-item/specializations/specialization/specialization.component';

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
    MessageModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    SpecializationComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  private router = inject(Router);
  isLoading = false; // Add loading state
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
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    profileImage: new FormControl(null),
    agreeTerms: new FormControl(false, Validators.requiredTrue),
    doctorInfo: new FormGroup({
      specialization: new FormControl(null),
      bio: new FormControl('', []),
      experience: new FormControl(null, []),
      clinicAddress: new FormGroup({
        street: new FormControl('', []),
        city: new FormControl('', []),
        state: new FormControl('', []),
        country: new FormControl('', [])
      }),
      certificates: new FormArray([])
    })
  });

  profileImagePreview: string | null = null;
  certificatePreviews: string[] = [];

  roles = [
    { label: 'Patient', value: 'patient' },
    { label: 'Doctor', value: 'doctor' },
  ];

  specializations: { label: string, value: string }[] = [];

  // Implement ngOnInit
  ngOnInit(): void {
  // this.fetchSpecializations();
}
  get certificates(): FormArray {
    return this.form.get('doctorInfo.certificates') as FormArray;
  }

  addCertificate() {
    this.certificates.push(new FormGroup({
      name: new FormControl('', Validators.required),
      copy: new FormControl(null, Validators.required)
    }));
  }

  removeCertificate(index: number) {
    this.certificates.removeAt(index);
    this.certificatePreviews.splice(index, 1);
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.patchValue({ profileImage: file });
      const reader = new FileReader();
      reader.onload = () => this.profileImagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onCertificateUpload(event: any, index: number) {
    const file = event.files[0];
    if (file) {
      const certificateGroup = this.certificates.at(index) as FormGroup;
      certificateGroup.patchValue({ copy: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.certificatePreviews[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.isLoading = true;
      const formValue = this.form.value;

      const formData = new FormData();

      // Basic user info
      formData.append('firstName', formValue.firstName);
      formData.append('lastName', formValue.lastName);
      formData.append('email', formValue.email);
      formData.append('nationalId', formValue.nationalId);
      formData.append('phone', formValue.phone);
      formData.append('dateOfBirth', formValue.dateOfBirth);
      formData.append('role', formValue.role);
      formData.append('password', formValue.password);
      formData.append('street', formValue.street || '');
      formData.append('city', formValue.city || '');
      formData.append('state', formValue.state || '');
      formData.append('country', formValue.country || '');

      // Profile image
      if (formValue.profileImage) {
        formData.append('profileImage', formValue.profileImage);
      }

      // Doctor-specific info if role is doctor
      if (formValue.role === 'doctor') {
        const doctorInfo = formValue.doctorInfo;

        formData.append('specialization', doctorInfo.specialization || '');
        formData.append('bio', doctorInfo.bio || '');
        formData.append('experience', doctorInfo.experience?.toString() || '');

        formData.append('clinicStreet', doctorInfo.clinicAddress.street || '');
        formData.append('clinicCity', doctorInfo.clinicAddress.city || '');
        formData.append('clinicState', doctorInfo.clinicAddress.state || '');
        formData.append('clinicCountry', doctorInfo.clinicAddress.country || '');

        doctorInfo.certificates.forEach((cert: any, index: number) => {
          formData.append(`certificates[${index}][name]`, cert.name);
          formData.append(`certificates[${index}][copy]`, cert.copy);
        });
      }

      // Call the API
      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful! Redirecting to login...',
            life: 3000
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Registration failed:', err);
          this.isLoading = false;

          // Handle duplicate entry errors
          if (err.error && err.error.message) {
            if (err.error.message.includes('email')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'This email is already registered',
                life: 5000
              });
              this.form.get('email')?.setErrors({ duplicate: true });
            }
            else if (err.error.message.includes('phone')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'This phone number is already registered',
                life: 5000
              });
              this.form.get('phone')?.setErrors({ duplicate: true });
            }
            else if (err.error.message.includes('nationalId')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'This national ID is already registered',
                life: 5000
              });
              this.form.get('nationalId')?.setErrors({ duplicate: true });
            }
            else {
              // Generic error message
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Registration failed: ' + err.error.message,
                life: 5000
              });
            }
          } else {
            // Network or server error
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Registration failed. Please try again later.',
              life: 5000
            });
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields correctly',
        life: 5000
      });
    }
  }

  getCertificateControl(index: number): FormGroup {
    return this.certificates.at(index) as FormGroup;
  }
  getCertificateNameControl(i: number): FormControl {
  return this.getCertificateControl(i).get('name') as FormControl;
}
}
