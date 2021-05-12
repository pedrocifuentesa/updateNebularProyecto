import { TestBed } from '@angular/core/testing';

import { PaseService } from './pase.service';

describe('PaseService', () => {
  let service: PaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
