import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ApiVideoServiceService} from "../../../_service/api-video-service.service";
import {Subject} from "rxjs/index";
import {BsModalRef} from "ngx-bootstrap";
import {DataTableDirective} from "angular-datatables/index";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  modelRef = BsModalRef;

  spinner: boolean = true;
  videoList: any;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router,
              private toaster: ToastrService,
              private videoApiService: ApiVideoServiceService
  ) { }

  ngOnInit() {
    let columnsArray = [];
    const that = this;
    columnsArray = [
      { data: "no", orderable: false },
      { data: "videoName" },
      { data: "video", orderable: false },
    ];
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 2,
      serverSide: true,
      searching: false,
      responsive: true,
      processing: true,
      language: {
        "emptyTable": "No data!"
      },
      ajax: (dataTablesParameters: any, callback) => {
        that.videoApiService.getVideoList(Object.assign(dataTablesParameters, {})).subscribe(result =>{
          that.spinner = false;
          if(result){
            if(result['meta'].status_code == 200){
              that.videoList = result['data'].videoList.original.data;
              callback({
                recordsTotal: result['data'].videoList.original.recordsTotal,
                recordsFiltered: result['data'].videoList.original.recordsFiltered,
                data: []
              });
            }
          }
        }, error => {
          this.spinner = false;
          this.toaster.error(error);
        });
      },
      columns: columnsArray
    };
/*
    this.videoApiService.getVideoList('').subscribe(result => {
      console.log(result);
    });*/
    
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
