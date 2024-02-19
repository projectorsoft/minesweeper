import { Colors, FontFamily } from "@/game/enums";
import { Component } from "./component";

export interface ILabelOptions {
    size: number, 
    color: Colors | string,
    backgroundColor: Colors | string | undefined,
    family: string,
    align: CanvasTextAlign,
    baseline: CanvasTextBaseline,
    bold: boolean
}

export class Label extends Component {
    public static FontFamily: string = FontFamily.SansSerif;
    public static FontSize: number = 12;

    public text: string = 'Popup';
    public color: Colors | string = Colors.Black;
    public align: CanvasTextAlign = 'left';
    public fontSize: number = Label.FontSize;
    public fontFamily: string = Label.FontFamily;
    public bold: boolean = false;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);
    }

    protected drawInternal(): void {
        this._context.font = `${this.bold ? 'bold' : ''} ${this.fontSize}px ${this.fontFamily}`;
        this._context.textAlign = this.align;
        this._context.fillStyle = this.color;
        this._context.fillText(this.text, this.positionX, this.positionY);

        Label.drawText(this._context, 
            this.text, 
            this.positionX, 
            this.positionY, { 
            size: this.fontSize, 
            color: this.color,
            family: this.fontFamily, 
            align: this.align, 
            bold: this.bold
        });
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    public static drawText(context: CanvasRenderingContext2D,
        text: string, 
        x: number, 
        y: number, 
        options: Partial<ILabelOptions>): void {
            context.font = `${ options?.bold ? 'bold' : '' } ${ options?.size ? options.size : Label.FontSize }px ${ options?.family ? options.family : Label.FontFamily }`;
            const size = context.measureText(text);
            
            if (options.backgroundColor) {
                context.beginPath();
                context.fillStyle = options.backgroundColor;
                context.rect(x, y, size.width, 30);
                context.fill();
                context.closePath();
            }

            context.textAlign = options?.align ? options.align : 'left';
            context.textBaseline = options?.baseline ? options.baseline : "middle";
            context.fillStyle = options?.color ? options.color : Colors.Black;
            context.fillText(text, x, y);
    }
}