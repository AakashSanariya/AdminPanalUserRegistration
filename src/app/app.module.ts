import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import {ErrorInterceptor} from "./_helper/error.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthguardGuard} from "./_guard/authguard.guard";
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables/index";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ModalModule} from "ngx-bootstrap";
import {NgxPermissionsModule} from "ngx-permissions";

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    AuthguardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
