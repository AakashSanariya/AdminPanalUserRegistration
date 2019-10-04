import { Component, OnInit } from '@angular/core';
import {RouterLinkActive, ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-profile-sub-admin',
  templateUrl: './list-profile-sub-admin.component.html',
  styleUrls: ['./list-profile-sub-admin.component.css']
})
export class ListProfileSubAdminComponent implements OnInit {

  userDetails: any;
  spinner: boolean = true;

  constructor(private route: ActivatedRoute,
              private apiService: ApiServiceService,
              private toaster: ToastrService,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.spinner = false;
      if(param.get('id')){
        this.apiService.getUserById(param.get('id')).subscribe(result => {
          if(result){
            if(result['meta'].status_code === 200){
             this.userDetails = result['data'].userDetails;
            }
          }
        }, error => {
          this.spinner = false;
          this.toaster.error(error['meta'].message);
          this.router.navigate(['/subadmin/list']);
        });
      }
    });
  }

}
