import { Colors } from "../enums";
import { Game } from "../game";
import { Component } from "./inputs/component";
import { Label } from "./inputs/label";

export abstract class Popup extends Component {
    protected static readonly cornerRadius = 10;

    protected _visible: boolean = false;

    public title: string = 'Popup';
    private _width: number = 0;
    private _height: number = 0;

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;

        this.positionX = Game.getWidth() / 2 - this.width / 2;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;

        this.positionY = Game.getHeight() / 2 - this.height;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.createInputs();
    }

    protected abstract drawPopupInternal(): void;
    protected abstract createInputsInternal(): void;

    protected drawInternal(): void {
        if (!this._visible)
            return;

        this.drawTransparentBox();
        this.drawPopup();

        Label.drawText(this._context, 
            this.title, this.positionX + 20, this.positionY + 20, { 
            size: 20,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        this.drawPopupInternal();
    }

    private createInputs(): void {
        this.createInputsInternal();
    }

    private drawTransparentBox(): void {
        this._context.save();
        this._context.globalAlpha = 0.4;
        this._context.beginPath();
        this._context.rect(0, 0, Game.getWidth(), Game.getHeight());
        this._context.fillStyle = Colors.LightGray;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    private drawPopup(): void {
        this._context.save();
        this._context.beginPath();
        this._context.roundRect(this.positionX, this.positionY, this.width, this.height, [Popup.cornerRadius]);
        this._context.shadowColor = Colors.DarkGrey;
        this._context.shadowBlur = 25;
        this._context.shadowOffsetX = 15;
        this._context.shadowOffsetY = 15;
        this._context.strokeStyle = Colors.Black;
        this._context.stroke();
        this._context.fillStyle = Colors.LightGray;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }
}