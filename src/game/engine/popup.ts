import { Colors } from "../enums";
import { Game } from "../game";
import { Label } from "./inputs/label";
import { Point } from "./point";

export abstract class Popup {
    protected static readonly cornerRadius = 10;

    protected _context: CanvasRenderingContext2D;

    public title: string = 'Popup';
    public position: Point = new Point(0, 0);
    public width: number = 400;
    public height: number  = 150;

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;

        this.position.x = Game.getWidth() / 2 - this.width / 2;
        this.position.y = window.innerHeight / 2 - this.height;
    }

    protected abstract drawInternal(): void;

    public draw(): void {
        this.drawTransparentBox();
        this.drawPopup();

        Label.drawText(this._context, 
            this.title, this.position.x + 20, this.position.y + 20, { 
            size: 20,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        this.drawInternal();
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
        this._context.roundRect(this.position.x, this.position.y, this.width, this.height, [Popup.cornerRadius]);
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