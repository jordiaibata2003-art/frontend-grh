import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceAddComponent } from './presence-add.component';

describe('PresenceAddComponent', () => {
  let component: PresenceAddComponent;
  let fixture: ComponentFixture<PresenceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
