import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmAndPasswordComponent} from "../views/confirm-and-password/confirm-and-password.component";
import {FirstLastNameComponent} from "../views/first-last-name/first-last-name.component";
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap";
import {ApiCallingModule, ApiCallingComponent} from "api-calling";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    // ApiCallingModule,
  ],
  declarations: [FirstLastNameComponent, ConfirmAndPasswordComponent, ApiCallingComponent],
  exports:[FirstLastNameComponent, ConfirmAndPasswordComponent, CommonModule, FormsModule, ApiCallingComponent]
})
export class SharedModule { }
