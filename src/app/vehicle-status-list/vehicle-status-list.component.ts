import {Component, OnInit} from '@angular/core';
import {CustomerVehicleStatusService} from '../customer-vehicle-status.service';
import {CustomerService} from '../customer.service';
import {CustomerVehicleStatusModel} from '../shared/CustomerVehicleStatus.model';
import {VehicleStatus} from '../shared/VehicleStatus';
import {CustomerModel} from '../shared/Customer.model';
import {CustomerVehicleStatusWebservice} from '../customer-vehicle-status.webservice';
import {VehicleStatusSubscriberInterface} from '../shared/vehicle-status-subscriber.interface';

@Component({
  selector: 'app-vehicle-status-list',
  templateUrl: './vehicle-status-list.component.html',
  styleUrls: ['./vehicle-status-list.component.css']
})
export class VehicleStatusListComponent implements OnInit {

  customerVehicleStatusWebservice: CustomerVehicleStatusWebservice;
  customerVehicleStatusList: CustomerVehicleStatusModel[];
  selectedStatusValue: any;
  customerList: CustomerModel[];
  selectedCustomer: any;
  statuses = [];
  constructor(private serverService: CustomerVehicleStatusService, private customerService: CustomerService) { }

  ngOnInit() {
    const mySubscriber: VehicleStatusSubscriberInterface = data => {
      this.customerVehicleStatusList = JSON.parse(data);
    }
    this.customerVehicleStatusWebservice = new CustomerVehicleStatusWebservice(mySubscriber);
    this.subscribeWebsocket();
    this.loadVehicleStatuses();
    this.customerService.getCustomers()
      .subscribe(
        (data: CustomerModel[]) => {
          this.customerList = data;
        },
        (error) => {console.log(error); }
      );
    this.statuses = [
      { value: VehicleStatus.CONNECTED, name: 'CONNECTED' },
      { value: VehicleStatus.NOT_CONNECTED, name: 'NOT_CONNECTED' }
    ];
  }

  getVehicleStatusesByFilter(customerId: number, status: VehicleStatus): void {
    this.serverService.getCustomerVehicleStatuses(customerId, status)
      .subscribe(
        (data: CustomerVehicleStatusModel[]) => {
          this.customerVehicleStatusList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadVehicleStatuses(): void {
    this.getVehicleStatusesByFilter(null, null);
  }

  filterChanged() {
    this.customerVehicleStatusWebservice.sendGetVehicleStatuses({customerId: this.selectedCustomer, status: this.selectedStatusValue});
    this.getVehicleStatusesByFilter(this.selectedCustomer, this.selectedStatusValue);
  }

  private subscribeWebsocket() {
    this.customerVehicleStatusWebservice.connect();
    setTimeout(() => {
    this.customerVehicleStatusWebservice.sendGetVehicleStatuses({customerId: this.selectedCustomer, status: this.selectedStatusValue}); },
      3000);
  }
}
