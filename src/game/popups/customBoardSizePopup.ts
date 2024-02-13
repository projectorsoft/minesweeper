import { ICustomModeOptions } from "../components/mineField/mineFiledBuilder";
import { Alert } from "../engine/inputs/alert";
import { Button } from "../engine/inputs/button";
import { InputNumber } from "../engine/inputs/inputNumber";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { AlertType, Colors } from "../enums";

export class CustomBoardSizePopup extends Popup {
    public onCancel!: Function;
    public onSave!: Function;

    public override set visible(value: boolean) {
        this._visible = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onCancel = () => null;
        this.onSave = (x: number, y: number, mines: number) => null;
    }

    protected createInputsInternal(): void {
        const xValueInput = new InputNumber(this._context);
        xValueInput.parent = this;
        xValueInput.positionX = 220;
        xValueInput.positionY = Popup.HeaderSize + Popup.Padding;
        xValueInput.minValue = 9;
        xValueInput.maxValue = 65;
        xValueInput.value = 31;
        xValueInput.create();

        const yValueInput = new InputNumber(this._context);
        yValueInput.parent = this;
        yValueInput.positionX = 220;
        yValueInput.positionY = Popup.HeaderSize + Popup.Padding + 28;
        yValueInput.minValue = 9;
        yValueInput.maxValue = 50;
        yValueInput.value = 9;
        yValueInput.create();

        const minesValueInput = new InputNumber(this._context);
        minesValueInput.parent = this;
        minesValueInput.positionX = 220;
        minesValueInput.positionY = Popup.HeaderSize + Popup.Padding + 56;
        minesValueInput.minValue = 27;
        minesValueInput.maxValue = 1300;
        minesValueInput.value = 50;
        minesValueInput.create();

        const cancelBtn = new Button(this._context);
        cancelBtn.parent = this;
        cancelBtn.positionX = Popup.Padding;
        cancelBtn.positionY = Popup.HeaderSize + Popup.Padding + 96;
        cancelBtn.text = "Cancel";
        cancelBtn.font = "bold 15px sans-serif";
        cancelBtn.width = 145;
        cancelBtn.height = 30;
        cancelBtn.backgroundColor = Colors.Danger;
        cancelBtn.highlightColor = Colors.RedHighlight;
        cancelBtn.onClick = this.cancel.bind(this);

        const saveBtn = new Button(this._context);
        saveBtn.parent = this;
        saveBtn.positionX = 175;
        saveBtn.positionY = Popup.HeaderSize + Popup.Padding + 96;
        saveBtn.text = "Save";
        saveBtn.font = "bold 15px sans-serif";
        saveBtn.width = 145;
        saveBtn.height = 30;
        saveBtn.backgroundColor = Colors.Success;
        saveBtn.highlightColor = Colors.GreenHighlight;
        saveBtn.onClick = this.save.bind(this);

        const alert = new Alert(this._context);
        alert.text = 'Cannot save changes';

        this.addComponent('xValueInput', xValueInput);
        this.addComponent('yValueInput', yValueInput);
        this.addComponent('minesValueInput', minesValueInput);
        this.addComponent('cancelBtn', cancelBtn);
        this.addComponent('saveBtn', saveBtn);
        this.addComponent('saveAlert', alert);
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave) {
            const xValue: number = (this.getComponent('xValueInput') as InputNumber).value;
            const yValue: number = (this.getComponent('yValueInput') as InputNumber).value;
            const minesValue: number = (this.getComponent('minesValueInput') as InputNumber).value;

            if (minesValue <= (xValue * yValue) / 3)
            this.onSave({ 
                xSize: xValue, 
                ySize: yValue, 
                mines: minesValue 
            } as ICustomModeOptions);
            else {
                const alert = (this.getComponent('saveAlert') as Alert);
                alert.text = "Mines number must be not grater than 1/3 of board cells"
                alert.type = AlertType.Danger;
                alert.visible = true;
            }
        }
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