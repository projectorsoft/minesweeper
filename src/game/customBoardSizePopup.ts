import { Button } from "./engine/inputs/button";
import { InputNumber } from "./engine/inputs/inputNumber";
import { Label } from "./engine/inputs/label";
import { Point } from "./engine/point";
import { Popup } from "./engine/popup";
import { ICustomModeOptions } from "./mineFiledBuilder";

export class CustomBoardSizePopup extends Popup {
    private _xValueInput!: InputNumber;
    private _yValueInput!: InputNumber;
    private _minesValueInput!: InputNumber;
    private _cancelBtn!: Button;
    private _saveBtn!: Button;

    public onCancel!: Function;
    public onSave!: Function;

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.width = 400;
        this.height = 200;
        this.createInputs();

        this.onCancel = () => null;
        this.onSave = (x: number, y: number, mines: number) => null;
    }

    private createInputs(): void {
        const x = this.position.x + this.width;
        const y = this.position.y + this.height - 40;

        this._xValueInput = new InputNumber(this._context, new Point(this.position.x + 240, this.position.y + 42));
        this._xValueInput.minValue = 45;
        this._xValueInput.maxValue = 65;
        this._xValueInput.value = 50;

        this._yValueInput = new InputNumber(this._context, new Point(this.position.x + 240, this.position.y + 72));
        this._yValueInput.minValue = 40;
        this._yValueInput.maxValue = 50;
        this._yValueInput.value = 40;

        this._minesValueInput = new InputNumber(this._context, new Point(this.position.x + 240, this.position.y + 100));
        this._minesValueInput.minValue = 40;
        this._minesValueInput.maxValue = 1600;
        this._minesValueInput.value = 500;

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
            this.onSave({ xSize: this._xValueInput.value, ySize: this._yValueInput.value, mines: this._minesValueInput.value } as ICustomModeOptions);
    }

    protected drawInternal(): void {
        Label.drawText(this._context, 
            "X size:", this.position.x + 20, this.position.y + 57, { 
            size: 16, 
            bold: true
        });
        this._xValueInput.draw();

        Label.drawText(this._context, 
            "Y size:", this.position.x + 20, this.position.y + 87, { 
            size: 16, 
            bold: true
        });
        this._yValueInput.draw();

        Label.drawText(this._context, 
            "Mines number:", this.position.x + 20, this.position.y + 115, { 
            size: 16, 
            bold: true
        });
        this._minesValueInput.draw();

        this._cancelBtn.draw();
        this._saveBtn.draw();
    }
}