import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalleApComponent } from './reporte-detalle-ap.component';

describe('ReporteDetalleApComponent', () => {
  let component: ReporteDetalleApComponent;
  let fixture: ComponentFixture<ReporteDetalleApComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDetalleApComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDetalleApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
