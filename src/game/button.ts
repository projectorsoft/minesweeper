import { EventBus } from "./engine/eventBus";
import { Point } from "./engine/point";
import { Colors, Event } from "./enums";

export class Button {
    private _context: CanvasRenderingContext2D;
    private _isHighlited: boolean = false;
    private _enabled: boolean = true;

    public position: Point;
    public width: number = 120;
    public height: number = 40;
    public text: string = "Text";
    public checked: boolean = false;
    public onClick: Function;
    public font: string = "15px sans-serif";

    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;
    }

    public constructor(context: CanvasRenderingContext2D,
        position: Point) {
            this._context = context;
            this.position = position;
            this.onClick = () => null;

            EventBus.getInstance().subscribe(Event.OnClick, (point: Point) => this.isClicked(point));
            EventBus.getInstance().subscribe(Event.OnMouseMove, (point: Point) => this.onMouseMove(point));
        }

    public draw(): void {
        // Button background
        this._context.fillStyle = this._isHighlited || this.checked ? Colors.LightBlue : Colors.DarkGrey;
        this._context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Button text
        this._context.font = this.font;
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

        if (this.onClick && this._enabled)
            this.onClick();

        return true;
    }

    public onMouseMove(point: Point): void {
        this._isHighlited = this._enabled && 
            !(point.x < this.position.x ||
            point.x > this.position.x + this.width ||
            point.y < this.position.y ||
            point.y > this.position.y + this.height);
    }
}