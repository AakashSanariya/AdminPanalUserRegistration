import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {mergeMap} from "rxjs/internal/operators/mergeMap";
import {map} from "rxjs/internal/operators/map";
import {filter} from "rxjs/internal/operators/filter";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Base Angular Demo';
  constructor(private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(){
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd),
            map(() => {
              let route = this.activatedRoute.firstChild;
              let child = route;
              while (child) {
                if (child.firstChild) {
                  child = child.firstChild;
                  route = child;
                } else {
                  child = null;
                }
              }
              return route;
            }),
            mergeMap(route => route.data)
        )
        .subscribe(data => {
          if(data.title){
            this.titleService.setTitle(this.title + '|' + data.title);
          }
        });
  }
}
