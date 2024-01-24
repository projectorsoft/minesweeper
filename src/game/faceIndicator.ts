import { Component } from "./engine/inputs/component";
import { AssetsManager } from "./engine/managers/assetsManager";
import { Asset, Colors, GameState, Sprite } from "./enums";

export class FaceIndicator extends Component {
    private readonly _spriteSize: number = 108;
    private readonly _displaySize = 40;

    private _image: CanvasImageSource;

    public gameState: GameState = GameState.Started;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
            super(context);
            this._image = assetsManager.getImage(Asset.SpritesImg);
    }

    protected drawInternal(): void {
        if (this.gameState === GameState.Started) {
            this._context.clearRect(this.positionX, this.positionY, this._displaySize, this._displaySize)
            return;
        }

        if (this.gameState === GameState.Won)
            this.drawImage(Sprite.Win);
        else
        if (this.gameState === GameState.Lost)
            this.drawImage(Sprite.Lost);
    }

    private drawImage(imageIndex: number): void {
        this._context.drawImage(this._image, 
            imageIndex * this._spriteSize,
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