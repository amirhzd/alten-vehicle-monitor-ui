import {CustomerModel} from './Customer.model';

export class CustomerVehicleModel {
  id: number;
  vehicleId: string;
  registrationPlate: string;
  customer: CustomerModel;
}
