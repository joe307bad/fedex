import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GridSquare } from '../../models/grid-square.model';
import { GridType } from '../../models/grid-type.model';

@Component({
  selector: 'app-grid-square',
  templateUrl: './grid-square.component.html',
  styleUrls: ['./grid-square.component.less']
})
export class GridSquareComponent implements OnInit {

  @Input('tile') tile: GridSquare;

  private _hover: boolean;

  public gridTypes = GridType;

  constructor() { }

  ngOnInit() {

  }

  select() {
    this.tile.selected = !this.tile.selected;
  }

  highlight() {
    this._hover = true;
  }

  unhighlight() {
    this._hover = false;
  }

}
