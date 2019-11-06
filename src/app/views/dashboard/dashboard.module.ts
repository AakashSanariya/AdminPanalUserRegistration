import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {ChartsModule} from "ng2-charts";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
