import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserListComponent} from "./user-list/user-list.component";
import {UserComponent} from "./user.component";
import {DataTablesModule} from "angular-datatables/index";
import {ModalModule} from "ngx-bootstrap";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTreeViewComponent } from './user-tree-view/user-tree-view.component';
import {TreeviewModule} from "ngx-treeview/src/treeview.module";


@NgModule({
  declarations: [ UserListComponent, UserComponent, UserProfileComponent, UserTreeViewComponent ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTablesModule,
    ModalModule.forRoot(),
    TreeviewModule.forRoot(),
  ]
})
export class UserModule { }
