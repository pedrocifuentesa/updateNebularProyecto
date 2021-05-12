import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratoComponent } from './contrato/contrato.component';
import { AdminContratoComponent } from './admin-contrato/admin-contrato.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { CuadrillaComponent } from './cuadrilla/cuadrilla.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ContratoAreaComponent } from './contrato-area/contrato-area.component';

const routes: Routes = [
  {
    path: 'contrato/contrato',
    component: ContratoComponent,
  },
 /*  {
    path: "contrato/admContrato",
    component : AdminContratoComponent
  }, */
  {
    path: 'empleado/empleado',
    component: EmpleadoComponent,
  },
  {
    path: 'cuadrilla/cuadrilla/:idContrato/:rutEmpContrato',
    component: CuadrillaComponent,
  },
  {
    path: 'asistencia/asistencia/:idContrato/:rutEmpContrato',
    component: AsistenciaComponent,
  },
  {
    path: 'contratoArea/:idContrato/:rutEmpContrato',
    component: ContratoAreaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule { }
