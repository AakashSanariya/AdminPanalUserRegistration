import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from "./video.component";
import {VideoListComponent} from "./video-list/video-list.component";
import {AddEditVideoComponent} from "./add-edit-video/add-edit-video.component";


const routes: Routes = [
  {
    path: '',
    component: VideoComponent,
    data: {
      title: 'Video'
    },
    children: [
      {
        path: 'list',
        component: VideoListComponent,
        data: {
          title: 'Video List'
        },
      },
      {
        path: 'addvideo',
        component: AddEditVideoComponent,
        data: {
          title: 'Add Video'
        }
      },
      {
        path: 'editvideo/:id',
        component: AddEditVideoComponent,
        data: {
          title: 'Edit Video'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
