import { Colors } from "../enums";
import { Minesweeper } from "../minesweeper";
import { Component } from "./inputs/component";
import { Label } from "./inputs/label";

export abstract class Popup extends Component {
    protected static readonly CornerRadius: number = 10;
    protected static readonly Padding: number = 20;
    protected static readonly HeaderSize: number = 40;

    public title: string = 'Popup';

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.createInputs();
    }

    protected abstract drawPopupInternal(): void;
    protected abstract createInputsInternal(): void;

    protected drawInternal(): void {
        //this.drawTransparentBox();
        this.drawPopup();
        this.drawTitleBar();
        this.drawPopupInternal();
    }

    public reposition(): void {
        this.positionX = Minesweeper.getWidth() / 2 - this.width / 2;
        this.positionY = 20;
    }

    private createInputs(): void {
        this.createInputsInternal();
    }

    private drawTransparentBox(): void {
        this._context.save();
        this._context.globalAlpha = 0.3;
        this._context.beginPath();
        this._context.rect(0, 0, Minesweeper.getWidth(), Minesweeper.getHeight());
        this._context.fillStyle = Colors.White;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    private drawPopup(): void {
        this._context.save();
        this._context.beginPath();

        if (this.roundedCorners)
            this._context.roundRect(this.positionX, this.positionY, this.width, this.height, [Popup.CornerRadius]);
        else
            this._context.rect(this.positionX, this.positionY, this.width, this.height);

        this._context.shadowColor = Colors.VeryDarkGrey;
        this._context.shadowBlur = 15;
        this._context.shadowOffsetX = 10;
        this._context.shadowOffsetY = 10;
        this._context.strokeStyle = Colors.Black;
        this._context.stroke();
        this._context.fillStyle = Colors.White;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    private drawTitleBar(): void {
        this._context.beginPath();

        if (this.roundedCorners)
            this._context.roundRect(this.positionX, this.positionY, this.width, Popup.HeaderSize, [Popup.CornerRadius, Popup.CornerRadius, 0 , 0]);
        else
            this._context.rect(this.positionX, this.positionY, this.width, Popup.HeaderSize);

        this._context.strokeStyle = Colors.Black;
        this._context.stroke();
        this._context.fillStyle = Colors.DarkPurple;
        this._context.fill();
        this._context.closePath();

        Label.drawText(this._context, 
            this.title, this.positionX + Popup.Padding, this.positionY + Popup.Padding, { 
            size: 18,
            align: 'left',
            color: Colors.White
        });
    }
}