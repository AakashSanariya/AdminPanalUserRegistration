import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {

  userId: string;
  userDetails: any;
  spinner: boolean = true;

  constructor( private apiService: ApiServiceService,
               private toaster: ToastrService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')){
      this.userId = localStorage.getItem('userId');
      this.apiService.getUserById(this.userId).subscribe(result => {
        this.spinner = false;
        if(result['meta'].status_code === 200){
          this.userDetails = result['data'].userDetails;
        }
      }, error => {
        this.spinner = false;
        this.toaster.error(error);
      });
    }
    
  }

}
