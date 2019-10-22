import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ApiVideoServiceService} from "../../../_service/api-video-service.service";
import {ToastrService} from "ngx-toastr";
import * as $ from 'jquery';
import {CONFIG} from "../../../config/config-service";
import {DomSanitizer} from "@angular/platform-browser";

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
  videoUrl: any = {};
  oldVideoUrl: any;
  videoShow: boolean;
  spinner: boolean;
  videoSizeType:boolean;
  jqXHR: any;
  checkVideo: any;
  hideVideo: any;

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
        this.videoChunk();
      }
    });
  }

  videoChunk(){
    let customFile:string = 'video_slider'+"_"+Date.now();
    const that = this;
    const $ = window["$"];

    var $fileUpload = $("#fileSelect");

    if($fileUpload.length > 0 && this.videoUrl != null){
      var progressEle = $(".progressBarDiv .progress");
      $("#fileSelect").fileupload({
        url: CONFIG.chunkVideo + '?customFile=' + customFile,
        maxChunkSize: 5000000,
        method: "POST",

        progressall: function (e, data) {
          var progress = Math.round(data.loaded / data.total * 100);
          progressEle.css('width', progress +  '%');
          progressEle.siblings('span.progressValue').html('Uploading '+ progress + '%');
        },

        add: function (e, data) {
          if(that.videoUrl){
            $('.videoUploadProgress').show();
            progressEle.css('width', 0 + '%');
            progressEle.siblings('span.progressValue').html('0%');
            that.jqXHR=data.submit();
          }
        },

        done: function (e, data) {
          that.toaster.success("Video Upload Successfully");
          progressEle.css('width',100 + '%');
          progressEle.siblings('span.progressValue').html('Uploaded');
        },

        success: function (data) {
          if(data){
            that.checkVideo=data;
          }
        },
        
        change: function (e, data) {
          that.changeVideo(data);
        }
      });
    }

  }

  changeVideo(data){
    let videoType = [ "video/mp4", "video/mpeg4", "video/3gpp"];
    // if(event.target.files.length > 0){
    if($.inArray(data.files[0].type, videoType) == 0 && data.files[0].size >= 5000000) {
      this.videoUpload(data.files[0]);
    }
    else{
      this.toaster.error('Video Type Not Matched and Size Less than 5 Mb');
      this.videoUrl = null;
      this.videoSizeType = true;
    }

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
    let videoType = [ "video/mp4", "video/webm", "video/3gpp"];
    // if(event.target.files.length > 0){
      if($.inArray(event.type, videoType) == 0 && event.size >= 5000000){
        this.videoSizeType = false;
        this.videoUrl = event;
        this.hideVideo = this.videoUrl;
      }
      else{
        this.videoSizeType = true;
        this.toaster.error('Video Type Not Matched and Size Less than 2 Mb');
      }
    // }
  }

  displayVideo(){
    this.videoShow = false;
  }

}
