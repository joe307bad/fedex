import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GridModule } from './grid/grid.module';
import { AppRoutes } from './app.routing';
import { MapParser, ConnectionResolver, SignalRService } from './map-parser';
import { GridService } from './grid/grid.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [],
  providers: [MapParser, GridService, ConnectionResolver, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
