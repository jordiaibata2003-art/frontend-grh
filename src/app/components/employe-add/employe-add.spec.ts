import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAdd } from './employe-add';

describe('EmployeAdd', () => {
  let component: EmployeAdd;
  let fixture: ComponentFixture<EmployeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
