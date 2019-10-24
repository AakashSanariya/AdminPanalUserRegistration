import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate{
  constructor(private router: Router, private toaster: ToastrService,
              private permissionService: NgxPermissionsService
  ) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('role') === "SuperAdmin"){
      this.permissionService.loadPermissions(['SUPER_ADMIN', 'ADMIN', 'USER']);
      return true;
    }
    if(localStorage.getItem('role') === "Admin"){
      this.permissionService.loadPermissions(['ADMIN', 'USER']);
      this.router.navigate(['/dashboard']);
      return true;
    }
    if(localStorage.getItem('role') === "User"){
      this.permissionService.loadPermissions(['USER']);
      this.router.navigate(['/dashboard']);
      return true;
    }
    else{
      this.toaster.error("You Can Not Allowed this Url Access");
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
