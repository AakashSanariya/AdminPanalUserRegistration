import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../config/config-service";
import {map} from "rxjs/internal/operators/map";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router, private http: HttpClient, private toaster: ToastrService) { }

  /*
  * get Login User Information
  * */
  login(payLoad){
    return this.http.post<any>(CONFIG.userLogin, payLoad).pipe(map(user => {
      return user;
    }));
  }

  /*
  * User LogOut
  * */
  signOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.toaster.success("Logout Successfully.");
    this.router.navigate(['/login']);
  }
}
