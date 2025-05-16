import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCheckupsComponent } from './doctors-checkups.component';

describe('DoctorsCheckupsComponent', () => {
  let component: DoctorsCheckupsComponent;
  let fixture: ComponentFixture<DoctorsCheckupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsCheckupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsCheckupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
