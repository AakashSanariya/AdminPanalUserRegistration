import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs/index";
import {first} from "rxjs/internal/operators/first";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {DataTableDirective} from "angular-datatables/index";

@Component({
  selector: 'app-list-sub-admin',
  templateUrl: './list-sub-admin.component.html',
  styleUrls: ['./list-sub-admin.component.css']
})
export class ListSubAdminComponent implements OnInit {

  userDetails: any;
  userId: number;
  status: string;
  spinner: boolean = true;
  firstName: string = '';
  lastName: string = '';

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;

  constructor(private router: Router,
              private apiService: ApiServiceService,
              private toaster: ToastrService,
              private modalService: BsModalService
  ) { }

  ngOnInit() {

    let columnsArray = [];
    const that = this;

    columnsArray = [
      {data: "no", orderable: false},
      {data: "firstName"},
      {data: "lastName"},
      {data: "email", orderable: false},
      {data: "image", orderable: false},
      {data: "status"}
    ];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      searching: false,
      responsive: true,
      processing: true,
      language: {
        "emptyTable": 'No data!'
      },
      ajax: (dataTablesParameters: any, callback) => {
        that.apiService.getsubAdmin(Object.assign(dataTablesParameters, {})).subscribe(result => {
          that.spinner = false;
          if(result){
            if(result['meta'].status_code == 200){
              that.userDetails = result['data'].userDetails.original.data;
              callback({
                recordsTotal: result['data'].userDetails.original.recordsTotal,
                recordsFiltered: result['data'].userDetails.original.recordsFiltered,
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
    this.apiService.getsubAdmin().pipe(first()).subscribe(result => {
      if(result){
        this.spinner = false;
        if(result['meta'].status_code == 200){
          this.userDetails = result['data'].userDetails;
          this.dtTrigger.next();
        }
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });*/
  }

  /* Open Model*/
  openModal(template: TemplateRef<any>, id, status) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.userId = id;
    this.status = status;
  }

  /*Activate DeActivate User*/
  changeStatus(){
    this.spinner = true;
    this.modalRef.hide();
    if(this.status == "0"){
      this.status = "1";
    }
    else{
      this.status = "0";
    }
    let payload = new FormData();
    payload.append('status', this.status);
    this.apiService.updateDetails(payload, this.userId).subscribe(result => {
      this.spinner = false;
      if(this.status == "1"){
        this.toaster.success("User Activate Successfully");
      }
      if(this.status == "0"){
        this.toaster.success('User DeActivate Successfully');
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error);
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
