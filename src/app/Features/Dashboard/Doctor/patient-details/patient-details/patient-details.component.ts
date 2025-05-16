import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html'
})
export class PatientDetailsComponent implements OnInit {
  patientDetails: any;
  private route = inject(ActivatedRoute);
  private patientService = inject(DoctorService);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getPatientDetails(id);
    }
  }

  getPatientDetails(id: string) {
    this.patientService.getPatientById(id).subscribe({
      next: (res) => {
        this.patientDetails = res.patient;
        console.log(this.patientDetails);
      },
      error: (err) => {
        console.error('Error fetching patient:', err);
      }
    });
  }
}