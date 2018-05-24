import { GridType } from './grid-type.model';
export class GridSquare {

    constructor() {
        this.selected = false;
        this.type = GridType.UNASSIGNED_TYPE;
        this.assetURL = '';
    }

    public selected: boolean;
    public type: GridType;
    public assetURL: string;
}
