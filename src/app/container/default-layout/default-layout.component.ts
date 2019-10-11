import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthServiceService} from "../../_service/auth-service.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private authService: AuthServiceService, private modalService: BsModalService,
              private permissionService: NgxPermissionsService
  ) { }

  userName: string;
  userRole: string;
  modalRef: BsModalRef;

  ngOnInit() {
    if(localStorage.getItem('userName')){
      this.userName = localStorage.getItem('userName');
    }
    if(localStorage.getItem('role')){
      this.userRole = localStorage.getItem('role');
      if(this.userRole == 'SuperAdmin'){
        this.permissionService.loadPermissions(['SUPER_ADMIN', 'ADMIN', 'USER']);
      }
      if(this.userRole == 'Admin'){
        this.permissionService.loadPermissions(['ADMIN', 'USER']);
      }
      else{
        this.permissionService.loadPermissions(['USER']);
      }
    }
  }

  /*Login and Logout Button Display*/
  logOutButtonDisplay(){
    let hastoken = window.localStorage.getItem('token');
    if(hastoken){
      return true;
    }
    else{
      return false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  logOut(){
    this.authService.signOut();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
