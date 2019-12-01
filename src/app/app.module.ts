import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgSelectModule} from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { VehicleStatusListComponent } from './vehicle-status-list/vehicle-status-list.component';
import {CustomerVehicleStatusService} from './customer-vehicle-status.service';
import {CustomerService} from './customer.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleStatusListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [CustomerVehicleStatusService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
