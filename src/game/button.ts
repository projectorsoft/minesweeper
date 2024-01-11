import { Point } from "./engine/point";
import { Colors } from "./enums";

export class Button {
    private _context: CanvasRenderingContext2D;
    private _isHighlited: boolean = false;

    public position: Point;
    public width: number = 120;
    public height: number = 40;
    public text: string = "Text";
    public checked: boolean = false;
    public onClick: Function;

    public constructor(context: CanvasRenderingContext2D,
        position: Point) {
            this._context = context;
            this.position = position;
            this.onClick = () => null;
        }

    public draw(): void {
        // Button background
        this._context.fillStyle = this._isHighlited || this.checked ? Colors.LightBlue : Colors.DarkGrey;
        this._context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Button text
        this._context.font = "15px sans-serif";
        this._context.textAlign = "center";
        this._context.textBaseline = "middle";
        this._context.fillStyle = Colors.White;
        this._context.fillText(this.text, this.position.x + this.width / 2, this.position.y + this.height / 2);
    }

    public isClicked(point: Point): boolean {
        if (point.x < this.position.x ||
            point.x > this.position.x + this.width ||
            point.y < this.position.y ||
            point.y > this.position.y + this.height)
            return false;

        if (this.onClick)
            this.onClick();

        return true;
    }

    public onMouseMove(point: Point): void {
        //console.log(this.position, point)
        this._isHighlited = !(point.x < this.position.x ||
            point.x > this.position.x + this.width ||
            point.y < this.position.y ||
            point.y > this.position.y + this.height)
    }

    /* private checkPosition(point: Point): boolean {
        return point.x >= this.position.x ||
            point.x <= this.position.x + this.width ||
            point.y >= this.position.y ||
            point.y <= this.position.y + this.height;
    } */
}