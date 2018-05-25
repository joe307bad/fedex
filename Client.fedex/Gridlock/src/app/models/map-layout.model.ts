import { Character } from './character.model';
import { Tile } from './tile.model';

export interface MapLayout {
    characters: Character[];
    tiles: Tile[];
}
