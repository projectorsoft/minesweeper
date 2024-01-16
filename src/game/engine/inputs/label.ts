import { Colors, FontFamily } from "@/game/enums";
import { Point } from "../point";

export interface ILabelOptions {
    size: number, 
    color: Colors | string, 
    family: string,
    align: CanvasTextAlign,
    baseline: CanvasTextBaseline,
    bold: boolean
}

export class Label {
    public static fontFamily: string = FontFamily.SansSerif;
    public static fontSize: number = 12;

    protected _context!: CanvasRenderingContext2D;

    public text: string = 'Popup';
    public position: Point = new Point(0, 0);
    public color: Colors | string = Colors.Black;
    public align: CanvasTextAlign = 'left';
    public fontSize: number = Label.fontSize;
    public fontFamily: string = Label.fontFamily;
    public bold: boolean = false;

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    public draw(): void {
        this._context.font = `${this.bold ? 'bold' : ''} ${this.fontSize}px ${this.fontFamily}`;
        this._context.textAlign = this.align;
        this._context.fillStyle = this.color;
        this._context.fillText(this.text, this.position.x, this.position.y);

        Label.drawText(this._context, 
            this.text, 
            this.position.x, 
            this.position.y, { 
            size: this.fontSize, 
            color: this.color, 
            family: this.fontFamily, 
            align: this.align, 
            bold: this.bold 
        });
    }

    public static drawText(context: CanvasRenderingContext2D,
        text: string, 
        x: number, 
        y: number, 
        options: Partial<ILabelOptions>): void {
            context.font = `${ options?.bold ? 'bold' : '' } ${ options?.size ? options.size : Label.fontSize }px ${ options?.family ? options.family : Label.fontFamily }`;
            context.textAlign = options?.align ? options.align : 'left';
            context.textBaseline = options?.baseline ? options.baseline : "middle";
            context.fillStyle = options?.color ? options.color : Colors.Black;
            context.fillText(text, x, y);
    }
}