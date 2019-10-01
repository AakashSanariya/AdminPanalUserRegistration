import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, throwError} from "rxjs/index";
import {ToastrService} from "ngx-toastr";
import {AuthServiceService} from "../_service/auth-service.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthServiceService, private router: Router  ,private toastr: ToastrService){ }

    intercept(request: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
        let token = window.localStorage.getItem('token');
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer' + ' ' + token,
                }
            });
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // this.authenticationService.logout();
                this.toastr.error("Your session has beed expired.");
                this.router.navigate(['/login']);
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}
