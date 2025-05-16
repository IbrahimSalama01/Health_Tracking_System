import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-card',
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.css'
})
export class PatientCardComponent {
  patients = input<any[]>();
  private router = inject(Router);

  viewPatient(id: string) {
  this.router.navigateByUrl(`/doctor/patientdetails/${id}`);
}
}
