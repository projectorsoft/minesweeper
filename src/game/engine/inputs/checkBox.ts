import { Colors, InputEvent, MouseButtons } from "@/game/enums";
import { Helpers } from "@/game/helpers/helpers";
import { EventBus } from "../events/eventBus";
import { IMouseClickEvent } from "../events/types/IMouseClickEvent";
import { IMouseMoveEvent } from "../events/types/IMouseMoveEvent";
import { Component } from "./component";
import { Label } from "./label";

export class CheckBox extends Component {
    public text: string = "Text";
    public checked: boolean = false;
    public onClick: Function = () => null;
    public font: string = "15px sans-serif";
    public color: Colors | string = Colors.White;
    public checkedColor: Colors | string = Colors.LightBlue;
    public disabledColor: Colors | string = Colors.GrayHighlight;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        if (Helpers.hasTouchScreen())
            EventBus.getInstance()
            .subscribe(InputEvent.OnTap, (event: IMouseClickEvent) => {
                    this.click(event.x, event.y);
            });
        else {
            EventBus.getInstance()
            .subscribe(InputEvent.OnClick, (event: IMouseClickEvent) => {
                if (event.button === MouseButtons.Left)
                    this.click(event.x, event.y);
            });
            EventBus.getInstance()
                .subscribe(InputEvent.OnMouseMove, (event: IMouseMoveEvent) => this.mouseMove(event.x, event.y));
        }
    }

    public createComponents(): void {
        const label = new Label(this._context);
        label.parent = this;
        label.text = this.text;
        label.positionX = this.width + 10;
        label.positionY = 11;
        label.fontSize = 15;
        label.color = this._enabled ? Colors.Black : Colors.Gray;

        this.addComponent('label', label);
    }
    
    protected drawInternal(): void {
        this.drawFrame();
        this._components.forEach(component => component.draw());
    }

    protected drawFrame(): void {
        // Button background
        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = this.checked ? this.checkedColor : this.color;
        this._context.strokeStyle = Colors.DarkGrey;
        this._context.lineWidth = 5;

        if (!this._enabled)
            this._context.fillStyle = this.disabledColor;

        this._context.roundRect(this.positionX + 2, this.positionY, this._width, this._height, [3]);

        this._context.stroke();
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    protected clickInternal(x: number, y: number): void {
        if (!this._enabled)
            return;

        if (x < this.positionX ||
            x > this.positionX + this._width ||
            y < this.positionY ||
            y > this.positionY + this._height)
            return;

        this.checked = !this.checked;

        if (this.onClick)
            this.onClick();
    }

    protected mouseMoveInternal(x: number, y: number): void {
    }
}