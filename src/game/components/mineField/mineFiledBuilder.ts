import { TimersManager } from "@/game/engine/managers/timersManager";
import { AssetsManager } from "../../engine/managers/assetsManager";
import { Point } from "../../engine/point";
import { GameMode, GameState } from "../../enums";
import { SettingsService } from "../../services/settingsService";
import { MineField } from "./mineField";

export interface ICustomModeOptions {
    xSize: number;
    ySize: number;
    mines: number;
}

export class MineFieldBuilder {
    private _context!: CanvasRenderingContext2D;
    private _settingsService: SettingsService;
    private _assetsManager: AssetsManager;
    private _timersManager: TimersManager;
    private _mineField!: MineField;
    private readonly _minesNumberForMode: number[] = [10, 40, 99];
    
    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        settingsService: SettingsService,
        timersManager: TimersManager) {
        this._context = context;
        this._settingsService = settingsService;
        this._assetsManager = assetsManager;
        this._timersManager = timersManager;
    }

    public setDifficulty(mode: GameMode, customOptions?: ICustomModeOptions, luckyGuess: boolean = false): MineFieldBuilder {
        let size = mode === GameMode.Custom ? new Point(customOptions.xSize, customOptions.ySize) : MineFieldBuilder.getBoardSize(mode);
        let minesNumber = mode === GameMode.Custom ? customOptions.mines : this._minesNumberForMode[mode];

        this._mineField = new MineField(this._context, 
            this._assetsManager, 
            this._settingsService, 
            this._timersManager,
            size.x, 
            size.y,
            minesNumber,
            mode,
            luckyGuess);

        return this;
    }

    public setFiledChangedHandler(handler: (state: GameState) => void): MineFieldBuilder {
        this._mineField.onFieldChanged = handler;
        return this;
    }

    public static getBoardSize(mode: GameMode): Point {
        switch (mode) {
            case GameMode.Easy:
                return new Point(8, 8);
            case GameMode.Medium:
                return new Point(16, 16);
            case GameMode.Difficult:
                return new Point(30, 16);
            default:
                throw Error("Not supported GameMode");
        }
    }

    public Build(): MineField {
        return this._mineField;
    }
} 