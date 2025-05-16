import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevDoctorsComponent } from './prev-doctors.component';

describe('PrevDoctorsComponent', () => {
  let component: PrevDoctorsComponent;
  let fixture: ComponentFixture<PrevDoctorsComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
