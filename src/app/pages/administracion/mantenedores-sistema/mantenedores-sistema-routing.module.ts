import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadProgramaComponent } from './actividad-programa/actividad-programa.component';
import { ActividadComponent } from './actividad/actividad.component';
import { AreaComponent } from './area/area.component';

import { EmpresaComponent } from './empresa/empresa/empresa.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { HoraComponent } from './hora/hora.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { PerfilempresaComponent } from './perfiles/perfilempresa/perfilempresa.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  {
    path: "empresa",
    component : EmpresaComponent
  },
  {
    path: "perfil",
    component : PerfilComponent
  },
  {
    path: "perfilempresa",
    component : PerfilempresaComponent
  },
  {
    path: "area",
    component : AreaComponent
  },

  {
    path: "hora",
    component : HoraComponent
  },
  {
    path: "actividad",
    component : ActividadComponent
  },
  {
    path: "especialidad",
    component : EspecialidadComponent
  },
  {
    path: "actividadProgramada",
    component : ActividadProgramaComponent
  },
  {
    path: "tareas",
    component : TareasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedoresSistemaRoutingModule { }
