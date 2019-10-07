import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../../_service/api-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails: any;
  spinner: boolean = true;

  constructor(private apiService: ApiServiceService,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if(param){
        if(param.get('id')){
          this.apiService.getUserById(param.get('id')).subscribe(result => {
            this.spinner = false;
            if(result){
              if(result['meta'].status_code === 200){
                this.userDetails = result['data'].userDetails;
              }
              else{
                this.toaster.error('!Opps Some Error Occurs');
              }
            }
          }, error => {
            this.spinner = false;
            this.toaster.error(error['meta'].message);
            this.router.navigate(['/user/list']);
          });
        }
      }
    })
  }

}
