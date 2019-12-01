import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {VehicleStatus} from './shared/VehicleStatus';
import {environment} from '../environments/environment';


@Injectable()
export class CustomerVehicleStatusService {
  private readonly API_URL = environment.api_url;
  private readonly PARAM_STATUS = 'status';
  private readonly PARAM_CUSTOMER_ID = 'customerId';
  constructor(private httpClient: HttpClient) {}

  getCustomerVehicleStatuses(customerId: number, status: VehicleStatus) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    console.log(customerId);
    if (customerId) {
      console.log('customer added');
      params = params.set(this.PARAM_CUSTOMER_ID, customerId.toString());
    }
    console.log(status);
    if (status) {
      console.log('status added');
      params = params.set(this.PARAM_STATUS, status);
    }
    return this.httpClient.get(this.API_URL + '/api/customer-vehicle-statuses', { headers, params });
  }
}
