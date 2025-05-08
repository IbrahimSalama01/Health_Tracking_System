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
      name: 'ِAhmed',
      specialization: 'Electronics',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certifications: [
        {
          certificateName: 'cancer',
          date: new Date(),
        },
      ],
      profileImage:
        'https://familydoctor.org/wp-content/uploads/2018/02/41808433_l-848x566.jpg',
    },
    {
      name: 'Ali',
      specialization: 'Furniture',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certifications: [
        {
          certificateName: 'cancer',
          date: new Date(),
        },
      ],
      profileImage:
        'https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg',
    },
    {
      name: 'Khaled',
      specialization: 'Electronics',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certifications: [
        {
          certificateName: 'cancer',
          date: new Date(),
        },
      ],
      profileImage:
        'https://cdn.prod.website-files.com/62d4f06f9c1357a606c3b7ef/65ddf3cdf19abaf5688af2f8_shutterstock_1933145801%20(1).jpg',
    },
  ];
}
