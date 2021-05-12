import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalleActividadesComponent } from './reporte-detalle-actividades.component';

describe('ReporteDetalleActividadesComponent', () => {
  let component: ReporteDetalleActividadesComponent;
  let fixture: ComponentFixture<ReporteDetalleActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDetalleActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDetalleActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
