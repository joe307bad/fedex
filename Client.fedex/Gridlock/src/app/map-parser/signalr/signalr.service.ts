import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { GridSquare } from '../../models/grid-square.model';
import { GridService } from '../../grid/grid.service';

@Injectable()
export class SignalRService {
  foodchanged = new EventEmitter();
  // messageReceived = new EventEmitter<ChatMessage>();
  newCpuValue = new EventEmitter<Number>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  private user: any;
  private isNewUser = true;

  constructor(private grid: GridService) {
    this.user = this.generateGuid();
  }

  sendMessage(newTiles: GridSquare[], isNewUser = false, forNewUser = false) {
    this._hubConnection.invoke('broadcastMap', '', {
      user: this.user,
      isNewUser: isNewUser,
      tiles: newTiles
    });
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
        this.sendMessage([], true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('broadcastMap', (data: any, message: any) => {

      if (message.user !== this.user) {

        // check if user is is not your own and isNewUser is false and forNewUser is false
        // if not send off "set new tiles" function
        if (!message.isNewUser
          && !message.forNewUser
          && message.tiles.length) {

          message.tiles.forEach(tile => this.grid.setTile(tile.type, tile));
          return false;
        }

        // if is new user, dispatch message requesting with all tiles
        if (message.isNewUser) {
          this.sendMessage(this.grid.getAllAssignedTiles(), false, true);
          return false;
        }

        // check if self isNewUser and forNewUser is true
        // populate with all tiles
        if (this.isNewUser && message.forNewUser) {
          this.isNewUser = false;
          message.tiles.forEach(tile => this.grid.setSingleTile(tile));
          return false;
        }

      }
    });
    this._hubConnection.on('echo', (data: any) => {
      console.log(data);
    });

  }

  private generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
