import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {ListProfileComponent} from "./list-profile/list-profile.component";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'User Profile'
    },
    children: [
      {
        path: 'profile',
        component: ListProfileComponent,
        data: {
          title: 'Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
