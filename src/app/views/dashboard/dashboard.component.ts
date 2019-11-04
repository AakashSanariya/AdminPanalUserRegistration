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
  barCreateArray = [];
  pieCreateArray = [];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]; // For Matching By Number And Display Name

  public barChartLabel = [];
  public barChartType = 'bar';
  public barChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: { min: 1 },
      }]
    }
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

  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartLabel = [];
  public pieChartOptions: any = {
    responsive: true,
  };
  public pieChartData: any [] = [
    { data: [], label: 'User Listing' }
  ];
  public pieChartColor = [
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

          /* Creating Array For Take a Different Month All List For Count */
          result['data'].videoList.original.data.forEach(createDate => {
            let uploadDate = new Date(createDate.created_at);
            this.barCreateArray.push(uploadDate.getMonth());
          });

          result['data'].videoList.original.data.forEach(createDate => {
            let uploadDate = new Date(createDate.created_at);

            if(this.barChartData[0].data.indexOf(uploadDate.getMonth()) == '-1'){ //get Same Month Only Onces
              var count = this.barCreateArray.filter((obj) => obj == uploadDate.getMonth()).length;
              if(this.barChartData[0].data.indexOf(count) == '-1'){ // get and Push Same Count Only Once
                this.barChartData[0].data.push(count);
                this.barChartLabel.push(this.monthNames[uploadDate.getMonth()] + '_' + uploadDate.getFullYear());
              }
            }
          });
          // this.barChartData[0].data = ['5', '7', '9', '10'];
          // this.barChartLabel = ['Jan', 'Feb', 'Mar', 'Apr'];
          this.barChartData[0].data.forEach(color => {
            this.barChartColor[0].backgroundColor.push('rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,246,255,0.3)');
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

  /* Pie Chart and total User Count*/
  userCount(){
    this.apiService.getUser(this.param).subscribe(result => {
      this.spinner = false;
      if(result){
        if(result['meta'].status_code == 200){
          this.totalNoUser = result['data'].userDetails.original.recordsTotal;

          /* Creating Array For Take a Different Month All List For Count */
          result['data'].userDetails.original.data.forEach(createDate => {
            let uploadDateUser = new Date(createDate.created_at);
            this.pieCreateArray.push(uploadDateUser.getMonth());
          });

          result['data'].userDetails.original.data.forEach(createDate => {
            let uploadDateUse = new Date(createDate.created_at);
            if(this.pieChartData[0].data.indexOf(uploadDateUse.getMonth()) == '-1'){ //get Same Month Only Onces
              var count = this.pieCreateArray.filter((obj) => obj == uploadDateUse.getMonth()).length;
              if(this.pieChartData[0].data.indexOf(count) == '-1'){ // get and Push Same Count Only Once
                this.pieChartData[0].data.push(count);
                this.pieChartLabel.push(this.monthNames[uploadDateUse.getMonth()] + '_' + uploadDateUse.getFullYear());
              }
            }
          });
          this.pieChartData[0].data.forEach(color => {
            this.pieChartColor[0].backgroundColor.push('rgba(255,236,33,0.8)', 'rgba(241,60,89,0.8)', 'rgba(124,221,221,0.8)', 'rgba(99,62,187,0.8)');
          });

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
