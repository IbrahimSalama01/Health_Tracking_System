import { Component, inject, OnInit } from '@angular/core';
import { PatientCardComponent } from './patient-card/patient-card/patient-card.component';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-current-patients',
  imports: [PatientCardComponent],
  templateUrl: './current-patients.component.html',
  styleUrl: './current-patients.component.css',
})
export class CurrentPatientsComponent implements OnInit {
  patients = <any>[];
  private doctorService = inject(DoctorService);
  ngOnInit() {
    this.getDoctorPatients();
  }
  getDoctorPatients() {
    this.doctorService.getPatients().subscribe({
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
