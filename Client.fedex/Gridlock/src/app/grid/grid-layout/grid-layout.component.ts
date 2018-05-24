import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { GridSquare } from '../../models/grid-square.model';
import { MapParser } from '../../map-parser';
import { GridType } from '../../models/grid-type.model';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.less']
})
export class GridLayoutComponent implements OnInit {

  @Input('rows') rows = 10;
  @Input('columns') columns = 20;

  public menuItems: MenuItem[];

  private _grid: GridSquare[][];
  private _tileTypes = GridType;

  constructor(private route: ActivatedRoute, private parser: MapParser, private _store: Store<AppState>) {

  }

  ngOnInit() {
    this.parser.mapStream = this.route.snapshot.data['connection'];

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

    console.log(this._store);


    this.menuItems.push({
      label: 'Assign Terrain',
      items: [
        { label: 'Quicksand', styleClass: 'land1', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_01.png'); } },
        { label: 'Bluegrass', styleClass: 'land2', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_02.png'); } },
        { label: 'Ooze', styleClass: 'land3', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_03.png'); } },
        { label: 'Stone Tile', styleClass: 'land4', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_04.png'); } },
        { label: 'Lava', styleClass: 'land5', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_05.png'); } },
        { label: 'Wood Chips', styleClass: 'land6', command: (event) => { this.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_06.png'); } }
      ]
    },
      {
        label: 'Assign Monster',
        items: [
          { label: 'Plushie Kappa', styleClass: 'mon1', command: (event) => { this.setTile(this._tileTypes.MONSTER_TYPE, './assets/monster_01.png'); } },
          { label: 'Yellow Applemon', styleClass: 'mon2', command: (event) => { this.setTile(this._tileTypes.MONSTER_TYPE, './assets/monster_02.png'); } },
          { label: 'Red Applemon', styleClass: 'mon3', command: (event) => { this.setTile(this._tileTypes.MONSTER_TYPE, './assets/monster_03.png'); } }
        ]
      },
      {
        label: 'Assign Player',
        items: [
          { label: 'Fancy Gent', styleClass: 'avatar1', command: (event) => { this.setTile(this._tileTypes.AVATAR_TYPE, './assets/avatar_01.png'); } },
          { label: 'Unicorn', styleClass: 'avatar2', command: (event) => { this.setTile(this._tileTypes.AVATAR_TYPE, './assets/avatar_02.png'); } },
          { label: 'Nom Nom', styleClass: 'avatar3', command: (event) => { this.setTile(this._tileTypes.AVATAR_TYPE, './assets/avatar_03.png'); } },
          { label: 'Stegocatus', styleClass: 'avatar4', command: (event) => { this.setTile(this._tileTypes.AVATAR_TYPE, './assets/avatar_04.png'); } },
        ]
      },
      { separator: true },
      { label: 'Clear Selected Tiles', icon: 'fa-eraser', command: (event) => { this.unassignTiles(); } });
  }

  setTile(gridType: GridType, asset: string) {

    let updatedTiles: GridSquare[] = [];

    for (let r = 0; r < this._grid.length; r++) {
      const newArr = _.filter(this._grid[r], function (tile: GridSquare) {
        return tile.selected;
      });

      if (newArr.length > 0) {
        updatedTiles = updatedTiles.concat(newArr);
      }
    }

    updatedTiles.forEach(function (tile: GridSquare) {
      tile.selected = false;
      tile.type = gridType;
      tile.assetURL = asset;
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
      tile.assetURL = '';
    });

  }

}
