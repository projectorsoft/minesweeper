import { Component } from "../engine/inputs/component";
import { GameState, Theme } from "../enums";
import { ThemeBase } from "./mineField/themes/themeBase";
import { ThemeFactory } from "./mineField/themes/themeFactory";

export class FaceIndicator extends Component {
    private _themeFactory: ThemeFactory;
    private _theme: ThemeBase;
    
    public gameState: GameState = GameState.Started;

    public set theme(value: Theme) {
        this._theme = this._themeFactory.Create(value);
    }

    public constructor(context: CanvasRenderingContext2D,
        themeFactory: ThemeFactory) {
            super(context);
            this._themeFactory = themeFactory;
    }

    protected drawInternal(): void {
        this._theme.drawFace(this.positionX, this.positionY, this.gameState)
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }
}