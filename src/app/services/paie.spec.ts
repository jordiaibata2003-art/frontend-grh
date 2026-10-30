import { TestBed } from '@angular/core/testing';

import { Paie } from './paie';

describe('Paie', () => {
  let service: Paie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Paie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
