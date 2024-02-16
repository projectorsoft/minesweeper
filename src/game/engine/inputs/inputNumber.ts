import { Colors } from "../../enums";
import { Button } from "./button";
import { Component } from "./component";
import { Label } from "./label";

export class InputNumber extends Component {
    private readonly _blankSpace: number = 20;

    private _minValue: number = 0;
    private _maxValue: number = 100;
    private _value: number = 30;
    
    public onIncrease!: Function;
    public onDecrease!: Function;

    public get minValue(): number {
        return this._minValue;
    }
    public set minValue(value: number) {
        this._minValue = value;
    }
    public get maxValue(): number {
        return this._maxValue;
    }
    public set maxValue(value: number) {
        this._maxValue = value;
    }
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;
    }
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        if (value < this._minValue || value > this._maxValue)
            throw 'Wrong value';

        this._value = value;

        const valueLabel = (this.getComponent('valueLabel') as Label);
        if (valueLabel)
            valueLabel.text = this.value.toString();
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onIncrease = () => null;
        this.onDecrease = () => null;
    }

    protected drawInternal(): void {
        // Button background
        this._context.fillStyle = Colors.LightGray;
        this._context.fillRect(this.positionX, this.positionY + 2, 45, 25);

        this._components.forEach(input => input.draw());
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    public create() {
        const decreseBtn = new Button(this._context);
        decreseBtn.parent = this;
        decreseBtn.positionX = this._blankSpace + 30;
        decreseBtn.positionY = 2;
        decreseBtn.text = "<";
        decreseBtn.font = "bold 15px sans-serif";
        decreseBtn.width = 25;
        decreseBtn.height = 25;
        decreseBtn.onClick = this.decrease.bind(this);

        const increaseBtn = new Button(this._context);
        increaseBtn.parent = this;
        increaseBtn.positionX = this._blankSpace + 55;
        increaseBtn.positionY = 2;
        increaseBtn.text = ">";
        increaseBtn.font = "bold 15px sans-serif";
        increaseBtn.width = 25;
        increaseBtn.height = 25;
        increaseBtn.onClick = this.increase.bind(this);

        const valueLabel = new Label(this._context);
        valueLabel.parent = this;
        valueLabel.positionX = 22;
        valueLabel.positionY = 17;
        valueLabel.fontSize = 18;
        valueLabel.align = 'center';
        valueLabel.color = Colors.Red;
        valueLabel.bold = true;
        valueLabel.text = this.value.toString();

        this.addComponent('decreseBtn', decreseBtn);
        this.addComponent('increaseBtn', increaseBtn);
        this.addComponent('valueLabel', valueLabel);
    }

    private increase(): void {
        if (this.value >= this._maxValue)
            return;

        this.value++;

        if (this.onIncrease)
            this.onIncrease();
    }

    private decrease(): void {
        if (this.value <= this._minValue)
            return;

        this.value--;

        if (this.onDecrease)
            this.onDecrease();
    }
}