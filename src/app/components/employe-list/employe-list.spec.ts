import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeList } from './employe-list';

describe('EmployeList', () => {
  let component: EmployeList;
  let fixture: ComponentFixture<EmployeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
