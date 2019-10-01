import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../_service/auth-service.service";
import {Router} from "@angular/router";
import {first} from "rxjs/internal/operators/first";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router,
              private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit(payLoad){
    this.authService.login(payLoad).pipe(first()).subscribe(result => {
      if(result){
        if(result['meta'].status_code == 200){
          this.toaster.success('User Login Successfully');
          localStorage.setItem('token', result['data'].data.token);
          localStorage.setItem('userName', result['data'].data.userName);
          localStorage.setItem('userId', result['data'].data.userId);
          localStorage.setItem('role', result['data'].data.role);
          this.router.navigate(['/subadmin/list']);
        }
        else{
          this.toaster.error("!Opps Some Error Occurs")
        }
      }
    }, error => {
      this.toaster.error(error);
    })
  }

}
