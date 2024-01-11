import { Point } from "./engine/point";
import { Asset, Colors, FieldState, FieldType, Sprite } from "./enums";
import { AssetsManager } from "./managers/assetsManager";

export class Field {
    public static readonly fieldSize: number = 30;
    public static readonly marginTop: number = 110;

    private readonly _colors: string[] = [
        Colors.Blue,
        Colors.Green,
        Colors.Red,
        Colors.DarkBlue,
        Colors.Brown,
        Colors.Cyan,
        Colors.Black,
        Colors.Gray
    ];

    private _context!: CanvasRenderingContext2D;
    private _image: CanvasImageSource;
    private _imageIndex: number;
    private _spriteSize: number = 108;
    private _hasMine: boolean;
    private _minesNumber: number;
    private _marginLeft: number;
    
    public fieldType: FieldType;
    public fieldState: FieldState;
    public position: Point;

    public get minesNumber(): number {
        return this._minesNumber;
    }
    public set minesNumber(value: number) {
        this._minesNumber = value;
    }
    public get hasMine(): boolean {
        return this._hasMine;
    }
    public set hasMine(value: boolean) {
        this._hasMine = value;
    }
    public get marginLeft(): number {
        return this._marginLeft;
    }
    public set marginLeft(value: number) {
        this._marginLeft = value;
    }

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        position: Point) {
            this._context = context;
            this.position = position;
            this.fieldType = FieldType.Blank;
            this.fieldState = FieldState.Covered;
            this._minesNumber = 0;
            this._hasMine = false;
            this._image = assetsManager.getImage(Asset.FieldsImg);
            this.setImageIndex();
    }

    public draw(): void {
        this.drawField();
    }

    private drawField(): void {
        this.drawImage(this._imageIndex);

        /* if (this.fieldType === FieldType.Flagged && this._hasMine && this.fieldState === FieldState.Uncovered) {
            this.drawImage(Sprite.Danger);
            return;
        } */

        if (this.fieldState === FieldState.Covered) {
            if (this.fieldType === FieldType.Flagged) {
                this.drawImage(Sprite.Flagged);
            } else
                if (this.fieldType === FieldType.Tentative) {
                    this.drawText('?',
                        new Point(this.position.x * Field.fieldSize + Field.fieldSize / 2, this.position.y * Field.fieldSize + Field.fieldSize / 2 + 8), 
                        Colors.Black,
                        true);
            }

            return;
        }

        if (this._hasMine) {
            this.drawImage(Sprite.Mine);
        }
        else {
            if (this._minesNumber > 0) {
                this.drawText(this._minesNumber.toString(),
                    new Point(this.position.x * Field.fieldSize + Field.fieldSize / 2, this.position.y * Field.fieldSize + Field.fieldSize / 2 + 8), 
                    this._colors[this._minesNumber - 1],
                    true);
            }
        }
    }

    private drawImage(imageIndex: number): void {
        this._context.drawImage(this._image, 
            imageIndex * this._spriteSize, //mine
            0, 
            this._spriteSize, 
            this._spriteSize,
            this.position.x * Field.fieldSize + this._marginLeft, 
            this.position.y * Field.fieldSize + Field.marginTop,
            Field.fieldSize, 
            Field.fieldSize
        );
    }

    private drawText(text: string, position: Point, 
            color: string = 'white',
            bold: boolean = false, 
            align: CanvasTextAlign = 'center'
        ): void {
        this._context.font = `${bold ? 'bold' : ''} 24px PixelCode`;
        this._context.fillStyle = color;
        this._context.textAlign = align;
        this._context.fillText(text, position.x + this._marginLeft, position.y + Field.marginTop - 7);
    }

    private setImageIndex(): void {
        if (this.fieldState === FieldState.Covered) {
            this._imageIndex = Sprite.Uncovered;

            if (this.fieldType === FieldType.Flagged ||
                this.fieldType === FieldType.Tentative)
                this._imageIndex = Sprite.Marked;

            return;
        }

        if (this.hasMine) {
            this._imageIndex = Sprite.Covered;
        }
        else {
            this._imageIndex = Sprite.Empty;
            if (this._minesNumber > 0)
                this._imageIndex = Sprite.Covered;
        }
    }

    public revealFlag(): void {
        this._imageIndex = Sprite.Missed;
        this.fieldType = FieldType.Blank;
        //this.fieldState = FieldState.Uncovered;
        //this._hasMine = true;
    }

    public onLeftClick(x: number, y: number): void {
        if (this.fieldState === FieldState.Uncovered ||
            this.fieldType === FieldType.Flagged)
            return;

        this.fieldState = FieldState.Uncovered;
        this.setImageIndex();

        if (this._hasMine && 
            this.position.x === x && 
            this.position.y === y
        )
            this._imageIndex = Sprite.Danger;
    }

    public onRightClick(x: number, y: number): void {
        if (this.fieldState === FieldState.Uncovered)
            return;

        if (this.fieldType === FieldType.Blank)
            this.fieldType = FieldType.Flagged;
        else
        if (this.fieldType === FieldType.Flagged)
            this.fieldType = FieldType.Tentative;
        else
        if (this.fieldType === FieldType.Tentative)
            this.fieldType = FieldType.Blank;

        this.setImageIndex();
    }
}