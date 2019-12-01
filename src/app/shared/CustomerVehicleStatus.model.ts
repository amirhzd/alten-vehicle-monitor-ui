import {VehicleStatus} from './VehicleStatus';
import {CustomerVehicleModel} from './CustomerVehicle.model';

export class CustomerVehicleStatusModel {
  id: number;
  timestamp: Date;
  status: VehicleStatus;
  customerVehicle: CustomerVehicleModel;
}
