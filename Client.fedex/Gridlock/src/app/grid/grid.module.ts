import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridSquareComponent } from './grid-square/grid-square.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GridSquareComponent, GridLayoutComponent],
  exports: [GridLayoutComponent]
})
export class GridModule { }
