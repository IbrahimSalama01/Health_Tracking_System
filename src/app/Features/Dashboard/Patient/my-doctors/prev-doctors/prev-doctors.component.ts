import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-prev-doctors',
  imports: [ButtonModule, CardModule],
  templateUrl: './prev-doctors.component.html',
  styleUrl: './prev-doctors.component.css',
})
export class PrevDoctorsComponent {
  private patientService = inject(PatientService);
  doctors = this.patientService.oldDoctors;
  ngOnInit(){
    this.patientService.fetchDoctors();
  }
}
