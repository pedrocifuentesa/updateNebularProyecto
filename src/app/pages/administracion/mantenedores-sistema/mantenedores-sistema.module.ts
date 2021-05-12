import { NgModule } from '@angular/core';
/* import { ReactiveFormsModule } from '@angular/forms'; */
/* import { NbTabsetModule, NbStepperModule, NbRouteTabsetModule, NbListModule, NbAccordionModule, NbMenuModule, NbThemeModule } from '@nebular/theme'; */

/* import { NgModule } from '@angular/core'; */
import {
  NbTabsetModule, 
  NbStepperModule, 
  NbRouteTabsetModule, 
  NbListModule, 
  NbAccordionModule, 
  NbMenuModule, 
/*   NbThemeModule, */

  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, 
/*   NbIconModule, */
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';



/* import { HttpClientModule } from '@angular/common/http'; */
import { MantenedoresSistemaRoutingModule } from './mantenedores-sistema-routing.module';
/* import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NewsService } from '../../layout/news.service'; */
import { ThemeModule } from '../../../@theme/theme.module';


import { EmpresaComponent } from './empresa/empresa/empresa.component';
import { EditarEmpresaComponent } from './empresa/empresa/editar-empresa/editar-empresa.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { PerfilempresaComponent } from './perfiles/perfilempresa/perfilempresa.component';
import { HoraComponent } from './hora/hora.component';
import { ActividadComponent } from './actividad/actividad.component';
import { TareasComponent } from './tareas/tareas.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { AreaComponent } from './area/area.component';
import { ActividadProgramaComponent } from './actividad-programa/actividad-programa.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [EmpresaComponent, 
    EditarEmpresaComponent, 
    PerfilComponent, 
    PerfilempresaComponent, 
    HoraComponent, 
    ActividadComponent, 
    TareasComponent, 
    PlantillaComponent, 
    EspecialidadComponent, 
    AreaComponent, ActividadProgramaComponent,],
  imports: [
    MantenedoresSistemaRoutingModule,

    NbTabsetModule, 
  NbStepperModule, 
  NbRouteTabsetModule, 
  NbListModule, 
  NbAccordionModule, 
  NbMenuModule, 
  ThemeModule,

  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, 

  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,

  NbEvaIconsModule,
  ngFormsModule,
   /*  ThemeModule,
    CommonModule,
    MantenedoresSistemaRoutingModule,
    ReactiveFormsModule,
    NbThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,

    NbMenuModule,
  
    HttpClientModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,

    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule, */
    
  ],
  providers: [
    
  ],
})
export class MantenedoresSistemaModule { }
