import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAddComponent } from './contrat-add.component';

describe('ContratAddComponent', () => {
  let component: ContratAddComponent;
  let fixture: ComponentFixture<ContratAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
