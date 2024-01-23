import { Button } from "../engine/inputs/button";
import { InputNumber } from "../engine/inputs/inputNumber";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";
import { ICustomModeOptions } from "../mineFiledBuilder";

export class CustomBoardSizePopup extends Popup {
    private _xValueInput!: InputNumber;
    private _yValueInput!: InputNumber;
    private _minesValueInput!: InputNumber;
    private _cancelBtn!: Button;
    private _saveBtn!: Button;

    public onCancel!: Function;
    public onSave!: Function;

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this._cancelBtn.enabled = value;
        this._saveBtn.enabled = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onCancel = () => null;
        this.onSave = (x: number, y: number, mines: number) => null;
    }

    protected createInputsInternal(): void {
        this._xValueInput = new InputNumber(this._context);
        this._xValueInput.parent = this;
        this._xValueInput.positionX = 240;
        this._xValueInput.positionY = 42;
        this._xValueInput.minValue = 45;
        this._xValueInput.maxValue = 65;
        this._xValueInput.value = 50;
        this._xValueInput.create();

        this._yValueInput = new InputNumber(this._context);
        this._yValueInput.parent = this;
        this._yValueInput.positionX = 240;
        this._yValueInput.positionY = 72;
        this._yValueInput.minValue = 40;
        this._yValueInput.maxValue = 50;
        this._yValueInput.value = 40;
        this._yValueInput.create();

        this._minesValueInput = new InputNumber(this._context);
        this._minesValueInput.parent = this;
        this._minesValueInput.positionX = 240;
        this._minesValueInput.positionY = 100;
        this._minesValueInput.minValue = 40;
        this._minesValueInput.maxValue = 1600;
        this._minesValueInput.value = 500;
        this._minesValueInput.create();

        this._cancelBtn = new Button(this._context);
        this._cancelBtn.parent = this;
        this._cancelBtn.positionX = 150;
        this._cancelBtn.positionY = 165;
        this._cancelBtn.text = "Cancel";
        this._cancelBtn.font = "bold 15px sans-serif";
        this._cancelBtn.width = 80;
        this._cancelBtn.height = 25;
        this._cancelBtn.onClick = this.cancel.bind(this);

        this._saveBtn = new Button(this._context);
        this._saveBtn.parent = this;
        this._saveBtn.positionX = 240;
        this._saveBtn.positionY = 165;
        this._saveBtn.text = "Save";
        this._saveBtn.font = "bold 15px sans-serif";
        this._saveBtn.width = 80;
        this._saveBtn.height = 25;
        this._saveBtn.onClick = this.save.bind(this);

        this._components.push(this._xValueInput);
        this._components.push(this._yValueInput);
        this._components.push(this._minesValueInput);
        this._components.push(this._cancelBtn);
        this._components.push(this._saveBtn);
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave)
            this.onSave({ xSize: this._xValueInput.value, ySize: this._yValueInput.value, mines: this._minesValueInput.value } as ICustomModeOptions);
    }

    protected drawPopupInternal(): void {
        Label.drawText(this._context, 
            "X size:", this.positionX + 20, this.positionY + 57, { 
            size: 15, 
            bold: true,
            color: Colors.DarkGrey
        });
        this._xValueInput.draw();

        Label.drawText(this._context, 
            "Y size:", this.positionX + 20, this.positionY + 87, { 
            size: 15, 
            bold: true,
            color: Colors.DarkGrey
        });
        this._yValueInput.draw();

        Label.drawText(this._context, 
            "Mines number:", this.positionX + 20, this.positionY + 115, { 
            size: 15, 
            bold: true,
            color: Colors.DarkGrey
        });
        
        this._minesValueInput.draw();
        this._cancelBtn.draw();
        this._saveBtn.draw();
    }
}