import { Colors } from "../enums";
import { Game } from "../game";
import { Point } from "./point";

export abstract class Popup {
    protected static readonly cornerRadius = 10;

    protected _context!: CanvasRenderingContext2D;

    public title: string = 'Popup';
    public position: Point = new Point(0, 0);
    public width: number = 400;
    public height: number  = 150;

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;

        this.position.x = Game.width / 2 - this.width / 2;
        this.position.y = Game.height / 2 - this.height / 2;
    }

    protected abstract drawInternal(): void;

    public draw(): void {
        this.drawTransparentBox();
        this.drawPopup();
        this.drawText(this.title, this.position.x + Popup.cornerRadius, this.position.y + Popup.cornerRadius * 2, Colors.DarkGrey);

        this.drawInternal();
    }

    private drawTransparentBox(): void {
        this._context.save();
        this._context.globalAlpha = 0.45;
        this._context.beginPath();
        this._context.rect(0, 0, Game.width, Game.height);
        this._context.fillStyle = Colors.White;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    private drawPopup(): void {
        this._context.save();
        this._context.beginPath();
        this._context.roundRect(this.position.x, this.position.y, this.width, this.height, [Popup.cornerRadius]);
        this._context.shadowColor = Colors.DarkGrey;
        this._context.shadowBlur = 20;
        this._context.shadowOffsetX = 10;
        this._context.shadowOffsetY = 10;
        this._context.strokeStyle = Colors.Black;
        this._context.stroke();
        this._context.fillStyle = Colors.White;
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    protected drawText(text: string, x: number, y: number, color: Colors): void {
        this._context.font = "bold 20px sans-serif";
        this._context.textAlign = "left";
        this._context.fillStyle = color;
        this._context.fillText(text, x, y);
    }
}