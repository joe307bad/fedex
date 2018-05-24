import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable()
export class SignalRService {
  foodchanged = new EventEmitter();
  // messageReceived = new EventEmitter<ChatMessage>();
  newCpuValue = new EventEmitter<Number>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {  }

  sendChatMessage(message: any) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/mapDefinitionHub')
      .build();
  }

  startConnection(): Promise<void> {
    this.createConnection();
    this.registerOnServerEvents();
    return this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('broadcastMap', (data: any, message: any) => {
      console.log(message);
    });
    this._hubConnection.on('echo', (data: any) => {
      console.log(data);
    });

  }
}
