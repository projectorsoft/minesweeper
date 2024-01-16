import { Button } from "./engine/inputs/button";
import { Point } from "./engine/point";
import { Popup } from "./engine/popup";

export class StatisticsPopup extends Popup {
    private _closeBtn!: Button;

    public onClose!: Function;
    public onSave!: Function;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.createInputs();

        this.onClose = () => null;
    }

    private createInputs(): void {
        const x = this.position.x + this.width;
        const y = this.position.y + this.height - 40;

        this._closeBtn = new Button(this._context, new Point(x - 90, y));
        this._closeBtn.text = "Close";
        this._closeBtn.font = "bold 15px sans-serif";
        this._closeBtn.width = 80;
        this._closeBtn.height = 25;
        this._closeBtn.onClick = this.close.bind(this);
    }

    private close(): void {
        if (this.onClose)
            this.onClose();
    }

    protected drawInternal(): void {
        this._closeBtn.draw();
    }
}