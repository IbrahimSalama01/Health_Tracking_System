import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCheckupsComponent } from './my-checkups.component';

describe('MyCheckupsComponent', () => {
  let component: MyCheckupsComponent;
  let fixture: ComponentFixture<MyCheckupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCheckupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCheckupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
