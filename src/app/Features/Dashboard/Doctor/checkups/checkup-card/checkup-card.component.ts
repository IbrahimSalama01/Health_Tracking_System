import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
@Component({
  selector: 'app-checkup-card',
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './checkup-card.component.html',
  styleUrl: './checkup-card.component.css'
})
export class CheckupCardComponent {
  checkups = input<any[]>();
}
