import { Component, OnInit, Input } from '@angular/core';
import { GridSquare } from '../shared/grid-square.model';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {

  @Input('rows') rows: number;
  @Input('columns') columns: number;

  private _grid: GridSquare[][];

  constructor() { }

  ngOnInit() {
    this._grid = [];

    for (let r = 0; r < this.rows; r++) {
      this._grid[r] = [];

      for (let c = 0; c < this.columns; c++) {
        this._grid[r][c] = new GridSquare();
      }
    }
  }

}
