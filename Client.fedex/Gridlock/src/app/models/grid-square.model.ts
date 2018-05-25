import { GridType } from './grid-type.model';
export class GridSquare {

    constructor() {
        this.selected = false;
        this.type = GridType.UNASSIGNED_TYPE;
        this.backgroundType = GridType.UNASSIGNED_TYPE;
        this.assetURL = '';
        this.backgroundAssetURL = '';
        this.row = -1;
        this.column = -1;
    }

    public selected: boolean;
    public type: GridType;
    public backgroundType: GridType;
    public assetURL: string;
    public backgroundAssetURL: string;
    public row: number;
    public column: number;
}
