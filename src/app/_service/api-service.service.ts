import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../config/config-service";
import {map} from "rxjs/internal/operators/map";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  
  getsubAdmin(){
    return this.http.get(CONFIG.findAdmin).pipe(map(result => {
      return result;
    }));
  }

  getUser(){
    return this.http.get(CONFIG.findUser).pipe(map(result => {
      return result;
    }));
  }

  getUserById(payLoad){
    return this.http.get(CONFIG.findUserById + payLoad).pipe(map(result => {
      return result;
    }));
  }

  updateDetails(payLoad,id){
    let userId: number = id;
    return this.http.post(CONFIG.updateUser + userId, payLoad);
  }
}
