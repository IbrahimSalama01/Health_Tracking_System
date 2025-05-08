import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-servies',
  imports: [AvatarModule ,CardModule],
  templateUrl: './servies.component.html',
  styleUrl: './servies.component.css'
})
export class ServiesComponent {
  avatarStyle = {
    backgroundColor: 'rgb(4, 110, 41)',
    color: '#ffffff'
  };

  services = [
    {
      title: 'Patient Management',
      label: '1',
      description: 'Patient Management involves efficiently tracking and coordinating a patient s medical care, records, and treatment plans to ensure better health outcomes'
    },
    {
      title: 'Analytics Dashboard',
      label: '2',
      description: 'Gain valuable insights with customizable reports and real-time analytics to optimize healthcare delivery.'
    },
    {
      title: 'Medication Tracking',
      label: '3',
      description: 'Monitor medication schedules, dosages, and inventory with automated alerts and refill reminders.'
    },
    {
      title: 'Mobile Access',
      label: '4',
      description: 'Access critical patient information anytime, anywhere with our secure mobile application.'
    }
  ];


}
