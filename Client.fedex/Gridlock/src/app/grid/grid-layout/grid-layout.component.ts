import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { GridSquare } from '../../models/grid-square.model';
import { MapParser } from '../../map-parser';
import { GridType } from '../../models/grid-type.model';

import * as _ from 'lodash';
import { GridService } from '../grid.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.less']
})
export class GridLayoutComponent implements OnInit {

  public menuItems: MenuItem[];
  private _tileTypes = GridType;

  constructor(private route: ActivatedRoute, public grid: GridService, private _store: Store<AppState>) { }

  ngOnInit() {

    this.menuItems = [];

    this.menuItems.push({
      label: 'Assign Terrain',
      items: [
        { label: 'Quicksand', styleClass: 'land1', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_01.png'); } },
        { label: 'Bluegrass', styleClass: 'land2', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_02.png'); } },
        { label: 'Ooze', styleClass: 'land3', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_03.png'); } },
        { label: 'Stone Tile', styleClass: 'land4', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_04.png'); } },
        { label: 'Lava', styleClass: 'land5', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_05.png'); } },
        { label: 'Wood Chips', styleClass: 'land6', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/land_06.png'); } }
      ]
    },
      { separator: true },
      { label: 'Clear Selected Tiles', icon: 'fa-eraser', command: (event) => { this.grid.unassignTiles(); } },
      {
        label: 'Assign Monster',
        items: [
          { label: 'Plushie Kappa', styleClass: 'mon1', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/monster_01.png'); } },
          { label: 'Yellow Applemon', styleClass: 'mon2', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/monster_02.png'); } },
          { label: 'Red Applemon', styleClass: 'mon3', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/monster_03.png'); } }
        ]
      },
      {
        label: 'Assign Player',
        items: [
          { label: 'Fancy Gent', styleClass: 'avatar1', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/avatar_01.png'); } },
          { label: 'Unicorn', styleClass: 'avatar2', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/avatar_02.png'); } },
          { label: 'Nom Nom', styleClass: 'avatar3', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/avatar_03.png'); } },
          { label: 'Stegocatus', styleClass: 'avatar4', command: (event) => { this.grid.setTile(this._tileTypes.TERRAIN_TYPE, './assets/avatar_04.png'); } },
        ]
      },
      { separator: true },
      { label: 'Clear Selected Tiles', icon: 'fa-eraser', command: (event) => { this.grid.unassignTiles(); } });
  }

  setTile(gridType: GridType, asset: string) {

    let updatedTiles: GridSquare[] = [];

    for (let r = 0; r < this.grid.rows; r++) {
      const newArr = _.filter(this.grid[r], function (tile: GridSquare) {
        return tile.selected;
      });

      if (newArr.length > 0) {
        updatedTiles = updatedTiles.concat(newArr);
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

    for (let r = 0; r < this.grid.rows; r++) {
      const filteredSquares = _.filter(this.grid[r], function (tile: GridSquare) {
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

}
