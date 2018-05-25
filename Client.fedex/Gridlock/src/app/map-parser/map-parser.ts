import { BehaviorSubject, Observable, of } from 'rxjs';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { Injectable } from '@angular/core';

import { Tile, MapLayout } from '../models';
import { SignalRService } from './signalr/signalr.service';
import { GridSquare } from '../models/grid-square.model';

@Injectable()
export class MapParser {

    newTilesStream: BehaviorSubject<GridSquare[]> = new BehaviorSubject([]);

    // websocket connection
    mapStream: Observable<MapLayout> = of({} as MapLayout);

    constructor(private signalr: SignalRService) {
        this.newTilesStream.subscribe(newTiles => {
            // post to websocket server
            if (newTiles.length) {
                this.signalr.sendMessage(newTiles);
            }
        });

        this.mapStream.subscribe(mapRequest => {
            // check to make sure it wasnt the request that this user made
            // check if the request is a new layout or a request for the current layout
            // check if new request contains a user tile that conflicts with current user tile
            // update map with new layout
        });
    }

    setTiles() {

    }

    augmentMapTile(tile: Tile): void {
        // look up if there is a tile at the current position
        // if there is a tile at current position, update that position
        // if there is no tile at current position, add the tile to the list of Tiles
    }

}
