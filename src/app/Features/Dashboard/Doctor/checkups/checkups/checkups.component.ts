import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { PrescriptionService } from '../../../../../Shared/side-bar-item/prescription/prescription/prescription.service';
import { CheckupCardComponent } from '../checkup-card/checkup-card.component';

@Component({
  selector: 'app-checkups',
  imports: [CheckupCardComponent],
  templateUrl: './checkups.component.html',
  styleUrl: './checkups.component.css'
})
export class CheckupsComponent implements OnInit {
  checkups = <any>[];
  private doctorService = inject(DoctorService)
  private prescriptionService = inject(PrescriptionService)

  ngOnInit(){
    this.fetchCheckups();
  }

  fetchCheckups(){
    this.doctorService.getCheckups().subscribe({
      next: res => {
        this.checkups = res.myOwnCheckups,
        console.log(this.checkups);
      },
      error: err => console.log(err),
      complete: () => console.log('done')
    })
  }
}
