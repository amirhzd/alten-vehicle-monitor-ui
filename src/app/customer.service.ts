import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class CustomerService {
  private readonly API_URL = environment.api_url;
  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get(this.API_URL + '/api/customers');
  }
}
