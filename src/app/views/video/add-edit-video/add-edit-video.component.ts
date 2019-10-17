import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ApiVideoServiceService} from "../../../_service/api-video-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-edit-video',
  templateUrl: './add-edit-video.component.html',
  styleUrls: ['./add-edit-video.component.css']
})
export class AddEditVideoComponent implements OnInit {

  constructor(private router:Router,
              private activatedRoute: ActivatedRoute,
              private videoApiService: ApiVideoServiceService,
              private toaster: ToastrService
  ) { }

  private editId: string;
  editDetails: any = {};
  videoUrl: any;
  oldVideoUrl: any;
  videoShow: boolean;
  spinner: boolean;
  videoSizeType:boolean;

  ngOnInit() {
    this.spinner = true;
    this.activatedRoute.paramMap.subscribe(param => {
      this.spinner = false;
      if(param.get('id') != null){
        this.editId = param.get('id');
        this.editdetails();
      }
      else{
        this.videoShow = false;
      }
    });
  }

  editdetails(){
    this.videoApiService.editVideo(this.editId).subscribe(result => {
      if(result){
        this.videoShow = true;
        if(result['meta'].status_code == 200){
          this.editDetails = result['data'].videoList;
          this.videoUrl = result['data'].videoList.videoUrl;
          this.oldVideoUrl = this.editDetails.videoUrl;
        }
      }
    });
  }
  
  onSubmit(videoData){
    this.spinner = true;
    /*
    * Add New Video Data
    * */
    if(this.editId == null){
      const payLoad = new FormData();
      payLoad.append('videoName', videoData['videoName']);
      payLoad.append('videoUrl', this.videoUrl);
      
      this.videoApiService.addVideo(payLoad).subscribe(result => {
        if(result){
          if(result['meta'].status_code == 200){
            this.spinner = false;
            this.router.navigate(['video/list']);
            this.toaster.success(result['meta'].message);
          }
        }
      }, error => {
        this.spinner = false;
        this.router.navigate(['video/list']);
        this.toaster.error(error['meta'].message);
      });
    }

    /* Update Video Details*/
    else{
      const payLoad = new FormData();
      payLoad.append('videoName', videoData.videoName);

      if(this.videoUrl != this.oldVideoUrl){
        payLoad.append('videoUrl', this.videoUrl);
      }
      
      this.videoApiService.updateVideo(payLoad, this.editId).subscribe(result => {
        if(result){
          if(result['meta'].status_code == 200){
            this.spinner = false;
            this.router.navigate(['video/list']);
            this.toaster.success(result['meta'].message);
          }
        }
      }, error => {
        this.spinner = false;
        this.router.navigate(['video/list']);
        this.toaster.error(error['meta'].message);
      });
    }

  }
  
  videoUpload(event){
    if(event.target.files.length > 0){
      if(event.target.files[0].type == 'video/mp4' && event.target.files[0].size < 2097152){
        this.videoSizeType = false;
        this.videoUrl = event.target.files[0];
        this.toaster.success("Video Upload Successfully");
      }
      else{
        this.videoSizeType = true;
        this.toaster.error('Video Type Not Matched Only Allowed mp4 and Size greater than 2 Mb');
      }
    }
  }

  displayVideo(){
    this.videoShow = false;
  }

}
