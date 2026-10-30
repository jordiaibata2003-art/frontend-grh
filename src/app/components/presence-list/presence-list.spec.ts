import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceList } from './presence-list';

describe('PresenceList', () => {
  let component: PresenceList;
  let fixture: ComponentFixture<PresenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenceList],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
