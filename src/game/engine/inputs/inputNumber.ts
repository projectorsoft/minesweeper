import { Colors } from "../../enums";
import { Button } from "./button";
import { Component } from "./component";
import { Label } from "./label";

export class InputNumber extends Component {
    private _minValue: number = 30;
    private _maxValue: number = 999;
    private _value: number = 30;
    
    public onIncrease!: Function;
    public onDecrease!: Function;

    public get minValue(): number {
        return this._minValue;
    }
    public set minValue(value: number) {
        if (value < 30 || value > 999)
            throw 'Wrong min value';

        this._minValue = value;
    }
    public get maxValue(): number {
        return this._maxValue;
    }
    public set maxValue(value: number) {
        if (value < 30 || value > 1600)
            throw 'Wrong max value';

        this._maxValue = value;
    }
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;

        this._components.forEach(cmp => cmp.enabled = value);
    }
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onIncrease = () => null;
        this.onDecrease = () => null;
    }

    protected drawInternal(): void {
        this.drawValueInput();
        this._components.forEach(input => input.draw());
    }

    private drawValueInput(): void {
        // Button background
        this._context.fillStyle = Colors.LightGray;
        this._context.fillRect(this._positionX - 20, this._positionY + 2, 45, 25);

        Label.drawText(this._context, 
            this.value.toString(), this._positionX, this._positionY + 17, { 
            size: 18,
            align: 'center',
            color: Colors.Red,
            bold: true
        });
    }

    public create() {
        const decreseBtn = new Button(this._context);
        decreseBtn.parent = this;
        decreseBtn.positionX = 30;
        decreseBtn.positionY = 2;
        decreseBtn.text = "<";
        decreseBtn.font = "bold 15px sans-serif";
        decreseBtn.width = 25;
        decreseBtn.height = 25;
        decreseBtn.onClick = this.decrease.bind(this);

        const increaseBtn = new Button(this._context);
        increaseBtn.parent = this;
        increaseBtn.positionX = 55;
        increaseBtn.positionY = 2;
        increaseBtn.text = ">";
        increaseBtn.font = "bold 15px sans-serif";
        increaseBtn.width = 25;
        increaseBtn.height = 25;
        increaseBtn.onClick = this.increase.bind(this);

        this.addComponent('decreseBtn', decreseBtn);
        this.addComponent('increaseBtn', increaseBtn);
    }

    private increase(): void {
        if (this.value >= this._maxValue)
            return;

        this._value++;

        if (this.onIncrease)
            this.onIncrease();
    }

    private decrease(): void {
        if (this.value <= this._minValue)
            return;

        this._value--;

        if (this.onDecrease)
            this.onDecrease();
    }
}