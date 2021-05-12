import { TestBed } from '@angular/core/testing';

import { PlanificacionEstimadaService } from './planificacion-estimada.service';

describe('PlanificacionEstimadaService', () => {
  let service: PlanificacionEstimadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanificacionEstimadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
