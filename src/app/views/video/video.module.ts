import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoListComponent } from './video-list/video-list.component';
import {VideoComponent} from "./video.component";
import { AddEditVideoComponent } from './add-edit-video/add-edit-video.component';
import {DataTablesModule} from "angular-datatables/index";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [VideoListComponent, VideoComponent, AddEditVideoComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    DataTablesModule,
    FormsModule,
  ]
})
export class VideoModule { }
