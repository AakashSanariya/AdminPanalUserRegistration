import {Component, OnInit, Input, Injector} from '@angular/core';
import {createCustomElement} from "@angular/elements";

@Component({
  selector: 'app-reusable',
  templateUrl: './reusable.component.html',
  styleUrls: ['./reusable.component.css']
})
export class ReusableComponent implements OnInit {

  @Input() userName: string;
  constructor() {
  }
  
  ngOnInit() {
  }

}
