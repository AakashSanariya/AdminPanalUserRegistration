import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubAdminComponent } from './sub-admin.component';
import {ListSubAdminComponent} from "./list-sub-admin/list-sub-admin.component";
import {DataTablesModule} from "angular-datatables/index";
import {BsModalService, ModalModule} from "ngx-bootstrap";
import { AddEditSubAdminComponent } from './add-edit-sub-admin/add-edit-sub-admin.component';


@NgModule({
  declarations: [SubAdminComponent, ListSubAdminComponent, AddEditSubAdminComponent],
  imports: [
    CommonModule,
    SubAdminRoutingModule,
    DataTablesModule,
    ModalModule.forRoot(),
  ]
})
export class SubAdminModule { }
