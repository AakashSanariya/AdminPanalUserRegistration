import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../_service/auth-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/internal/operators/first";
import {ToastrService} from "ngx-toastr";
import {ApiServiceService} from "../../_service/api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinner: boolean;

  constructor(private authService: AuthServiceService, private router: Router,
              private toaster: ToastrService,
              private apiService: ApiServiceService
  ) { }

  ngOnInit() {
  }

  onSubmit(payLoad){
    this.spinner = true;
    this.authService.login(payLoad).pipe(first()).subscribe(result => {
      if(result){
        this.spinner = false;
        if(result['meta'].status_code == 200){
          localStorage.setItem('token', result['data'].data.token);
          this.apiService.getUserById(result['data'].data.userId).subscribe(data => {
            if(data['data'].userDetails.status == 0){
              this.toaster.error("You can not Approved");
              this.router.navigate(['/login']);
            }
            else{
              localStorage.setItem('userName', result['data'].data.userName);
              localStorage.setItem('userId', result['data'].data.userId);
              localStorage.setItem('role', result['data'].data.role);
              this.toaster.success('User Login Successfully');
              this.router.navigate(['/subadmin/list']);
            }
          }, error => {
            this.toaster.error(error['meta'].message);
          });
        }
      }
    }, error => {
      this.spinner = false;
      this.toaster.error(error['meta'].message);
    })
  }

}
