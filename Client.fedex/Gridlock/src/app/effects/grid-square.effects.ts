import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import * as gridSquareActions from '../actions/grid-square.actions';
import { AugmentTileAction } from '../actions/grid-square.actions';

@Injectable()
export class GridSquareEffects {
    // TODO: Inject the Service here
    constructor(private _actions$: Actions) { }

    @Effect() augmentTiles$ = this._actions$
                              .ofType(gridSquareActions.AUGMENT_TILE)
                              .pipe(switchMap((action: AugmentTileAction) => action.payload));

}
