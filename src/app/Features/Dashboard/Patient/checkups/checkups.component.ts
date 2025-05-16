import { Component, inject } from '@angular/core';
import { Checkup } from './../../../../utils/Interfaces';
import { CardModule } from 'primeng/card';
import { AddCheckupComponent } from './add-checkup/add-checkup.component';
import { PatientService } from '../patient.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-checkups',
  imports: [
    CardModule,
    ButtonModule,
    CardModule,
    RouterOutlet,
    TabsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './checkups.component.html',
  styleUrl: './checkups.component.css',
})
export class CheckupsComponent {
  tabs = [
    {
      label: 'My Checkups',
      route: 'my-checkups',
      icon: 'pi pi-home',
    },
    {
      label: 'Doctors Checkups',
      route: 'doctors-checkups',
      icon: 'pi pi-chart-line',
    },
  ];
  
}
