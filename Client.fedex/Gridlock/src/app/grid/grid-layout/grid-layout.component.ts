import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { GridSquare } from '../../models/grid-square.model';
import { MapParser } from '../../map-parser';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.less']
})
export class GridLayoutComponent implements OnInit {

  @Input('rows') rows = 10;
  @Input('columns') columns = 10;

  public menuItems: MenuItem[];

  private _grid: GridSquare[][];

  constructor(private route: ActivatedRoute, private parser: MapParser) {

  }

  ngOnInit() {
    this.parser.mapStream = this.route.snapshot.data['connection'];

    this._grid = [];

    for (let r = 0; r < this.rows; r++) {
      this._grid[r] = [];

      for (let c = 0; c < this.columns; c++) {
        this._grid[r][c] = new GridSquare();
      }
    }

    this.menuItems = [];

    this.menuItems.push({ label: 'Assign Terrain', icon: 'fa-compass' });
  }

}
