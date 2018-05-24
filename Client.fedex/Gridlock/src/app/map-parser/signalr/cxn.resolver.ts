import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ISignalRConnection, SignalR } from 'ng2-signalr';
import { of, Observable } from 'rxjs';

@Injectable()
export class ConnectionResolver implements Resolve<ISignalRConnection> {

    constructor(private _signalR: SignalR)  { }

    resolve(): Promise<ISignalRConnection> {
        return this._signalR.connect();
    }
}
