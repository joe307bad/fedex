import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GridModule } from './grid/grid.module';
import { AppRoutes } from './app.routing';
import { MapParser, ConnectionResolver, SignalRService } from './map-parser';
import { GridService } from './grid/grid.service';
import { gridSquareReducer } from './reducers/grid-square.reducers';
import { GridSquareEffects } from './effects/grid-square.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot({gridSquares: gridSquareReducer}),
    EffectsModule.forRoot([GridSquareEffects]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [],
  providers: [MapParser, GridService, ConnectionResolver, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
