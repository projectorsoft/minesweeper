import { Point } from "./engine/point";
import { Asset, Colors, GameState } from "./enums";
import { AssetsManager } from "./managers/assetsManager";

export class ImageObject {
    private readonly _spriteSize: number = 108;

    private _context: CanvasRenderingContext2D;
    private _image: CanvasImageSource;

    public gameState: GameState = GameState.Started;
    public position: Point;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        position: Point) {
            this._context = context;
            this.position = position;
            this._image = assetsManager.getImage(Asset.SpritesImg);
    }

    public draw(): void {
        if (this.gameState === GameState.Started) {
            this._context.fillStyle = Colors.VeryDarkGrey;
            this._context.fillRect(this.position.x, this.position.y, 40, 40);
            return;
        }

        if (this.gameState === GameState.Won)
            this.drawImage(8);
        else
        if (this.gameState === GameState.Lost)
            this.drawImage(9);
    }

    private drawImage(imageIndex: number): void {
        this._context.drawImage(this._image, 
            imageIndex * this._spriteSize,
            0, 
            this._spriteSize, 
            this._spriteSize,
            this.position.x, 
            this.position.y,
            40, 
            40
        );
    }
}