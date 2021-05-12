import { TestBed } from '@angular/core/testing';

import { ContratoParametrosService } from './contrato-parametros.service';

describe('ContratoParametrosService', () => {
  let service: ContratoParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
