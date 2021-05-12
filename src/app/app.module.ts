/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import localePy from '@angular/common/locales/es-PY';
    /* import localePt from '@angular/common/locales/pt';
    import localeEn from '@angular/common/locales/en';
    import localeEsAr from '@angular/common/locales/es-AR'; */

import { AuthComponent } from './pages/auth/auth.component';
import { MantenedoresModule } from './pages/administracion/mantenedores/mantenedores.module';
import { MantenedoresSistemaModule } from './pages/administracion/mantenedores-sistema/mantenedores-sistema.module';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy, 'es');
/* registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar'); */
@NgModule({
  declarations: [AppComponent,AuthComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    MantenedoresModule,
    MantenedoresSistemaModule,
    FormsModule
    
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Cl' } ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
