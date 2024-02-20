import { Component } from "@/game/engine/inputs/component";
import { TimersManager } from "@/game/engine/managers/timersManager";
import { Label } from "../../engine/inputs/label";
import { AssetsManager } from "../../engine/managers/assetsManager";
import { Point } from "../../engine/point";
import { Colors, FieldState, FieldType, GameMode, GameState, Theme } from "../../enums";
import { Minesweeper } from "../../minesweeper";
import { Helpers } from "../../helpers/helpers";
import { StatisticsRecord } from "../../services/settings";
import { SettingsService } from "../../services/settingsService";
import { Field } from "./field";
import { ModernTheme } from "./themes/modernTheme";
import { ClassicTheme } from "./themes/classicTheme";
import { ThemeBase } from "./themes/themeBase";
import { ThemeFactory } from "./themes/themeFactory";

export class MineField extends Component {
    public static readonly Padding: number = 14;
    public static readonly MarginTop: number = 20;

    private _assetsManager: AssetsManager;
    private _timersManager: TimersManager;
    private _settingsService: SettingsService;
    private _themeFactory: ThemeFactory;
    private _fields: Field[][];
    private _xSize: number;
    private _ySize: number;
    private _luckyGuess: boolean = false;
    private _allowQuestionmark: boolean = true;
    private _mines: Map<string, Point> = new Map<string, Point>();
    private _flaggedFields: Map<string, Point> = new Map<string, Point>();
    private _flagsNumber: number = 0;
    private _minesNumber: number;
    private _mode: GameMode;
    private _uncoveredFieldsLeft: number;
    private _statisticsRecord: StatisticsRecord;
    private _theme: ThemeBase;

    public onFieldChanged: Function = (state: GameState) => null;

    public get xSize(): number {
        return this._xSize;
    }
    public get ySize(): number {
        return this._ySize;
    }
    public get width(): number {
        return Field.FieldSize * this.xSize + 2 * MineField.Padding;
    }
    public get height(): number {
        return Field.FieldSize * this.ySize + MineField.MarginTop;
    }

    public constructor(context: CanvasRenderingContext2D,
                        assetsManager: AssetsManager,
                        settingsService: SettingsService,
                        timersManager: TimersManager,
                        themeFactory: ThemeFactory,
                        xSize: number, 
                        ySize: number,
                        minesNumber: number,
                        mode: GameMode,
                        luckyGuess: boolean,
                        allowQuestionmark: boolean) {
        super(context);

        this._assetsManager = assetsManager;
        this._settingsService = settingsService;
        this._timersManager = timersManager;
        this._themeFactory = themeFactory;

        this._theme = new ModernTheme(context, assetsManager);

        this._xSize = xSize;
        this._ySize = ySize;
        this._minesNumber = minesNumber;
        this._mode = mode;
        this._luckyGuess = luckyGuess;
        this._allowQuestionmark = allowQuestionmark;
        this._flagsNumber = minesNumber;
        this._uncoveredFieldsLeft = this._xSize * this._ySize - minesNumber;
        this._statisticsRecord = new StatisticsRecord();
        this._statisticsRecord.time = 0;

        //delete timer if already exists
        this._timersManager.delete(Minesweeper.TimerName);

        this.adjustPosition();
        this.createMineFiled();
        this.onFieldChanged = () => null;
    }

    public setTheme(theme: Theme): void {
        this._theme = this._themeFactory.Create(theme);

        for (let x = 0; x < this._xSize; x++) {
            for (let y = 0; y < this._ySize; y++) {
                this._fields[x][y].theme = theme;
            }
        }
    }

    private createMineFiled(): void {
        this._fields = [];

        for (let x = 0; x < this._xSize; x++) {
            this._fields[x] = [];
            for (let y = 0; y < this._ySize; y++) {
                this._fields[x][y] = new Field(this._context, this._assetsManager, new Point(x, y));
                this._fields[x][y].parent = this;
                this._fields[x][y].theme = Theme.Modern;
                this._fields[x][y].positionX = this.positionX + x * Field.FieldSize + MineField.Padding;
                this._fields[x][y].positionY = this.positionY + y * Field.FieldSize + MineField.MarginTop;
                this.addComponent(`${x}_${y}`, this._fields[x][y]);
            }
        }
    }

