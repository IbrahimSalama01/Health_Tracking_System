import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Doctor } from '../../../../../utils/Interfaces';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-accessed-doctors',
  imports: [ButtonModule, CardModule],
  templateUrl: './accessed-doctors.component.html',
  styleUrl: './accessed-doctors.component.css',
})
export class AccessedDoctorsComponent {
  private patientService = inject(PatientService);
  doctors = this.patientService.currentDoctor;
  ngOnInit() {
    this.patientService.fetchDoctors();
  }
}
