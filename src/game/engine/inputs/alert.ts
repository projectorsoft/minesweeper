
import { AlertType, Colors } from "@/game/enums";
import { Game } from "@/game/game";
import { Component } from "./component";
import { Label } from "./label";

export class Alert extends Component {
    protected static readonly Padding: number = 20;
    protected static readonly CornerRadius: number = 10;

    private _colors: Colors[] = [
        Colors.Success,
        Colors.Danger,
        Colors.Warning,
        Colors.Info
    ];
    private _timer: number | null = null;

    public text: string;
    public type: AlertType = AlertType.Info;

    public override set visible(value: boolean) {
        this._visible = value;

        if (value) {
            if (this._timer) {
                window.clearTimeout(this._timer);
            }

            this._timer = window.setTimeout(() => {
                this._visible = false;
                window.clearTimeout(this._timer);
                this._timer = null;
            }, 2500);
        } else {
            window.clearTimeout(this._timer);
        }
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.visible = false;
        this.roundedCorners = true;
    }

    protected drawInternal(): void {
        const width: number = this._context.measureText(this.text).width + Alert.Padding;
        const xPos = Game.getWidth() - width - Alert.Padding;
        const yPos = Alert.Padding;

        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = this._colors[this.type];

        if (this.roundedCorners)
            this._context.roundRect(xPos, yPos, width, 40, [Alert.CornerRadius]);
        else
            this._context.rect(xPos, yPos, width, 40);

        this._context.fill();
        this._context.closePath();
        this._context.restore();

        Label.drawText(this._context, 
            this.text, xPos + 100, yPos + 20, { 
            size: 15,
            align: 'center',
            color: this._enabled ? Colors.White : Colors.Gray
        });
    }
}