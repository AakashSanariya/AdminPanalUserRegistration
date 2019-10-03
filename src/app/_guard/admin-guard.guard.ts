import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate{
  constructor(private router: Router, private toaster: ToastrService) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('role') === "SuperAdmin"){
      return true;
    }
    if(localStorage.getItem('role') === "Admin"){
      this.router.navigate(['/user/list']);
      return true;
    }
    if(localStorage.getItem('role') === "User"){
      this.router.navigate(['profile/profile']);
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
