import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import {ConfigConstant} from "../../config/config-constant";
import {AgmCoreModule} from "@agm/core";
import {ReusableComponent} from "../reusable/reusable.component";


@NgModule({
  declarations: [ProfileComponent, ListProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ConfigConstant.googleApiKey1,
      libraries: ['places', 'geometry']
    })
  ],
  // entryComponents: [ReusableComponent]
})
export class ProfileModule { }
