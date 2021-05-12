import { TestBed } from '@angular/core/testing';

import { ContratoAreaService } from './contrato-area.service';

describe('ContratoAreaService', () => {
  let service: ContratoAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
