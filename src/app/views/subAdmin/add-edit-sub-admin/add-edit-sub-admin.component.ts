import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-sub-admin',
  templateUrl: './add-edit-sub-admin.component.html',
  styleUrls: ['./add-edit-sub-admin.component.css']
})
export class AddEditSubAdminComponent implements OnInit {

  editDetails:any = {};
  image: any;

  constructor(private apiService: ApiServiceService,
              private toaster: ToastrService,
              private route: Router
  ) {
  }

  ngOnInit() {
  }

  fileUpload(event){
    if(event.target.files.length > 0){
      this.image= event.target.files[0];
      this.toaster.success("Image Upload Successfully");
    }
  }

  onSubmit(userData){
    console.log(userData);
    const payLoad = new FormData();
    payLoad.append('firstName', userData.firstName);
    payLoad.append('lastName', userData.lastName);
    payLoad.append('email', userData.email);
    payLoad.append('mobileNo', userData.mobileNo);
    payLoad.append('gender', userData.gender);
    payLoad.append('DOB', userData.DOB);
    payLoad.append('image', this.image);
    payLoad.append('password', userData.password);
    payLoad.append('confirmPassword', userData.confirmPassword);
    payLoad.append('role', 'User'); // static Role of User
    payLoad.append('status', '0'); // By Default Status is In Activate

    this.apiService.userRegister(payLoad).subscribe(result => {
      if(result){
        if(result['meta'].status_code == 200){
          this.toaster.success(result['meta'].message);
          this.route.navigate(['dashboard']);
        }
      }
    }, error => {
      if(error){
        this.toaster.error(error['meta'].message);
      }
    });

  }

}
