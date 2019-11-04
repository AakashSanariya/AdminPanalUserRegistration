import { Component, OnInit } from '@angular/core';
import {NgForm, ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-confirm-and-password',
  templateUrl: './confirm-and-password.component.html',
  styleUrls: ['./confirm-and-password.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ConfirmAndPasswordComponent implements OnInit {

  editDetails: any = {};

  constructor() { }

  ngOnInit() {
  }

}
