import { GridType } from './grid-type.model';
export class GridSquare {

    constructor() {
        this.selected = false;
        this.type = GridType.UNASSIGNED_TYPE;
        this.assetURL = '';
        this.row = -1;
        this.column = -1;
    }

    public selected: boolean;
    public type: GridType;
    public assetURL: string;
    public row: number;
    public column: number;
}