    private generateMines(mouseCoordinates: Point): void {
        let x: number, y: number;

        let siblings: Point[] = [];

        if (this._luckyGuess)
            siblings = this.getAllNeighbours(mouseCoordinates.x, mouseCoordinates.y);

        for (let i = 0; i < this._minesNumber; i++) {
            x = Helpers.getRndInteger(0, this._xSize - 1);
            y = Helpers.getRndInteger(0, this._ySize - 1);

            let point = new Point(x, y);

            let avoidMouseCoordinates = this._luckyGuess 
                && this.isPointInArray(siblings, x, y);

            while (this._mines.has(`${point.x},${point.y}`) 
                || avoidMouseCoordinates) {
                x = Helpers.getRndInteger(0, this._xSize - 1);
                y = Helpers.getRndInteger(0, this._ySize - 1);

                point = new Point(x, y);

                avoidMouseCoordinates = this._luckyGuess 
                    && this.isPointInArray(siblings, x, y);
            }

            this._fields[x][y].hasMine = true;
            this.incrementFieldMinesNumber(x, y)
            this._mines.set(`${point.x},${point.y}`, point);
        }
    }

    private adjustPosition(): void {
        const currentWidth: number = Minesweeper.getWidth() > this.width ? Minesweeper.MinWidth : Minesweeper.getWidth();

        this._positionX = (currentWidth - this.width) / 2;
        this._positionY = MineField.MarginTop + MineField.Padding + 98;

        if (this._positionX <= 0) {
            this._positionX = MineField.Padding;
        }
    }

    protected drawInternal(): void {
        this._theme.draw({
            flagsNumber: this._flagsNumber, 
            time: this._statisticsRecord.time,
            positionX: this.positionX, 
            positionY: this.positionY, 
            width: this.width, 
            height: this.height
        });

        this._components.forEach(input => input.draw());
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
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
        //all empty fields have been revealed
        if (this._uncoveredFieldsLeft === 0) {
            this.stopTimer();
            this._mines.forEach(field => {
                this._fields[field.x][field.y].setFlag();
            });
            this._flagsNumber = 0;
            this._settingsService.updateLastGame(this._statisticsRecord);
            this._settingsService.updateModeData(this._mode, this._statisticsRecord);
            this._settingsService.updateScores(GameState.Won);
            this._settingsService.updateBestScores(this._mode, this._statisticsRecord);

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
            this._fields[mine.x][mine.y].onLeftClick(coordinates.x, coordinates.y);
        });

        //reveal flag if mine is not on the field
        this._flaggedFields.forEach(flagged => {
            if (!this._fields[flagged.x][flagged.y].hasMine)
                this._fields[flagged.x][flagged.y].revealFlag();
        });

        this._settingsService.updateLastGame(this._statisticsRecord);
        this._settingsService.updateScores(GameState.Lost);

        if (this.onFieldChanged)
            this.onFieldChanged(GameState.Lost);

