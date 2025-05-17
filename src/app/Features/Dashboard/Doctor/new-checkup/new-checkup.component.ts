import { Component, inject, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { SpecializationComponent } from '../../../../Shared/side-bar-item/specializations/specialization/specialization.component';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../Core/services/auth/auth.service';
import { Prescription } from '../../../../utils/Interfaces';
import { PrescriptionComponent } from '../../../../Shared/side-bar-item/prescription/prescription/prescription.component';
import { PrescriptionService } from '../../../../Shared/side-bar-item/prescription/prescription/prescription.service';

@Component({
  selector: 'app-new-checkup',
  templateUrl: './new-checkup.component.html',
  styleUrls: ['./new-checkup.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    ChipsModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    TextareaModule,
    SpecializationComponent,
    PrescriptionComponent
  ]
})
export class NewCheckupComponent implements OnInit {
  private authService = inject(AuthService)
  private doctorService = inject(DoctorService)
  private prescriptionService = inject(PrescriptionService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  currentUser: any; 
  checkupForm: FormGroup = new FormGroup({
    type: new FormControl('checkup', Validators.required),
    checkupDate: new FormControl(new Date(), Validators.required),
    specialization: new FormControl(null, Validators.required),
    symptoms: new FormControl([]),
    doctorSigns: new FormControl([]),
    diagnosis: new FormControl(''),
    doctorRecommendations: new FormControl(''),
  });
  prescription: Prescription | null = null;
  showPrescriptionModal = false;
  types = [
    { label: 'Checkup', value: 'checkup' },
    { label: 'Follow-up', value: 'follow-up' }
  ];
      ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  handlePrescriptionSave(savedPrescription: Prescription) {
    this.prescription = savedPrescription;
    this.showPrescriptionModal = false;
    console.log('Saved prescription:', savedPrescription);
  }

  
  submit(): void {
  const doctorId = this.currentUser?.doctor?._id;
  const createdBy = this.currentUser?._id;
  const patientId = this.route.snapshot.params['id'];

  const checkupPayload = {
    ...this.checkupForm.value,
    patientId,
    doctorId,
    createdBy,
  };

  if (this.checkupForm.valid) {
    this.doctorService.addCheckup(checkupPayload).subscribe({
      next: (checkupResponse) => {
        console.log('Checkup response:', checkupResponse);

        if (this.prescription) {
          const prescriptionPayload = {
            ...this.prescription,
            checkupId: checkupResponse._id,
            doctorId,
            patientId,
          };
          this.prescriptionService.addPrescription(prescriptionPayload).subscribe({
            next: (prescriptionResponse) => {
              console.log('Prescription response:', prescriptionResponse);
            },
            error: (error) => {
              console.error('Error adding prescription:', error);
            },
            complete: () => {
              console.log('Prescription added successfully!');
            }
          });
        }
      },
      error: (error) => {
        console.error('Error adding checkup:', error);
      },
      complete: () => {
        console.log('Checkup added successfully!');
        this.router.navigate(['/dashboard/doctor/current-patients']);
      }
    });
  } else {
    this.checkupForm.markAllAsTouched();
  }
}

}