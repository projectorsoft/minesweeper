import { TimersManager } from "@/game/engine/managers/timersManager";
import { AssetsManager } from "../../engine/managers/assetsManager";
import { Point } from "../../engine/point";
import { GameMode, GameState, Theme } from "../../enums";
import { SettingsService } from "../../services/settingsService";
import { MineField } from "./mineField";
import { ThemeFactory } from "./themes/themeFactory";

export interface ICustomModeOptions {
    xSize: number;
    ySize: number;
    mines: number;
}

export class MineFieldBuilder {
    private readonly _minesNumberForMode: number[] = [10, 40, 99];

    private _context!: CanvasRenderingContext2D;
    private _settingsService: SettingsService;
    private _assetsManager: AssetsManager;
    private _timersManager: TimersManager;
    private _themeFactory: ThemeFactory;

    private _mineField!: MineField;
    private _luckyGuess: boolean = false;
    private _allowQuestionmark: boolean = true;
    private _mode: GameMode = GameMode.Easy;
    private _customOptions?: ICustomModeOptions;
    private _onChangeHandler: Function = (state: GameState) => null;
    private _theme: Theme;
    
    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        settingsService: SettingsService,
        timersManager: TimersManager,
        themeFactory: ThemeFactory) {
        this._context = context;
        this._settingsService = settingsService;
        this._assetsManager = assetsManager;
        this._timersManager = timersManager;
        this._themeFactory = themeFactory;
    }

    public setDifficulty(mode: GameMode, customOptions?: ICustomModeOptions): MineFieldBuilder {
        this._mode = mode;
        this._customOptions = customOptions;

        return this;
    }

    public setLuckyGuess(value: boolean): MineFieldBuilder {
        this._luckyGuess = value;

        return this;
    }

    public setAllowQuestionmark(value: boolean): MineFieldBuilder {
        this._allowQuestionmark = value;

        return this;
    }

    public setFieldChangedHandler(handler: (state: GameState) => void): MineFieldBuilder {
        this._onChangeHandler = handler;
        
        return this;
    }

    public setTheme(theme: Theme): MineFieldBuilder {
        this._theme = theme;

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
        let size = this._mode === GameMode.Custom 
            ? new Point(this._customOptions.xSize, this._customOptions.ySize) 
            : MineFieldBuilder.getBoardSize(this._mode);

        let minesNumber = this._mode === GameMode.Custom 
            ? this._customOptions.mines 
            : this._minesNumberForMode[this._mode];

        this._mineField = new MineField(this._context, 
            this._assetsManager, 
            this._settingsService, 
            this._timersManager,
            this._themeFactory,
            size.x, 
            size.y,
            minesNumber,
            this._mode,
            this._luckyGuess,
            this._allowQuestionmark);

        this._mineField.setTheme(this._theme);
        this._mineField.onFieldChanged = this._onChangeHandler;

        return this._mineField;
    }
} 