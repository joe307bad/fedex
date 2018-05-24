import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { GridSquare } from '../../models/grid-square.model';
import { GridType } from '../../models/grid-type.model';

import * as _ from 'lodash';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.less']
})
export class GridLayoutComponent implements OnInit {

  @Input('rows') rows: number;
  @Input('columns') columns: number;

  public menuItems: MenuItem[];

  private _grid: GridSquare[][];

  private _tileTypes = GridType;

  constructor() { }

  ngOnInit() {
    this._grid = [];

    for (let r = 0; r < this.rows; r++) {
      this._grid[r] = [];

      for (let c = 0; c < this.columns; c++) {
        this._grid[r][c] = new GridSquare();
      }
    }

    this.menuItems = [];



    this.menuItems.push({label: 'Assign Terrain', icon: 'fa-compass', items: [
      {label: 'Land 1', styleClass: 'land1', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_01.png'); }}
    ]});
  }

  setTile(gridType: GridType, asset: string) {

    let updatedTiles: GridSquare[] = [];

    for (let r = 0; r < this._grid.length; r++) {
      const newArr = _.filter(this._grid[r], function(tile: GridSquare) {
        return tile.selected;
      });

      if (newArr.length > 0) {
        updatedTiles = updatedTiles.concat(newArr);
      }
    }

    updatedTiles.forEach(function(tile: GridSquare) {
      tile.selected = false;
      tile.type = gridType;
      tile.assetURL = asset;
    });
  }

}