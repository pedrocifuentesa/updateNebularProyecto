import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalleCuadrillaComponent } from './reporte-detalle-cuadrilla.component';

describe('ReporteDetalleCuadrillaComponent', () => {
  let component: ReporteDetalleCuadrillaComponent;
  let fixture: ComponentFixture<ReporteDetalleCuadrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDetalleCuadrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDetalleCuadrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
