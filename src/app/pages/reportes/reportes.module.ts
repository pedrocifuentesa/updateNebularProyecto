import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { NbAccordionModule, NbActionsModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbRadioModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbThemeModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from '../layout/layout-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NewsService } from '../layout/news.service';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteDetalleCuadrillaComponent } from './reporte-detalle-cuadrilla/reporte-detalle-cuadrilla.component';
import { ReporteDetalleActividadesComponent } from './reporte-detalle-actividades/reporte-detalle-actividades.component';
import { ReporteDetalleApComponent } from './reporte-detalle-ap/reporte-detalle-ap.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';



@NgModule({
  declarations: [ReporteComponent
    , ReporteDetalleCuadrillaComponent
    , ReporteDetalleActividadesComponent
    , ReporteDetalleApComponent],
  imports: [
    NbCardModule,
    CommonModule,
    ReportesRoutingModule,
    NbBadgeModule,
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
    LayoutRoutingModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    HttpClientModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
   NbDialogModule,
   FormsModule,
   NbTooltipModule,
   NbEvaIconsModule,
  ],
  providers: [
    NewsService,
  ],
})
export class ReportesModule { }
