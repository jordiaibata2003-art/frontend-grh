import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeList } from './conge-list';

describe('CongeList', () => {
  let component: CongeList;
  let fixture: ComponentFixture<CongeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeList],
    }).compileComponents();

    fixture = TestBed.createComponent(CongeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
