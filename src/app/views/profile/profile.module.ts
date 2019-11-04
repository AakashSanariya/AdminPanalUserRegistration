import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import {ReusableComponent} from "../reusable/reusable.component";


@NgModule({
  declarations: [ProfileComponent, ListProfileComponent, ReusableComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  entryComponents: [ReusableComponent]
})
export class ProfileModule { }
