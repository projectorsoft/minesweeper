
import { Button } from "./button"
import { Label } from "./label";
import { AssetsManager } from "../managers/assetsManager";
import { Asset } from "../../enums";

export interface IImageButtonOptions {
    asset: Asset
}

export class ImageButton extends Button {
    private readonly _spriteSize: number = 24;
    private readonly _displaySize = 48;

    private _image: CanvasImageSource;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        options: IImageButtonOptions) {
        super(context);

        this._image = assetsManager.getImage(options.asset);
        this.highlightColor = '#38393C';
    }

    protected drawInternal(): void {
        this.drawFrame();
        this.drawImage();

        Label.drawText(this._context, 
            this.text, this.positionX + this.width / 2, this.positionY + this.height - 10, { 
            size: 12,
            align: 'center',
            color: '#9AA0A6' //Colors.LightGray
        });
    }

    private drawImage(): void {
        this._context.drawImage(this._image, 
            0,
            0, 
            this._spriteSize, 
            this._spriteSize,
            this.positionX + 10, 
            this.positionY + 10,
            this._displaySize, 
            this._displaySize
        );
    }
}