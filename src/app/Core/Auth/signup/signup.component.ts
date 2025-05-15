import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
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
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { AuthService } from '../../services/auth/auth.service';

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
    InputNumberModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

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
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    profileImage: new FormControl(null),
    agreeTerms: new FormControl(false, Validators.requiredTrue),
    doctorInfo: new FormGroup({
      specialization: new FormControl(null, []),
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

  specializations = [
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Dermatology', value: 'dermatology' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Pediatrics', value: 'pediatrics' },
    { label: 'Orthopedics', value: 'orthopedics' }
  ];

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
        // Optionally, redirect the user or show a success message
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Optionally, show error messages in the UI
      }
    });
  } else {
    this.form.markAllAsTouched();
  }
}

  // Helper method to get certificate control
  getCertificateControl(index: number): FormGroup {
    return this.certificates.at(index) as FormGroup;
  }
}