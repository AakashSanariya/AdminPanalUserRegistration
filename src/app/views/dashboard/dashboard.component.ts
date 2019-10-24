import { Component, OnInit } from '@angular/core';
import {ApiVideoServiceService} from "../../_service/api-video-service.service";
import {Label} from "ng2-charts";
import {ToastrService} from "ngx-toastr";
import {ApiServiceService} from "../../_service/api-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private videoService: ApiVideoServiceService,
              private toaster: ToastrService,
              private apiService: ApiServiceService
  ) { }

  param: any = {};
  spinner: boolean = true;
  totalNoVideo: number;
  totalNoSubAdmin: number;
  totalNoUser: number;

  public barChartLabel: Label;
  public barChartType = 'bar';
  public barChartOptions: any = {
    responsive: true,
  };
  public barChartData: any [] = [
    { data: [], label: 'Video Uploaded' }
  ];
  public barChartLegend = false;
  public barChartColor = [
    {
      backgroundColor: [],
    }
  ];

  ngOnInit() {
    this.barChart();
    this.userCount();

    let role = localStorage.getItem('role');
    if(role == 'SuperAdmin' || role == 'Admin'){
      this.subAdminCount();
    }
  }

  barChart(){
    this.videoService.getVideoList(this.param).subscribe(result => {
      this.spinner = false;
      if(result){
        if(result['meta'].status_code == 200){
          this.totalNoVideo = result['data'].videoList.original.recordsTotal;

          /* For bar Chart*/
          this.barChartData[0].data = ['5', '7', '9', '10'];
          this.barChartLabel = ['Jan', 'Feb', 'Mar', 'Apr'];
          this.barChartData[0].data.forEach(color => {
            this.barChartColor[0].backgroundColor.push('#F9A49B');
          });
        }
      }
    }, error => {
      this.spinner = false;
      if(error['meta']){
        this.toaster.error(error['meta'].message);
      }
    });
  }

  userCount(){
    this.apiService.getUser(this.param).subscribe(result => {
      this.spinner = false;
      if(result){
        if(result['meta'].status_code == 200){
          this.totalNoUser = result['data'].userDetails.original.recordsTotal;
        }
      }
    }, error => {
      this.spinner = false;
      if(error['meta']){
        this.toaster.error(error['meta'].message);
      }
    })
  }

  subAdminCount(){
    this.apiService.getsubAdmin(this.param).subscribe(result => {
      this.spinner = false;
      if(result){
        if(result['meta'].status_code == 200){
          this.totalNoSubAdmin = result['data'].userDetails.original.recordsTotal;
        }
      }
    }, error => {
      this.spinner = false;
      if(error['meta']){
        this.toaster.error(error['meta'].message);
      }
    });
  }

}
