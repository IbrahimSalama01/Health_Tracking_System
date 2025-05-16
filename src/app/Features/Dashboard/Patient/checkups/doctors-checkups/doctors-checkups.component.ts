import { Component, inject } from '@angular/core';
import { PatientService } from '../../patient.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-doctors-checkups',
  imports: [
    CardModule,
    ButtonModule,
    CardModule,
    TabsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './doctors-checkups.component.html',
  styleUrl: './doctors-checkups.component.css',
})
export class DoctorsCheckupsComponent {
  private patientService = inject(PatientService);
  acceptedDoctorCheckups = this.patientService.acceptedDoctorCheckups;
  ngOnInit() {
    this.patientService.fetchCheckups();
  }
}
