import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';

import { Doctor } from './../../../../../utils/Interfaces';

@Component({
  selector: 'app-requests',
  imports: [ButtonModule, CardModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
 doctors: Doctor[] = [
    {
      id:"asdsad",
      specialization: 'Electronics',
      clinicAddress: '123 Electronics Street',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      experience: 5,
      user: {
        firstName: 'Ahmed',
        lastName: '',
        email: 'ahmed@example.com',
        phone: '123-456-7890',
        profileImage: 'https://familydoctor.org/wp-content/uploads/2018/02/41808433_l-848x566.jpg',
      },
    },
    {
      id:"asdsasdd",
      specialization: 'Furniture',
      clinicAddress: '456 Furniture Avenue',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      experience: 3,
      user: {
        firstName: 'Ali',
        lastName: '',
        email: 'ali@example.com',
        phone: '987-654-3210',
        profileImage: 'https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg',
      },
    },
    {
      id:"asdsasdasdasdasd",
      specialization: 'Electronics',
      clinicAddress: '789 Electronics Blvd',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      experience: 7,
      user: {
        firstName: 'Khaled',
        lastName: '',
        email: 'khaled@example.com',
        phone: '555-555-5555',
        profileImage: 'https://cdn.prod.website-files.com/62d4f06f9c1357a606c3b7ef/65ddf3cdf19abaf5688af2f8_shutterstock_1933145801%20(1).jpg',
      },
    },
  ];
}
