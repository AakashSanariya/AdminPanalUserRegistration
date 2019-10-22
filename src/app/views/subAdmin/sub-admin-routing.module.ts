import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubAdminComponent} from "./sub-admin.component";
import {ListSubAdminComponent} from "./list-sub-admin/list-sub-admin.component";
import {AdminGuardGuard} from "../../_guard/admin-guard.guard";
import {AddEditSubAdminComponent} from "./add-edit-sub-admin/add-edit-sub-admin.component";

import {ListProfileComponent} from "../profile/list-profile/list-profile.component";
import {ListProfileSubAdminComponent} from "./list-profile-sub-admin/list-profile-sub-admin.component";


const routes: Routes = [
  {
    path: '',
    component: SubAdminComponent,
    data: {
      title: 'Sub Admin'
    },
    children: [
      {
        path: 'list',
        component: ListSubAdminComponent,
        data: {
          title: 'List Sub Admin',
        },
        canActivate: [AdminGuardGuard]
      },
      {
        path: 'addsubadmin',
        component: AddEditSubAdminComponent,
        data: {
          title: 'Add Sub Admin',
        }
      },
      {
        path: 'view/:id',
        component: ListProfileSubAdminComponent,
        data: {
          title: 'User Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdminRoutingModule { }
