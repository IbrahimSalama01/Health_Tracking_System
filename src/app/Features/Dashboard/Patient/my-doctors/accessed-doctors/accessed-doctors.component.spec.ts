import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessedDoctorsComponent } from './accessed-doctors.component';

describe('AccessedDoctorsComponent', () => {
  let component: AccessedDoctorsComponent;
  let fixture: ComponentFixture<AccessedDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessedDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessedDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
