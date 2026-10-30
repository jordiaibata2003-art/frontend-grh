import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaieList } from './paie-list';

describe('PaieList', () => {
  let component: PaieList;
  let fixture: ComponentFixture<PaieList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaieList],
    }).compileComponents();

    fixture = TestBed.createComponent(PaieList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
