import { TestBed } from '@angular/core/testing';

import { ContratoActividadService } from './contrato-actividad.service';

describe('ContratoActividadService', () => {
  let service: ContratoActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
