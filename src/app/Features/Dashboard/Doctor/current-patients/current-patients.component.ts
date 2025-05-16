import { Component, inject, OnInit } from '@angular/core';
import { PatientService } from '../../../../Core/Services/auth/patient.service';
import { PatientCardComponent } from './patient-card/patient-card/patient-card.component';

@Component({
  selector: 'app-current-patients',
  imports: [PatientCardComponent],
  templateUrl: './current-patients.component.html',
  styleUrl: './current-patients.component.css',
})
export class CurrentPatientsComponent implements OnInit {
  patients = <any>[];
  private patientService = inject(PatientService);
  ngOnInit() {
    this.getDoctorPatients();
  }
  getDoctorPatients() {
    this.patientService.getPatients().subscribe({
      next: res => {
        this.patients = res.patients;
        console.log(this.patients);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      },
    });
  }
}
