import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-my-checkups',
  imports: [
    CardModule,
    ButtonModule,
    CardModule,
    TabsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './my-checkups.component.html',
  styleUrl: './my-checkups.component.css',
})
export class MyCheckupsComponent {
  private patientService = inject(PatientService);
  myOwnCheckups = this.patientService.myOwnCheckups;
  ngOnInit() {
    this.patientService.fetchCheckups();
  }
}
