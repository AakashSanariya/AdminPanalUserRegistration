import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubAdminComponent } from './sub-admin.component';
import {ListSubAdminComponent} from "./list-sub-admin/list-sub-admin.component";
import {DataTablesModule} from "angular-datatables/index";
import {BsModalService, ModalModule, BsDatepickerModule} from "ngx-bootstrap";
import { AddEditSubAdminComponent } from './add-edit-sub-admin/add-edit-sub-admin.component';
import {CKEditorModule} from "ngx-ckeditor";
import { ListProfileSubAdminComponent } from './list-profile-sub-admin/list-profile-sub-admin.component';
import {FormsModule} from "@angular/forms";
import {MustMatchDirective} from "../../_helper/must-match.directive";



@NgModule({
  declarations: [SubAdminComponent, ListSubAdminComponent, AddEditSubAdminComponent, ListProfileSubAdminComponent, MustMatchDirective],
  imports: [
    CommonModule,
    SubAdminRoutingModule,
    DataTablesModule,
    CKEditorModule,
    ModalModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class SubAdminModule { }
