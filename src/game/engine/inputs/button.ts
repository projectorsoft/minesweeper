import { Helpers } from "@/game/helpers/helpers";
import { Colors, InputEvent, MouseButtons } from "../../enums";
import { EventBus } from "../events/eventBus";
import { IMouseClickEvent } from "../events/types/IMouseClickEvent";
import { IMouseMoveEvent } from "../events/types/IMouseMoveEvent";
import { Component } from "./component";
import { Label } from "./label";

export class Button extends Component {
    protected static readonly CornerRadius: number = 5;

    protected _isHighlited: boolean = false;

    public text: string = "Text";
    public checked: boolean = false;
    public onClick: Function = () => null;
    public font: string = "15px sans-serif";
    public highlightColor: Colors | string = Colors.LightBlue;
    public backgroundColor: Colors | string = Colors.DarkGrey;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        if (Helpers.hasTouchScreen())
            EventBus.getInstance()
            .subscribe(InputEvent.OnTap, (event: IMouseClickEvent) => {
                    this.isClicked(event.x, event.y);
            });
        else {
            EventBus.getInstance()
            .subscribe(InputEvent.OnClick, (event: IMouseClickEvent) => {
                if (event.button === MouseButtons.Left)
                    this.isClicked(event.x, event.y);
            });
            EventBus.getInstance()
                .subscribe(InputEvent.OnMouseMove, (event: IMouseMoveEvent) => this.onMouseMove(event.x, event.y));
        }
    }

    protected drawInternal(): void {
        this.drawFrame();

        Label.drawText(this._context, 
            this.text, this.positionX + this._width / 2, this.positionY + this._height / 2, { 
            size: 15,
            align: 'center',
            color: this._enabled ? Colors.White : Colors.Gray
        });
    }

    protected drawFrame(): void {
        // Button background
        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = (this._isHighlited || this.checked) && this._enabled ? this.highlightColor : this.backgroundColor;

        if (this.roundedCorners)
            this._context.roundRect(this.positionX, this.positionY, this._width, this._height, [Button.CornerRadius]);
        else
            this._context.rect(this.positionX, this.positionY, this._width, this._height);

        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    public isClicked(x: number, y: number): boolean {
        if (!this._visible || !this._enabled)
            return;

        if (x < this.positionX ||
            x > this.positionX + this._width ||
            y < this.positionY ||
            y > this.positionY + this._height)
            return false;

        if (this.onClick)
            this.onClick();

        return true;
    }

    public onMouseMove(x: number, y: number): void {
        this._isHighlited = this._visible && this._enabled && 
            !(x < this.positionX ||
            x > this.positionX + this._width ||
            y < this.positionY ||
            y > this.positionY + this._height);
    }
}