import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteDetalleActividadesComponent } from './reporte-detalle-actividades/reporte-detalle-actividades.component';
import { ReporteDetalleApComponent } from './reporte-detalle-ap/reporte-detalle-ap.component';
import { ReporteDetalleCuadrillaComponent } from './reporte-detalle-cuadrilla/reporte-detalle-cuadrilla.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {
    path: 'reporte',
    component: ReporteComponent,
  },
  {
    path: 'cuadrilla',
    component: ReporteDetalleCuadrillaComponent,
  },
  {
    path: 'actividades',
    component: ReporteDetalleActividadesComponent,
  },
  {
    path: 'ap',
    component: ReporteDetalleApComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
