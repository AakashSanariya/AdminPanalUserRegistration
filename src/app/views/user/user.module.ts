import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserListComponent} from "./user-list/user-list.component";
import {UserComponent} from "./user.component";
import {DataTablesModule} from "angular-datatables/index";
import {ModalModule} from "ngx-bootstrap";
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [ UserListComponent, UserComponent, UserProfileComponent ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTablesModule,
    ModalModule.forRoot(),
  ]
})
export class UserModule { }
