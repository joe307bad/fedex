import { GridSquare } from '../models/grid-square.model';

export const AUGMENT_TILE = 'AUGMENT_TILE';
export const AUGMENT_TILE_SUCCESS = 'AUGMENT_TILE_SUCCESS';

export class AugmentTileAction {
    readonly type = AUGMENT_TILE;

    constructor(public payload: GridSquare[]) {}
}

export class AugmentTileSuccessAction {
    readonly type = AUGMENT_TILE_SUCCESS;

    constructor(public payload: GridSquare[]) {}
}

export type Action = AugmentTileAction |
                     AugmentTileSuccessAction;
