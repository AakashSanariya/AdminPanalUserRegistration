import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {CONFIG} from "../config/config-service";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class ApiVideoServiceService {

  constructor( private http: HttpClient
  ) { }
  
  getVideoList(videoDraw: any){
    return this.http.post(CONFIG.listVideo, videoDraw).pipe(map(result => {
      return result;
    }));
  }

  addVideo(payLoad: any){
    return this.http.post(CONFIG.video, payLoad).pipe(map(result => {
      return result;
    }));
  }

  editVideo(payLoad){
    return this.http.get(CONFIG.videoFindById + payLoad).pipe(map(result => {
      return result;
    }));
  }
  
  updateVideo(payLoad, id){
    return this.http.post(CONFIG.updateVideo + id, payLoad).pipe(map(result => {
      return result;
    }));
  }
}
