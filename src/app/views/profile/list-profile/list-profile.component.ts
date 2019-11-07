declare var google: any;
import {Component, OnInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {MapsAPILoader} from "@agm/core";

@Component({
selector: 'app-list-profile',
templateUrl: './list-profile.component.html',
styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {

  @ViewChild("searchInput", {static: false}) searchEle: ElementRef;

  userId: string;
  userDetails: any;
  spinner: boolean = true;
  lat: number;
  lon: number;
  draggable: boolean;
  geoCoder;
  addressName: string;

  constructor( private apiService: ApiServiceService,
               private toaster: ToastrService,
               private route: ActivatedRoute,
               private mapApi: MapsAPILoader,
               private ngZone: NgZone
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')){
      this.userId = localStorage.getItem('userId');
      this.apiService.getUserById(this.userId).subscribe(result => {
        this.spinner = false;
        if(result['meta'].status_code === 200){
          this.userDetails = result['data'].userDetails;

          /* For Map Integration*/
          this.searchingInMap();
          this.lat = 22.811989;
          this.lon =70.823616;
          this.draggable = true;

        }
      }, error => {
        this.spinner = false;
        this.toaster.error(error);
      });
    }
  }

  /* For Map Integration*/
  markerEndMoving($event){
    console.log($event);
    this.lat = $event.coords.lat;
    this.lon = $event.coords.lng;
    this.getAddress(this.lat, this.lon);
  }

  searchingInMap(){
    this.mapApi.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autoComplete = new google.maps.places.Autocomplete(this.searchEle.nativeElement, {
        types: ['address']
      });
      autoComplete.addListener("place_changed", () => {
        /* For Changing a Pin */
        this.ngZone.run(() => {
           let place = google.maps.places.PlaceResult = autoComplete.getPlace();

          if (place.geometry == undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lon = place.geometry.location.lng();
          this.getAddress(this.lat, this.lon);
        });
      });
    });
  }

  getAddress(lattitude, longitude){
    console.log(lattitude + ' ' + longitude);
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: lattitude, lng: longitude } }, (result, status) => {
      if(status == "OK"){
        this.addressName = result[0].formatted_address;
      }
      else{
        this.toaster.error(status);
      }
    })
  }

}
