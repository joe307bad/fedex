import { MapLayout } from './map-layout.model';

export interface MapRequest {
    requestType: 'map-layout' | 'map-update';
    mapLayout: MapLayout;
}
