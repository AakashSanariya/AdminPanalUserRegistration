import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmAndPasswordComponent} from "../views/confirm-and-password/confirm-and-password.component";
import {FirstLastNameComponent} from "../views/first-last-name/first-last-name.component";
import {FormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap";
import {LibraryDemoFirstModule} from 'library-demo-first/src/lib/library-demo-first.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LibraryDemoFirstModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [FirstLastNameComponent, ConfirmAndPasswordComponent, /*DemoLibrearyComponent*/],
  exports:[FirstLastNameComponent, ConfirmAndPasswordComponent, CommonModule, FormsModule, LibraryDemoFirstModule, /*DemoLibrearyComponent*/]
})
export class SharedModule { }
