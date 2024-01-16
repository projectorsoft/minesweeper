import { Button } from "./button";
import { Point } from "./engine/point";
import { Popup } from "./engine/popup";

export class StatisticsPopup extends Popup {
    private _cancelBtn!: Button;
    private _saveBtn!: Button;

    public onCancel!: Function;
    public onSave!: Function;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.createInputs();

        this.onCancel = () => null;
        this.onSave = () => null;
    }

    private createInputs(): void {
        const x = this.position.x + this.width;
        const y = this.position.y + this.height - 40;

        this._cancelBtn = new Button(this._context, new Point(x - 180, y));
        this._cancelBtn.text = "Cancel";
        this._cancelBtn.font = "bold 15px sans-serif";
        this._cancelBtn.width = 80;
        this._cancelBtn.height = 25;
        this._cancelBtn.onClick = this.cancel.bind(this);

        this._saveBtn = new Button(this._context, new Point(x - 90, y));
        this._saveBtn.text = "Save";
        this._saveBtn.font = "bold 15px sans-serif";
        this._saveBtn.width = 80;
        this._saveBtn.height = 25;
        this._saveBtn.onClick = this.save.bind(this);
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave)
            this.onSave();
    }

    protected drawInternal(): void {
        this._cancelBtn.draw();
        this._saveBtn.draw();
    }
}