import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { GridSquare } from '../../models/grid-square.model';
import { MapParser } from '../../map-parser';
import { GridType } from '../../models/grid-type.model';

import * as _ from 'lodash';
import { GridService } from '../grid.service';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.less']
})
export class GridLayoutComponent implements OnInit {

  public menuItems: MenuItem[];
  private _tileTypes = GridType;

  constructor(private route: ActivatedRoute, public grid: GridService) { }

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
      });
  }

}
