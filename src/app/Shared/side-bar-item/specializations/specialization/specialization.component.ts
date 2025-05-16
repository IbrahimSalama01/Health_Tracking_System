import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../specialization.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-specialization',
  imports: [DropdownModule],
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.css'
})
export class SpecializationComponent implements OnInit {
  specializations = <any>[]

  constructor(private specializationService: SpecializationService) {}

  ngOnInit(): void {
      this.fetchSpecializations();
  }
  fetchSpecializations(){
    this.specializationService.getSpecializations().subscribe({
      next: (res) => {
        this.specializations = res;
        console.log(this.specializations);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      }
    })
  }

}
