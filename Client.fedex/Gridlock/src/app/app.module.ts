import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GridModule } from './grid/grid.module';
import { AppRoutes } from './app.routing';
import { MapParser, ConnectionResolver } from './map-parser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [ConnectionResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
