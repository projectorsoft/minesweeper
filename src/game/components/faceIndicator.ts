import { Component } from "../engine/inputs/component";
import { AssetsManager } from "../engine/managers/assetsManager";
import { Asset, GameState } from "../enums";

export class FaceIndicator extends Component {
    private readonly _spriteSize: number = 24;
    private readonly _displaySize = 48;

    private _smileImage: CanvasImageSource;
    private _sadImage: CanvasImageSource;

    public gameState: GameState = GameState.Started;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
            super(context);
            this._smileImage = assetsManager.getImage(Asset.SmileImgSvg);
            this._sadImage = assetsManager.getImage(Asset.SadImgSvg);
    }

    protected drawInternal(): void {
        if (this.gameState === GameState.Started) {
            this._context.clearRect(this.positionX, this.positionY, this._displaySize, this._displaySize)
            return;
        }

        if (this.gameState === GameState.Won)
            this.drawImage(this._smileImage);
        else
        if (this.gameState === GameState.Lost)
            this.drawImage(this._sadImage);
    }

    private drawImage(image: CanvasImageSource): void {
        this._context.drawImage(image, 
            0,
            0, 
            this._spriteSize, 
            this._spriteSize,
            this.positionX, 
            this.positionY,
            this._displaySize, 
            this._displaySize
        );
    }
}