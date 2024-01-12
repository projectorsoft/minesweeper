import { Point } from "./engine/point";
import { Colors, FieldState, FieldType, GameMode, GameState } from "./enums";
import { Field } from "./field";
import { Game } from "./game";
import { Helpers } from "./helpers";
import { AssetsManager } from "./managers/assetsManager";

export class MineField {
    public static readonly minMarginLeft: number = 15;

    private _context: CanvasRenderingContext2D;
    private _fields: Field[][];
    private _xSize: number;
    private _ySize: number;
    private _minesNumber: number[] = [10, 40, 99];
    private _mines: Map<string, Point> = new Map<string, Point>();
    private _flaggedFields: Map<string, Point> = new Map<string, Point>();
    private _flagsNumber: number;
    private _uncoveredFieldsLeft: number;
    private _time: number;
    private _timerId: number = 0;
    private _marginLeft: number;

    public onFieldChanged: (state: GameState) => void;

    public get xSize(): number {
        return this._xSize;
    }
    public get ySize(): number {
        return this._ySize;
    }
    public get width(): number {
        return Field.fieldSize * this.xSize;
    }
    public get height(): number {
        return Field.fieldSize * this.ySize;
    }
    public get marginLeft(): number {
        return this._marginLeft;
    }

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager,
        xSize: number, 
        ySize: number) {
        this._context = context;
        this._xSize = xSize;
        this._ySize = ySize;
        this._marginLeft = Math.floor((Game.width - Field.fieldSize * this.xSize) / 2);

        if (this._marginLeft <= 0)
            this._marginLeft = MineField.minMarginLeft;

        this._uncoveredFieldsLeft = this._xSize * this._ySize;
        this._fields = [];

        //create mine field array
        for (let x = 0; x < this._xSize; x++) {
            this._fields[x] = [];
            for (let y = 0; y < this._ySize; y++) {
                this._fields[x][y] = new Field(context, assetsManager, new Point(x, y));
                this._fields[x][y].marginLeft = this._marginLeft;
            }
        }
    }

    public draw(): void {
        this.drawMenuBar();
        this.drawFrame();
        this.drawClocks();

        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                this._fields[i][j]?.draw();
            }
        }
    }

    private drawClocks(): void {
        this.drawText(this._flagsNumber.toString(), 42, new Point(-15, -40), 'rgb(255, 0, 0)', true, 'left');

        const zeroPad = (num, places) => String(num).padStart(places, '0');

        if (this._time < 1000)
            this.drawText(zeroPad(this._time, 3), 42, new Point(Field.fieldSize * this.xSize + 15, -40), 'rgb(255, 0, 0)', true, 'right');
        else
            this.drawText('999', 42, new Point(Field.fieldSize * this.xSize, -40), 'rgb(255, 0, 0)', true, 'right');
    }

    private drawFrame(): void {
        this._context.beginPath();
        this._context.strokeStyle = Colors.White;
        this._context.fillStyle = Colors.White;
        this._context.roundRect(this._marginLeft - 15, Field.marginTop - 15, Field.fieldSize * this.xSize + 30, Field.fieldSize * this.ySize + 30, [43]);
        this._context.stroke();
        this._context.fill();
        this._context.closePath();

        this._context.beginPath();
        this._context.strokeStyle = Colors.Gray;
        this._context.fillStyle = Colors.LightGray;
        this._context.roundRect(this._marginLeft - 12, Field.marginTop - 12, Field.fieldSize * this.xSize + 24, Field.fieldSize * this.ySize + 24, [40]);
        this._context.stroke();
        this._context.fill();
        this._context.closePath();
    }

    private drawMenuBar(): void {
        this._context.beginPath();
        this._context.fillStyle = Colors.DarkGrey;
        this._context.rect(this._marginLeft - 15, 0, Field.fieldSize * this.xSize + 30, 40);
        this._context.fill();
        this._context.closePath();
    }

    public createMineField(mode: GameMode): void {
        const minesNumber = this._minesNumber[mode];
        this._flagsNumber = minesNumber;
        this._time = 0;

        //generate mines
        let x: number, y: number;

        for (let i = 0; i < minesNumber; i++) {
            x = Helpers.getRndInteger(0, this._xSize - 1);
            y = Helpers.getRndInteger(0, this._ySize - 1);

            let point = new Point(x, y);

            while (this._mines.has(`${point.x},${point.y}`)) {
                x = Helpers.getRndInteger(0, this._xSize - 1);
                y = Helpers.getRndInteger(0, this._ySize - 1);

                point = new Point(x, y);
            }

            this._fields[x][y].hasMine = true;
            this.incrementFieldMinesNumber(x, y)
            this._mines.set(`${point.x},${point.y}`, point);
        }
    }

    private incrementFieldMinesNumber(x: number, y: number): void {
        if (MineField.checkField(this._fields, x - 1, y - 1))
            this._fields[x - 1][y - 1].minesNumber++;

        if (MineField.checkField(this._fields, x, y - 1))
            this._fields[x][y - 1].minesNumber++;

        if (MineField.checkField(this._fields, x + 1, y - 1))
            this._fields[x + 1][y - 1].minesNumber++;

        if (MineField.checkField(this._fields, x - 1, y))
            this._fields[x - 1][y].minesNumber++;

        if (MineField.checkField(this._fields, x + 1, y))
            this._fields[x + 1][y].minesNumber++;

        if (MineField.checkField(this._fields, x - 1, y + 1))
            this._fields[x - 1][y + 1].minesNumber++;

        if (MineField.checkField(this._fields, x, y + 1))
            this._fields[x][y + 1].minesNumber++;

        if (MineField.checkField(this._fields, x + 1, y + 1))
            this._fields[x + 1][y + 1].minesNumber++;
    }

    private checkWinningCondition(): void {
        //all empty fields have been revealed and all flags set on mines
        if (this._uncoveredFieldsLeft === 0) {
            this.stopTimer();
            if (this.onFieldChanged)
                this.onFieldChanged(GameState.Won);
        }
    }

    private isLostCondition(coordinates: Point): boolean {
        if (!this._fields[coordinates.x][coordinates.y].hasMine)
            return false;

        //mine has been clicked
        this.stopTimer();

        //'blow' other mines
        this._mines.forEach(mine => {
            if (this._fields[mine.x][mine.y].fieldType !== FieldType.Tentative)
                this._fields[mine.x][mine.y].onLeftClick(coordinates.x, coordinates.y);
        });

        //reveal flag if mine is not on the field
        this._flaggedFields.forEach(flagged => {
            if (!this._fields[flagged.x][flagged.y].hasMine)
                this._fields[flagged.x][flagged.y].revealFlag();
        });

        if (this.onFieldChanged)
            this.onFieldChanged(GameState.Lost);

        return true;
    }

    public onLeftButtonClick(mouseX: number, mouseY: number): void {
        const coordinates = this.getFieldCoordinates(mouseX, mouseY);

        if (!coordinates)
            return;

        //first click, start timer
        if (!this._timerId)
            this.createTimer();

        this._fields[coordinates.x][coordinates.y].onLeftClick(coordinates.x, coordinates.y);
        this._uncoveredFieldsLeft--;

        //can't click on flagged field
        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Flagged)
            return;

        if (this.isLostCondition(coordinates))
            return;

        //uncover all empty neighbors
        if (this._fields[coordinates.x][coordinates.y].minesNumber === 0)
            this.uncover(coordinates.x, coordinates.y);

        this.checkWinningCondition();
    }

    public onRightButtonClick(mouseX: number, mouseY: number): void {
        const coordinates = this.getFieldCoordinates(mouseX, mouseY);

        if (!coordinates)
            return;

        //first click, start timer
        if (!this._timerId)
            this.createTimer();

        this._fields[coordinates.x][coordinates.y].onRightClick(coordinates.x, coordinates.y);
        
        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Blank)
            return;

        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Flagged) {
            this._flagsNumber--;
            this._flaggedFields.set(`${coordinates.x},${coordinates.y}`, new Point(coordinates.x, coordinates.y));

            if (this._fields[coordinates.x][coordinates.y].hasMine)
                this._uncoveredFieldsLeft--;
        }
        else {
            if (this._flaggedFields.has(`${coordinates.x},${coordinates.y}`)) {
                this._flaggedFields.delete(`${coordinates.x},${coordinates.y}`);
                this._flagsNumber++;

                if (this._fields[coordinates.x][coordinates.y].hasMine)
                    this._uncoveredFieldsLeft++;
            }
        }

        this.checkWinningCondition();
    }

    private getFieldCoordinates(mouseX: number, mouseY: number): Point | null {
        const x = Math.floor((mouseX - this.marginLeft) / Field.fieldSize);
        const y = Math.floor((mouseY - Field.marginTop) / Field.fieldSize);

        if (x < 0 || x >= this.xSize)
            return null;

        if (y < 0 || y >= this.ySize)
            return null;

        return new Point(x, y);
    }

    public uncover(x: number, y: number): void {
        const stack: Field[] = [];
        let currentField: Field;

        stack.push(this._fields[x][y]);

        while(stack.length > 0) {
            currentField = stack.pop();

            this.uncoverField(stack, currentField.position.x - 1, currentField.position.y - 1);
            this.uncoverField(stack, currentField.position.x, currentField.position.y - 1);
            this.uncoverField(stack, currentField.position.x + 1, currentField.position.y - 1);
            this.uncoverField(stack, currentField.position.x - 1, currentField.position.y);
            this.uncoverField(stack, currentField.position.x + 1, currentField.position.y);
            this.uncoverField(stack, currentField.position.x - 1, currentField.position.y + 1);
            this.uncoverField(stack, currentField.position.x, currentField.position.y + 1);
            this.uncoverField(stack, currentField.position.x + 1, currentField.position.y + 1);
        }
    }

    private uncoverField(stack: Field[], x: number, y: number): void {
        if (this.canUncoverField(x, y)) {
            this._fields[x][y].onLeftClick(x, y);
            this._uncoveredFieldsLeft--;

            if (this._fields[x][y].minesNumber === 0)
                stack.push(this._fields[x][y]);
        }
    }

    private canUncoverField(x: number, y: number): boolean {
        if (!MineField.checkField(this._fields, x, y))
            return false;

        return this._fields[x][y].fieldState === FieldState.Covered
            //&& this._mineField.fields[x][y].fieldType === FieldType.Number
            && this._fields[x][y].minesNumber >= 0;
    }

    public static checkField(mineField: Field[][], x: number, y: number): boolean {
        return mineField[x] && mineField[x][y] !== undefined;
    }

    private drawText(text: string,
        size: number,
        position: Point, 
        color: string = 'white',
        bold: boolean = false, 
        align: CanvasTextAlign = 'center'
    ): void {
        this._context.font = `${bold ? 'bold' : ''} ${size}px PixelCode`;
        this._context.fillStyle = color;
        this._context.textAlign = align;
        this._context.fillText(text, position.x + this._marginLeft, position.y + Field.marginTop);
    }

    private createTimer(): void {
        this._timerId = window.setInterval(() => this._time++, 1000);
    }

    private stopTimer(): void {
        window.clearInterval(this._timerId);
        this._timerId = undefined;
    }
}