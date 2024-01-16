import { Point } from "./engine/point";
import { GameMode, GameState } from "./enums";
import { AssetsManager } from "./managers/assetsManager";
import { MineField } from "./mineField";

/* export interface ICustomModeOptions {
    xSize: number;
    ySize: number;
    mines: number;
} */

export class MineFieldBuilder {
    private _context!: CanvasRenderingContext2D;
    private _assetsManager: AssetsManager;
    private _mineField!: MineField;
    private _minesNumber: number[] = [10, 40, 99];
    
    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
        this._context = context;
        this._assetsManager = assetsManager;
    }

    public setDifficulty(mode: GameMode, customOptions?: {xSize: number, ySize: number, mines: number}): MineFieldBuilder {
        let size = mode === GameMode.Custom ? new Point(customOptions.xSize, customOptions.ySize) : MineFieldBuilder.getBoardSize(mode);
        let minesNumber = mode === GameMode.Custom ? customOptions.mines : this._minesNumber[mode];

        this._mineField = new MineField(this._context, this._assetsManager, size.x, size.y);
        this._mineField.createMineField(mode, minesNumber);

        return this;
    }

    public setFiledChangedHandler(handler: (state: GameState) => void): MineFieldBuilder {
        this._mineField.onFieldChanged = handler;
        return this;
    }

    public static getBoardSize(mode: GameMode): Point {
        switch (mode) {
            case GameMode.Easy:
                return new Point(9, 9);
            case GameMode.Medium:
                return new Point(16, 16);
            case GameMode.Difficult:
                return new Point(31, 16);
            default:
                throw Error("Not supported GameMode");
        }
    }

    public Build(): MineField {
        return this._mineField;
    }
} 