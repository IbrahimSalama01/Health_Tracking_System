import { Component } from '@angular/core';
import { Checkup } from './../../../../utils/Interfaces';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-checkups',
  imports: [CardModule],
  templateUrl: './checkups.component.html',
  styleUrl: './checkups.component.css',
})
export class CheckupsComponent {
  checkups: Checkup[] = [
    {
      _id: '1',
      createdBy: 'user123',
      threadId: 'thread456',
      doctorId: 'doctor789',
      patientId: 'patient321',
      type: 'checkup',
      specialization: 'Cardiology',
      checkupDate: new Date('2025-05-01'),
      symptoms: ['Chest pain', 'Shortness of breath'],
      doctorSigns: ['High blood pressure'],
      diagnosis: 'Mild hypertension',
      prescription: 'prescription111',
      doctorRecommendations: 'Exercise regularly and reduce salt intake.',
      followup: {
        needed: true,
        checkupId: '2',
        date: new Date('2025-05-20'),
        attended: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      createdBy: 'user124',
      threadId: 'thread457',
      doctorId: 'doctor790',
      patientId: 'patient322',
      type: 'follow-up',
      specialization: 'Dermatology',
      checkupDate: new Date('2025-04-15'),
      symptoms: ['Itchy skin'],
      doctorSigns: ['Redness'],
      diagnosis: 'Eczema',
      prescription: 'prescription222',
      doctorRecommendations: 'Use moisturizing cream twice daily.',
      followup: {
        needed: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
