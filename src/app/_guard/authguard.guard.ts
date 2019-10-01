import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements  CanActivate{

  constructor(private router: Router, private toaster: ToastrService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let user = localStorage.getItem('token');
    if(!user){
      this.toaster.error('Please Login First');
      this.router.navigate(['/login']);
    }
    else{
      return true;
    }
  }
}
