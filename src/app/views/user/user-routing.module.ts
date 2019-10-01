import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AdminGuardGuard} from "../../_guard/admin-guard.guard";


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'User List'
    },
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: {
          title: 'User List'
        },
        /*canActivate: [AdminGuardGuard]*/
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
