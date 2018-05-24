import * as gridSquareActions from '../actions/grid-square.actions';
import * as _ from 'lodash';
import { GridSquare } from '../models/grid-square.model';

export function gridSquareReducer(state = [], action: gridSquareActions.Action) {
    switch (action.type) {
        case gridSquareActions.AUGMENT_TILE_SUCCESS : {
            const augmentedTiles = _.filter(state, function(tile) {
                return _.some(action.payload, function(updatedTile) {
                    return tile.row === updatedTile.row && tile.column === updatedTile.column;
                });
            });

            augmentedTiles.forEach(tileToUpdate => {
                const updatedTile = _.find(action.payload, function(tileTofind: GridSquare) {
                    return tileTofind.row === tileToUpdate.row && tileTofind.column === tileToUpdate.row;
                });

                tileToUpdate.assetURL = updatedTile.assetURL;
                tileToUpdate.type = updatedTile.type;
                tileToUpdate.selected = updatedTile.selected;
            });

            return state;
        }
        default: {
            return state;
        }
    }
}
