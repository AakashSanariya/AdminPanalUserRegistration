import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-sub-admin',
  templateUrl: './add-edit-sub-admin.component.html',
  styleUrls: ['./add-edit-sub-admin.component.css']
})
export class AddEditSubAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(payLoad){
    console.log(payLoad);
  }

}
