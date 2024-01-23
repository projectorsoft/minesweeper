import { Colors, InputEvent } from "../../enums";
import { EventBus } from "../events/eventBus";
import { Point } from "../point";
import { Component } from "./component";
import { Label } from "./label";

export class Button extends Component {
    private _isHighlited: boolean = false;
    private _enabled: boolean = true;

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

    public constructor(context: CanvasRenderingContext2D) {
            super(context);
            this.onClick = () => null;

            EventBus.getInstance().subscribe(InputEvent.OnClick, (point: Point) => this.isClicked(point));
            EventBus.getInstance().subscribe(InputEvent.OnMouseMove, (point: Point) => this.onMouseMove(point));
    }

    protected drawInternal(): void {
        // Button background
        this._context.fillStyle = this._isHighlited || this.checked ? Colors.LightBlue : Colors.DarkGrey;
        this._context.fillRect(this.positionX, this.positionY, this.width, this.height);

        Label.drawText(this._context, 
            this.text, this.positionX + this.width / 2, this.positionY + this.height / 2, { 
            size: 15,
            align: 'center',
            color: Colors.White
        });
    }

    public isClicked(point: Point): boolean {
        if (point.x < this.positionX ||
            point.x > this.positionX + this.width ||
            point.y < this.positionY ||
            point.y > this.positionY + this.height)
            return false;

        if (this.onClick && this._enabled)
            this.onClick();

        return true;
    }

    public onMouseMove(point: Point): void {
        this._isHighlited = this._enabled && 
            !(point.x < this.positionX ||
            point.x > this.positionX + this.width ||
            point.y < this.positionY ||
            point.y > this.positionY + this.height);
    }
}