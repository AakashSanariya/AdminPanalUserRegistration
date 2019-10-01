import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubAdminComponent} from "./sub-admin.component";
import {ListSubAdminComponent} from "./list-sub-admin/list-sub-admin.component";
import {AdminGuardGuard} from "../../_guard/admin-guard.guard";


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
      /*{
        path: 'add',
        component: AddEditSubAdminComponent,
        data: {
          title: 'Add Sub Admin',
        }
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdminRoutingModule { }
