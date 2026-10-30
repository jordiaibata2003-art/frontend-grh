import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaieAddComponent } from './paie-add.component';

describe('PaieAddComponent', () => {
  let component: PaieAddComponent;
  let fixture: ComponentFixture<PaieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaieAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
