import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { GridSquareComponent } from './grid-square/grid-square.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { MapParser } from '../map-parser';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'mapDefinitionHub';
  // c.qs = { user: 'donald' };
  c.url = 'http://localhost:49467';
  // c.logging = true;

  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

@NgModule({
  imports: [
    CommonModule,
    ContextMenuModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [MapParser],
  declarations: [GridSquareComponent, GridLayoutComponent],
  exports: [GridLayoutComponent]
})
export class GridModule { }
