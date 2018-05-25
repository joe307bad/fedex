import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';

import * as gridSquareActions from '../actions/grid-square.actions';
import { AugmentTileAction, AugmentTileSuccessAction } from '../actions/grid-square.actions';
import { MapParser } from '../map-parser/map-parser';

@Injectable()
export class GridSquareEffects {
    // TODO: Inject the Service here
    constructor(private _actions$: Actions, private parser: MapParser) { }

    @Effect() augmentTiles$ = this._actions$
        .ofType(gridSquareActions.AUGMENT_TILE)
        .pipe(
            tap((action: AugmentTileAction) =>
                this.parser.newTilesStream.next(action.payload)),
            map((action: AugmentTileAction) => new AugmentTileSuccessAction(action.payload)));

}
