import { Point } from "./engine/point";
import { GameMode, GameState } from "./enums";
import { AssetsManager } from "./managers/assetsManager";
import { MineField } from "./mineField";

export class MineFieldBuilder {
    private _context!: CanvasRenderingContext2D;
    private _assetsManager: AssetsManager;
    private _mineField!: MineField;
    
    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
        this._context = context;
        this._assetsManager = assetsManager;
    }

    public setDifficulty(mode: GameMode): MineFieldBuilder {
        const size = MineFieldBuilder.getBoardSize(mode);
        this._mineField = new MineField(this._context, this._assetsManager, size.x, size.y);
        this._mineField.createMineField(mode);

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