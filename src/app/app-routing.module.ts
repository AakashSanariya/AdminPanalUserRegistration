import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultLayoutComponent} from "./container/default-layout/default-layout.component";
import {LoginComponent} from "./views/login/login.component";
import {AuthguardGuard} from "./_guard/authguard.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthguardGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'subadmin',
        loadChildren: './views/subAdmin/sub-admin.module#SubAdminModule'
      },
      {
        path: 'user',
        loadChildren: './views/user/user.module#UserModule'
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
