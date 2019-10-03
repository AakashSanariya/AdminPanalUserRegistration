import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs/index";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {first} from "rxjs/internal/operators/first";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userDetails: any;
  userId: number = null;
  status: string;
  spinner: boolean = true;
  firstName: string = '';
  lastName: string = '';

  modalRef: BsModalRef;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private apiService: ApiServiceService,
              private toaster: ToastrService,
              private modelService: BsModalService
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
      processing: true,
      language: {
        "emptyTable": 'No data!'
      },
      ajax: (dataTablesParameters: any, callback) => {
        that.apiService.getUser(Object.assign(dataTablesParameters, {})).subscribe(result => {
          that.spinner = false;
          if(result){
            if(result['meta'].status_code == 200){
              that.userDetails = result['data'].userDetails['original'].data;
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

    /*this.apiService.getUser().subscribe(result => {
      this.spinner = false;
      if(result){
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

  openModal(template: TemplateRef<any>, id, status) {
    this.modalRef = this.modelService.show(template, {class: 'modal-sm'});
    this.userId = id;
    this.status = status;
  }

  changeStatus(){
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
  
  decline(){
    this.modalRef.hide();
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
  
}
