import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { GridSquare } from '../models/grid-square.model';
import { GridType } from '../models/grid-type.model';


@Injectable()
export class GridService {

    rows = 10;
    columns = 20;

    private _grid: GridSquare[][];
    private _tileTypes = GridType;

    constructor() {

        this._grid = [];

        for (let r = 0; r < this.rows; r++) {
            this._grid[r] = [];

            for (let c = 0; c < this.columns; c++) {
                this._grid[r][c] = new GridSquare();
                this._grid[r][c].row = r;
                this._grid[r][c].column = c;
            }
        }
    }

    get(r: any) {
        return this._grid;
    }

    setTile(gridType: GridType, asset: string) {

        let updatedTiles: GridSquare[] = [];

        for (let r = 0; r < this._grid.length; r++) {
            const newArr = _.filter(this._grid[r], function (tile: GridSquare) {
                return tile.selected;
            });

            if (newArr.length > 0) {
                updatedTiles = updatedTiles.concat(newArr);
                // this.parser.newTilesStream.next(newArr);
            }
        }

        updatedTiles.forEach(function (tile: GridSquare) {
            tile.selected = false;
            if (gridType === GridType.TERRAIN_TYPE) {
              tile.backgroundAssetURL = asset;
              tile.backgroundType = gridType;
            } else {
              tile.type = gridType;
              tile.assetURL = asset;
            }
          });
    }

    unassignTiles() {
        let updatedTiles: GridSquare[] = [];

        for (let r = 0; r < this._grid.length; r++) {
          const filteredSquares = _.filter(this._grid[r], function (tile: GridSquare) {
            return tile.selected;
          });

          if (filteredSquares.length > 0) {
            updatedTiles = updatedTiles.concat(filteredSquares);
          }
        }

        updatedTiles.forEach(function (tile: GridSquare) {
          tile.selected = false;
          tile.type = GridType.UNASSIGNED_TYPE;
          tile.backgroundType = GridType.UNASSIGNED_TYPE;
          tile.assetURL = '';
          tile.backgroundAssetURL = '';
        });
    }

    getAllAssignedTiles() {
        return _.filter(_.flatten(this._grid), square => square.selected);
    }

}
