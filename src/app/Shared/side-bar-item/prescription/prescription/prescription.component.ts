import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { Prescription, Treatment } from '../../../../utils/Interfaces';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    CardModule
  ],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent implements OnChanges {
  @Input() visible = false;
  @Input() initialData: Prescription | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Prescription>();

  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      date: [new Date(), Validators.required],
      treatments: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.prescriptionForm.patchValue({
        date: this.initialData.date ? new Date(this.initialData.date) : new Date()
      });
      this.treatments.clear();
      this.initialData.treatments.forEach((t: Treatment) => {
        this.treatments.push(this.createTreatmentGroup(t));
      });
    } else if (changes['visible'] && !this.visible) {
      this.prescriptionForm.reset();
      this.treatments.clear();
    }
  }

  get treatments(): FormArray {
    return this.prescriptionForm.get('treatments') as FormArray;
  }

  createTreatmentGroup(data: Partial<Treatment> = {}): FormGroup {
    return this.fb.group({
      name: [data.name || '', Validators.required],
      concentration: [data.concentration || '', Validators.required],
      dose: [data.dose || '', Validators.required],
      frequency: [data.frequency || '', Validators.required],
      duration: [data.duration || '', Validators.required],
      notes: [data.notes || '']
    });
  }

  addTreatment() {
    this.treatments.push(this.createTreatmentGroup());
  }

  removeTreatment(index: number) {
    this.treatments.removeAt(index);
  }

  save() {
    if (this.prescriptionForm.valid) {
      this.submit.emit(this.prescriptionForm.value as Prescription);
    }
  }

  cancel() {
    this.visible = false;
    this.close.emit();
  }
}
