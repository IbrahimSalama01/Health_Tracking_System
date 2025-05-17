import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpecializationService } from '../specialization.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialization',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpecializationComponent),
      multi: true
    }
  ]
})
export class SpecializationComponent implements OnInit, ControlValueAccessor {
  specializations: any[] = [];
  value: any;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private specializationService: SpecializationService) {}

  ngOnInit(): void {
    this.specializationService.getSpecializations().subscribe({
      next: (res) => this.specializations = res,
      error: (err) => console.error(err),
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
