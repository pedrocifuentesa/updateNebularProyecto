import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';



import { CommonModule } from '@angular/common';

/* import { FormsModule, ReactiveFormsModule } from '@angular/forms'; */



import { HttpClientModule } from '@angular/common/http';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NbMomentDateModule } from '@nebular/moment';


import { MantenedoresRoutingModule } from './mantenedores-routing.module';

import { CargoComponent } from './cargo/cargo.component';
import { JornadaComponent } from './jornada/jornada.component';
import { PersonasComponent } from './personas/personas.component';
import { PasesComponent } from './pases/pases.component';
import { PlantillaComponent } from './plantillas/plantilla/plantilla.component';
import { DetalleplantillaComponent } from './plantillas/detalleplantilla/detalleplantilla.component';
import { TipoempleadoComponent } from './tipoempleado/tipoempleado.component';
import { CuadrillaComponent } from './cuadrillas/cuadrilla/cuadrilla.component';
import { DotacionComponent } from './cuadrillas/dotacion/dotacion.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DtpComponentComponent } from '../reutilizables/dtp-component/dtp-component.component';
import { TurnoComponent } from './turno/turno.component';


/* import { NewsService } from '../../layout/news.service'; */
import { ThemeModule } from '../../../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';







@NgModule({
  declarations: [CargoComponent, 
    JornadaComponent, 
    PersonasComponent, 
    PasesComponent, 
    PlantillaComponent, 
    DetalleplantillaComponent, 
    TipoempleadoComponent, 
    CuadrillaComponent, 
    DotacionComponent, 
    EmpleadosComponent, 
    DatepickerComponent,
    DtpComponentComponent,
    TurnoComponent
    ],
  imports: [
    MantenedoresRoutingModule,

    
    ThemeModule,
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
    ngFormsModule,
    NbEvaIconsModule,

    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NbMomentDateModule,

  ],
  providers: [
   
  ],
})
export class MantenedoresModule { }
