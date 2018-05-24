import { Tile, MapLayout } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

export class MapParser {

    mapLayout: BehaviorSubject<MapLayout> = new BehaviorSubject({} as MapLayout);

    // websocket connection
    mapStream: Observable<MapLayout> = Observable.of({} as MapLayout);

    constructor() {
        this.mapLayout.subscribe(newLayout => {
            // post to websocket server
        });

        this.mapStream.subscribe(mapRequest => {
            // check to make sure it wasnt the request that this user made
            // check if the request is a new layout or a request for the current layout
            // check if new request contains a user tile that conflicts with current user tile
            // update map with new layout
        });
    }

    augmentMapTile(tile: Tile): void {
        // look up if there is a tile at the current position
        // if there is a tile at current position, update that position
        // if there is no tile at current position, add the tile to the list of Tiles
    }

}
