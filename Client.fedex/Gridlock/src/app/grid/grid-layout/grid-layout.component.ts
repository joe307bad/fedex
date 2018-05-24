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
        this._grid[r][c].row = r;
        this._grid[r][c].column = c;
      }
    }

    this.menuItems = [];



    this.menuItems.push({label: 'Assign Terrain',
      items: [
        {label: 'Quicksand', styleClass: 'land1', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_01.png'); }},
        {label: 'Bluegrass', styleClass: 'land2', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_02.png'); }},
        {label: 'Ooze', styleClass: 'land3', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_03.png'); }},
        {label: 'Stone Tile', styleClass: 'land4', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_04.png'); }},
        {label: 'Lava', styleClass: 'land5', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_05.png'); }},
        {label: 'Wood Chips', styleClass: 'land6', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_06.png'); }}
      ]
    });
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
