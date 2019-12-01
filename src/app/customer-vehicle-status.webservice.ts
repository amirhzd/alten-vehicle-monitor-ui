import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../environments/environment';
import {VehicleStatusSubscriberInterface} from './shared/vehicle-status-subscriber.interface';

export class CustomerVehicleStatusWebservice {
  private readonly webSocketEndPoint =  environment.api_url + '/ws';
  topic = '/user/queue/get-vehicle-statuses';
  stompClient: any;
  constructor(private subscriber: VehicleStatusSubscriberInterface) {}
  connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const me = this;
    me.stompClient.connect({}, (frame) => {
      me.stompClient.subscribe(me.topic, (msg) => {
        this.subscriber(msg.body);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   */
  sendGetVehicleStatuses(message) {
    console.log('calling api via web socket');
    this.stompClient.send('/get-vehicle-statuses', {}, JSON.stringify(message));
  }
}
