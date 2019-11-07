import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import {ReusableComponent} from "../reusable/reusable.component";
import {AgmCoreModule} from "@agm/core";
import {ConfigConstant} from "../../config/config-constant";


@NgModule({
  declarations: [ProfileComponent, ListProfileComponent, ReusableComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ConfigConstant.googleApiKey2,
      libraries: ['places', 'geometry']
    })
  ],
  entryComponents: [ReusableComponent]
})
export class ProfileModule { }