        return true;
    }

    public onLeftButtonClick(mouseX: number, mouseY: number): void {
        if (!this._enabled)
            return;

        const coordinates = this.getFieldCoordinates(mouseX, mouseY);

        if (!coordinates)
            return;

        this._statisticsRecord.clicks++;

        //first click, start timer
        if (!this._timersManager.exists(Minesweeper.TimerName)) {
            this.generateMines(coordinates);
            this.onFieldChanged(GameState.Started);
            this.createTimer();
        }

        this._fields[coordinates.x][coordinates.y].onLeftClick(coordinates.x, coordinates.y);

        //can't click on flagged field
        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Flagged)
            return;

        this._uncoveredFieldsLeft--;

        if (this.isLostCondition(coordinates))
            return;

        //uncover all empty neighbors
        if (this._fields[coordinates.x][coordinates.y].minesNumber === 0)
            this.uncover(coordinates.x, coordinates.y);

        this.checkWinningCondition();
    }

    public onRightButtonClick(mouseX: number, mouseY: number): void {
        if (!this._enabled)
            return;
        
        const coordinates = this.getFieldCoordinates(mouseX, mouseY);

        if (!coordinates)
            return;

        //first click
        if (!this._timersManager.exists(Minesweeper.TimerName)) {
            //must be left click firs
            if (this._luckyGuess)
                return;

            this.generateMines(coordinates);
            this.onFieldChanged(GameState.Started);
            this.createTimer();
        }

        this._statisticsRecord.clicks++;

        this._fields[coordinates.x][coordinates.y].onRightClick(coordinates.x, coordinates.y, this._allowQuestionmark);
        
        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Blank) {
            if (!this._allowQuestionmark 
                && this._flaggedFields.has(`${coordinates.x},${coordinates.y}`)) {
                this._flaggedFields.delete(`${coordinates.x},${coordinates.y}`);
                this._flagsNumber++;
            }

            return;
        }

        if (this._fields[coordinates.x][coordinates.y].fieldType === FieldType.Flagged) {
            this._flagsNumber--;
            this._flaggedFields.set(`${coordinates.x},${coordinates.y}`, new Point(coordinates.x, coordinates.y));
        }
        else {
            if (this._flaggedFields.has(`${coordinates.x},${coordinates.y}`)) {
                this._flaggedFields.delete(`${coordinates.x},${coordinates.y}`);
                this._flagsNumber++;
            }
        }

        this.checkWinningCondition();
    }

    private getFieldCoordinates(mouseX: number, mouseY: number): Point | null {
        const x = Math.floor((mouseX - this.positionX - MineField.Padding - 1) / Field.FieldSize);
        const y = Math.floor((mouseY - this.positionY - MineField.Padding + 1) / Field.FieldSize);

        if (x < 0 || x >= this.xSize)
            return null;

        if (y < 0 || y >= this.ySize)
            return null;

        return new Point(x, y);
    }

    private uncover(x: number, y: number): void {
        const stack: Field[] = [];
        let currentField: Field | undefined;

        stack.push(this._fields[x][y]);

        while(stack.length > 0) {
            currentField = stack.pop();

            if (!currentField)
                break;

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

        if (this._fields[x][y].fieldType === FieldType.Flagged)
            return false;

        return this._fields[x][y].fieldState === FieldState.Covered
            && this._fields[x][y].minesNumber >= 0;
    }

    public static checkField(mineField: Field[][], x: number, y: number): boolean {
        return mineField[x] && mineField[x][y] !== undefined;
    }

    private isPointInArray(neighbours: Point[], x: number, y: number): boolean {
        for (let i=0; i < neighbours.length; i++) {
            if (neighbours[i].x === x && neighbours[i].y === y)
                return true;
        }

        return false;
    }

    private getAllNeighbours(x: number, y: number): Point[] {
        const positions: Point[] = [];

        positions.push(new Point(x, y));

        if (MineField.checkField(this._fields, x - 1, y - 1))
            positions.push(new Point(x - 1, y - 1));

        if (MineField.checkField(this._fields, x, y - 1))
            positions.push(new Point(x, y - 1));

        if (MineField.checkField(this._fields, x + 1, y - 1))
            positions.push(new Point(x + 1, y - 1));

        if (MineField.checkField(this._fields, x - 1, y))
            positions.push(new Point(x - 1, y));

        if (MineField.checkField(this._fields, x + 1, y))
            positions.push(new Point(x + 1, y));

        if (MineField.checkField(this._fields, x - 1, y + 1))
            positions.push(new Point(x - 1, y + 1));

        if (MineField.checkField(this._fields, x, y + 1))
            positions.push(new Point(x, y + 1));

        if (MineField.checkField(this._fields, x + 1, y + 1))
            positions.push(new Point(x + 1, y + 1));

        return positions;
    }

    private createTimer(): void {
        this._timersManager.addInterval(Minesweeper.TimerName, () => {
            this._statisticsRecord.time += 10;
        }, 10);
    }

    private stopTimer(): void {
        this._timersManager.delete(Minesweeper.TimerName);
    }
}