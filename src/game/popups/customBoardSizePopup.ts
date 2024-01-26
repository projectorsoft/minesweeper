import { ICustomModeOptions } from "../components/mineField/mineFiledBuilder";
import { Button } from "../engine/inputs/button";
import { InputNumber } from "../engine/inputs/inputNumber";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";

export class CustomBoardSizePopup extends Popup {
    public onCancel!: Function;
    public onSave!: Function;

    public set visible(value: boolean) {
        this._visible = value;
        this._components.forEach(cmp => cmp.enabled = value);
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onCancel = () => null;
        this.onSave = (x: number, y: number, mines: number) => null;
    }

    protected createInputsInternal(): void {
        const xValueInput = new InputNumber(this._context);
        xValueInput.parent = this;
        xValueInput.positionX = 240;
        xValueInput.positionY = Popup.HeaderSize + Popup.Padding;
        xValueInput.minValue = 45;
        xValueInput.maxValue = 65;
        xValueInput.value = 50;
        xValueInput.create();

        const yValueInput = new InputNumber(this._context);
        yValueInput.parent = this;
        yValueInput.positionX = 240;
        yValueInput.positionY = Popup.HeaderSize + Popup.Padding + 28;
        yValueInput.minValue = 40;
        yValueInput.maxValue = 50;
        yValueInput.value = 40;
        yValueInput.create();

        const minesValueInput = new InputNumber(this._context);
        minesValueInput.parent = this;
        minesValueInput.positionX = 240;
        minesValueInput.positionY = Popup.HeaderSize + Popup.Padding + 56;
        minesValueInput.minValue = 40;
        minesValueInput.maxValue = 1600;
        minesValueInput.value = 500;
        minesValueInput.create();

        const cancelBtn = new Button(this._context);
        cancelBtn.parent = this;
        cancelBtn.positionX = Popup.Padding;
        cancelBtn.positionY = Popup.HeaderSize + Popup.Padding + 96;
        cancelBtn.text = "Cancel";
        cancelBtn.font = "bold 15px sans-serif";
        cancelBtn.width = 145;
        cancelBtn.height = 30;
        cancelBtn.onClick = this.cancel.bind(this);

        const saveBtn = new Button(this._context);
        saveBtn.parent = this;
        saveBtn.positionX = 175;
        saveBtn.positionY = Popup.HeaderSize + Popup.Padding + 96;
        saveBtn.text = "Save";
        saveBtn.font = "bold 15px sans-serif";
        saveBtn.width = 145;
        saveBtn.height = 30;
        saveBtn.onClick = this.save.bind(this);

        this.addComponent('xValueInput', xValueInput);
        this.addComponent('yValueInput', yValueInput);
        this.addComponent('minesValueInput', minesValueInput);
        this.addComponent('cancelBtn', cancelBtn);
        this.addComponent('saveBtn', saveBtn);
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave)
            this.onSave({ 
                xSize: (this.getComponent('xValueInput') as InputNumber).value, 
                ySize: (this.getComponent('yValueInput') as InputNumber).value, 
                mines: (this.getComponent('minesValueInput') as InputNumber).value 
            } as ICustomModeOptions);
    }

    protected drawPopupInternal(): void {
        Label.drawText(this._context, 
            "X SIZE:", this.positionX + 20, this.positionY + 74, { 
            size: 14, 
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            "Y SIZE:", this.positionX + 20, this.positionY + 104, { 
            size: 14, 
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            "MINES NUMBER:", this.positionX + 20, this.positionY + 132, { 
            size: 14, 
            bold: true,
            color: Colors.Black
        });
        
        this._components.forEach(cmp => cmp.draw());
    }
}