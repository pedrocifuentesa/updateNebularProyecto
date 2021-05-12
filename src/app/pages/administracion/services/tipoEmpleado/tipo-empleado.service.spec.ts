import { TestBed } from '@angular/core/testing';

import { TipoEmpleadoService } from './tipo-empleado.service';

describe('TipoEmpleadoService', () => {
  let service: TipoEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
