import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDetail } from './employe-detail';

describe('EmployeDetail', () => {
  let component: EmployeDetail;
  let fixture: ComponentFixture<EmployeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
