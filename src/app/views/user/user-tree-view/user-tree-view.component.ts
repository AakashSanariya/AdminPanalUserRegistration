import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../../../_service/api-service.service";
import {ToastrService} from "ngx-toastr";
import {TreeviewItem} from "ngx-treeview/src/treeview-item";
import {TreeviewConfig} from "ngx-treeview/src/treeview-config";

@Component({
  selector: 'app-user-tree-view',
  templateUrl: './user-tree-view.component.html',
  styleUrls: ['./user-tree-view.component.css']
})
export class UserTreeViewComponent implements OnInit {

  treeUser: TreeviewItem[] = [];
  items: any;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
  });

  constructor(private apiService: ApiServiceService,
      private toaster: ToastrService
  ) { }

  ngOnInit() {
    let userRole = localStorage.getItem('role');
    if(userRole == 'SuperAdmin' || userRole == 'Admin'){
      this.subAdminList();
    }
    this.userList();
  }

  onFilterChange(value: string) {
  }

  subAdminList(){
    this.apiService.getsubAdmin(this.treeUser).subscribe(result => {
      if(result){
        if(result['meta'].status_code == 200){
          this.items = result['data'].userDetails.original.data;
          let treeArray = [];
          treeArray['subadmin'] = {
            text: 'Sub Admin',
            value: 0,
            children: []
          };
          for(let sub of this.items){
            treeArray['subadmin'].children.push({
              text: sub.firstName + ' ' + sub.lastName,
              value: 1
            });
          }
          for(let item in treeArray){
            const itm = new TreeviewItem(treeArray[item]);
            this.treeUser.push(itm);
          }
          this.items = this.treeUser;
        }
      }
    }, error => {
      if(error['meta'].message){
        this.toaster.error(error['meta'].message);
      }
    });
  }

  userList(){
    this.apiService.getUser(this.treeUser).subscribe(result => {
      if(result){
        if(result['meta'].status_code == 200){
          this.items = result['data'].userDetails.original.data;
          let treeArray = [];
          treeArray['user'] = {
            text: 'User',
            value: 0,
            children: []
          };
          for(let sub of this.items){
            treeArray['user'].children.push({
              text: sub.firstName + ' ' + sub.lastName,
              value: 1
            });
          }
          for(let item in treeArray){
            const itm = new TreeviewItem(treeArray[item]);
            this.treeUser.push(itm);
          }
          this.items = this.treeUser;
          // console.log(this.items);
        }
      }
    }, error => {
      if(error['meta'].message){
        this.toaster.error(error['meta'].message);
      }
    });
  }
}
