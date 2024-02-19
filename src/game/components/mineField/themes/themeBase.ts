import { AssetsManager } from "@/game/engine/managers/assetsManager";
import { GameState } from "@/game/enums";

export interface IThemeParams {
    flagsNumber: number;
    time: number;
    positionX; 
    positionY: number;
    width: number;
    height: number;
}

export abstract class ThemeBase {
    protected _context: CanvasRenderingContext2D;
    protected _assetsManager: AssetsManager;

    protected _image: CanvasImageSource;
    protected _spriteSize: number = 108;
    protected _displaySize = 40;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
        this._context = context;
        this._assetsManager = assetsManager;
    }

    abstract draw(params: IThemeParams): void;
    abstract drawFace(positionX: number, positionY: number, gameState: GameState): void;

    protected abstract drawClocks(params: IThemeParams): void;
}