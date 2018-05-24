import { CharacterType } from "./character-type.model";

export interface Character {
    id: string;
    name: string;
    image: string;
    type: CharacterType;
    position: Position;
}