import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ISignalRConnection, SignalR } from 'ng2-signalr';
import { of, Observable } from 'rxjs';
import { SignalRService } from './signalr.service';

@Injectable()
export class ConnectionResolver implements Resolve<void> {

    constructor(private _signalR: SignalRService)  { }

    resolve(): Promise<void> {
        return this._signalR.startConnection();
    }
}
