import { TestBed } from '@angular/core/testing';

import { ActividadProgramaService } from './actividad-programa.service';

describe('ActividadProgramaService', () => {
  let service: ActividadProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
