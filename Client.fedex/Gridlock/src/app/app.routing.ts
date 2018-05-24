import { Route } from '@angular/router';
import { ConnectionResolver } from './map-parser';
import { GridLayoutComponent } from './grid/grid-layout/grid-layout.component';

export const AppRoutes: Route[] = [
    {
        path: '',
        component: GridLayoutComponent,
        resolve: { connection: ConnectionResolver }
    }
];
