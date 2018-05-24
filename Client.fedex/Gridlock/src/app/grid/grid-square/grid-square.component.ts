import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-grid-square',
  templateUrl: './grid-square.component.html',
  styleUrls: ['./grid-square.component.less']
})
export class GridSquareComponent implements OnInit {

  private _highlighted = false;
  private _hover: boolean;

  constructor() { }

  ngOnInit() {
  }

  select() {
    this._highlighted = !this._highlighted;
  }

  highlight() {
    this._hover = true;
  }

  unhighlight() {
    this._hover = false;
  }

}
