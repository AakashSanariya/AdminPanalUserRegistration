import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap";
import {NgForm, ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-first-last-name',
  templateUrl: './first-last-name.component.html',
  styleUrls: ['./first-last-name.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FirstLastNameComponent implements OnInit {

  colorTheme = 'theme-dark-blue'
  bsConfig: Partial<BsDatepickerConfig>;
  editDetails: any = {};

  constructor() {
    this.bsConfig = Object.assign({ dateInputFormat: 'DD/MM/YYYY' }, { containerClass: this.colorTheme }, { isAnimated: true });
  }

  ngOnInit() {
  }

}
