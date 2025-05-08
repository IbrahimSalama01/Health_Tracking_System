import { Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PrimeNG } from 'primeng/config';
import { Certification } from './../../../../utils/Interfaces';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-my-doctors',
  imports: [
    ButtonModule,
    CardModule,
    RouterOutlet,
    TabsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './my-doctors.component.html',
  styleUrl: './my-doctors.component.css',
})
export class MyDoctorsComponent {
  // constructor(private primeng: PrimeNG) {}
  tabs = [
    {
      label: 'Accessed-Doctors',
      route: 'accessed-doctors',
      icon: 'pi pi-home',
    },
    { label: 'Prev-Doctors', route: 'prev-doctors', icon: 'pi pi-chart-line' },
    { label: 'Requests', route: 'requests', icon: 'pi pi-cog' },
  ];
}
