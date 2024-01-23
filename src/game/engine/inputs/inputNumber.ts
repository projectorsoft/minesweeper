import { Colors } from "@/game/enums";
import { Button } from "./button";
import { Component } from "./component";
import { Label } from "./label";

export class InputNumber extends Component {
    private _minValue: number = 30;
    private _maxValue: number = 999;
    
    private _enabled: boolean = true;
    private _value: number = 30;

    private _increaseBtn!: Button;
    private _decreseBtn!: Button;
    
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

        this._increaseBtn.enabled = value;
        this._decreseBtn.enabled = value;
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

        //this.create();
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
        this._decreseBtn = new Button(this._context);
        this._decreseBtn.parent = this;
        this._decreseBtn.positionX = 30;
        this._decreseBtn.positionY = 2;
        this._decreseBtn.text = "<";
        this._decreseBtn.font = "bold 15px sans-serif";
        this._decreseBtn.width = 25;
        this._decreseBtn.height = 25;
        this._decreseBtn.onClick = this.decrease.bind(this);

        this._increaseBtn = new Button(this._context);
        this._increaseBtn.parent = this;
        this._increaseBtn.positionX = 55;
        this._increaseBtn.positionY = 2;
        this._increaseBtn.text = ">";
        this._increaseBtn.font = "bold 15px sans-serif";
        this._increaseBtn.width = 25;
        this._increaseBtn.height = 25;
        this._increaseBtn.onClick = this.increase.bind(this);

        this._components.push(this._decreseBtn);
        this._components.push(this._increaseBtn);
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