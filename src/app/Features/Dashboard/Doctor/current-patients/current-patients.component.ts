import { Component, inject, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DoctorService } from '../services/doctor.service';
=======
import { PatientService } from '../../../../Core/Services/auth/patient.service';
>>>>>>> 72527b1c6056c66b7704b4a73317aa905b9232ce
import { PatientCardComponent } from './patient-card/patient-card/patient-card.component';

@Component({
  selector: 'app-current-patients',
  imports: [PatientCardComponent],
  templateUrl: './current-patients.component.html',
  styleUrl: './current-patients.component.css',
})
export class CurrentPatientsComponent implements OnInit {
<<<<<<< HEAD
  patients = <any> []
  private patientService = inject(DoctorService)
  ngOnInit(){
=======
  patients = <any>[];
  private patientService = inject(PatientService);
  ngOnInit() {
>>>>>>> 72527b1c6056c66b7704b4a73317aa905b9232ce
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
