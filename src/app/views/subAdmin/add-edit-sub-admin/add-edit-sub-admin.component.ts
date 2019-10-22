import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-add-edit-sub-admin',
  templateUrl: './add-edit-sub-admin.component.html',
  styleUrls: ['./add-edit-sub-admin.component.css']
})
export class AddEditSubAdminComponent implements OnInit {

  colorTheme = 'theme-dark-blue'
  bsConfig: Partial<BsDatepickerConfig>;
  editDetails: any = {};

  constructor() {
    this.bsConfig = Object.assign({ dateInputFormat: 'DD/MM/YYYY' }, { containerClass: this.colorTheme }, { isAnimated: true });
  }

  ngOnInit() {
  }

  onSubmit(payLoad){
    console.log(payLoad);
  }

}
