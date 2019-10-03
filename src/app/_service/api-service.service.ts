import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../config/config-service";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  /*
  * Display Sub Admin User
  * */
  getsubAdmin(adminDraw: any){
    return this.http.post(CONFIG.findAdmin, adminDraw).pipe(map(result => {
      return result;
    }));
  }

  /*
  * Display User As Per Role User*/
  getUser(userDraw: any){
    return this.http.post(CONFIG.findUser, userDraw).pipe(map(result => {
      return result;
    }));
  }

  /*
  * Display User Profile*/
  getUserById(payLoad){
    return this.http.get(CONFIG.findUserById + payLoad).pipe(map(result => {
      return result;
    }));
  }

  /*
  * Update User Details
  * */
  updateDetails(payLoad,id){
    let userId: number = id;
    return this.http.post(CONFIG.updateUser + userId, payLoad);
  }
}
