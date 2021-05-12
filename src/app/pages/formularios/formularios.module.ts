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
import { ThemeModule } from '../../@theme/theme.module';

import { HttpClientModule } from '@angular/common/http';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { ContratoComponent } from './contrato/contrato.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ModalAgregarEmpleadoComponent } from './empleado/modales/modal-agregar-empleado/modal-agregar-empleado.component';
import { CuadrillaComponent } from './cuadrilla/cuadrilla.component';
import { ModalAdministrarCuadrillaComponent } from './empleado/modales/modal-administrar-cuadrilla/modal-administrar-cuadrilla.component';
import { AdminContratoComponent } from './admin-contrato/admin-contrato.component';
import { ModalCrearContratoComponent } from './admin-contrato/modales/modal-crear-contrato/modal-crear-contrato.component';
import { ModalActualizarContratoComponent } from './admin-contrato/modales/modal-actualizar-contrato/modal-actualizar-contrato.component';
import { ModalEliminarContratoComponent } from './admin-contrato/modales/modal-eliminar-contrato/modal-eliminar-contrato.component';
import { ModalModificarEmpleadoComponent } from './empleado/modales/modal-modificar-empleado/modal-modificar-empleado.component';
import { MdlUpdateEmpleadoDocacionComponent } from './cuadrilla/modales/mdl-update-empleado-docacion/mdl-update-empleado-docacion.component';
import { MdlModificarCuadrillaComponent } from './cuadrilla/modales/mdl-modificar-cuadrilla/mdl-modificar-cuadrilla.component';
import { MdlEliminarCuadrillaComponent } from './cuadrilla/modales/mdl-eliminar-cuadrilla/mdl-eliminar-cuadrilla.component';
import { MdlDeleteEmpleadoDocacionComponent } from './cuadrilla/modales/mdl-delete-empleado-docacion/mdl-delete-empleado-docacion.component';
import { MdlCrearEmpleadoDocacionComponent } from './cuadrilla/modales/mdl-crear-empleado-docacion/mdl-crear-empleado-docacion.component';
import { MdlCrearCuadrillaComponent } from './cuadrilla/modales/mdl-crear-cuadrilla/mdl-crear-cuadrilla.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ModalEliminarEmpleadoComponent } from './empleado/modales/modal-eliminar-empleado/modal-eliminar-empleado.component';
import { ContratoAreaComponent } from './contrato-area/contrato-area.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [ContratoComponent
    , EmpleadoComponent
    , ModalAgregarEmpleadoComponent
    , CuadrillaComponent
    , ModalAdministrarCuadrillaComponent
    , AdminContratoComponent
    , ModalCrearContratoComponent
    , ModalActualizarContratoComponent
    , ModalEliminarContratoComponent
    , ModalModificarEmpleadoComponent
    , MdlUpdateEmpleadoDocacionComponent
    , MdlModificarCuadrillaComponent
    , MdlEliminarCuadrillaComponent
    , MdlDeleteEmpleadoDocacionComponent
    , MdlCrearEmpleadoDocacionComponent
    , MdlCrearCuadrillaComponent, AsistenciaComponent, ModalEliminarEmpleadoComponent, ContratoAreaComponent,
  ],
  imports: [
    FormulariosRoutingModule,

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

    HttpClientModule,
Ng2SmartTableModule,
   /*  ThemeModule,
    NbBadgeModule,
    CommonModule,
    FormulariosRoutingModule,
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
    Ng2SmartTableModule,
   CommonModule,
   NbDialogModule,
   FormsModule,
   NbTooltipModule, */
  ],
  providers: [

  ],
  entryComponents: [
    ModalAgregarEmpleadoComponent,
  ],
})
export class FormulariosModule { }
