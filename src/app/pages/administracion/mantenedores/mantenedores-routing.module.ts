import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargoComponent } from './cargo/cargo.component';
import { JornadaComponent } from './jornada/jornada.component';
import { PersonasComponent } from './personas/personas.component';
import { PasesComponent } from './pases/pases.component';
import { PlantillaComponent } from './plantillas/plantilla/plantilla.component';
import { DetalleplantillaComponent } from './plantillas/detalleplantilla/detalleplantilla.component';
import { TipoempleadoComponent } from './tipoempleado/tipoempleado.component';
import { CuadrillaComponent } from './cuadrillas/cuadrilla/cuadrilla.component';
import { DotacionComponent } from './cuadrillas/dotacion/dotacion.component';

import { TurnoComponent } from './turno/turno.component';
import { EmpleadoComponent } from '../../formularios/empleado/empleado.component';



const routes: Routes = [
  {
    path: "",
    component : CargoComponent
  },
  {
    path: "jornada",
    component : JornadaComponent
  },
  {
    path: "turno",
    component : TurnoComponent
  },
  {
    path: "personas",
    component : PersonasComponent
  },
  {
    path: "pases",
    component : PasesComponent
  },
  {
    path: "plantillas/plantilla",
    component : PlantillaComponent
  },
  {
    path: "plantillas/detalleplantilla",
    component : DetalleplantillaComponent
  },
  {
    path: "tipoempleado",
    component : TipoempleadoComponent
  },
  {
    path: "cuadrillas/cuadrilla",
    component : CuadrillaComponent
  },
  {
    path: "cuadrillas/dotacion",
    component : DotacionComponent
  },
  {
    path: "empleados",
    component : EmpleadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedoresRoutingModule { }
