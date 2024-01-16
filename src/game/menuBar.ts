import { Button } from "./engine/inputs/button";
import { Point } from "./engine/point";
import { Colors, GameMode } from "./enums";

export class MenuBar {
    private _context!: CanvasRenderingContext2D;

    private _enabled: boolean = true;
    private _newGameBtn!: Button;
    private _easyModeBtn!: Button;
    private _mediumModeBtn!: Button;
    private _difficultModeBtn!: Button;
    private _customModeBtn!: Button;
    private _statisticsBtn!: Button;

    public width: number = 1000;
    public height: number = 40;
    
    public onModeChange: Function;
    public onNewGameClick: Function;
    public onShowStatisticsClick: Function;

    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;

        this._newGameBtn.enabled = value;
        this._easyModeBtn.enabled = value;
        this._mediumModeBtn.enabled = value;
        this._difficultModeBtn.enabled = value;
        this._customModeBtn.enabled = value;
        this._statisticsBtn.enabled = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;

        this.onModeChange = (mode: GameMode) => null;
        this.onNewGameClick = () => null;
        this.onShowStatisticsClick = () => null;
        this.createMenu();
    }

    public draw(): void {
        this._context.beginPath();
        this._context.fillStyle = Colors.DarkGrey;
        this._context.rect(0, 0, this.width, this.height);
        this._context.fill();
        this._context.closePath();

        this._newGameBtn.draw();
        this._easyModeBtn.draw();
        this._mediumModeBtn.draw();
        this._difficultModeBtn.draw();
        this._customModeBtn.draw();
        this._statisticsBtn.draw();
    }

    private createMenu(): void {
        this._newGameBtn = new Button(this._context, new Point(0, 0));
        this._newGameBtn.text = "New game";
        this._newGameBtn.font = "bold 15px sans-serif";
        this._newGameBtn.width = 80;
        this._newGameBtn.onClick = this.newGame.bind(this);

        this._easyModeBtn = new Button(this._context, new Point(90, 0));
        this._easyModeBtn.text = "Easy";
        this._easyModeBtn.font = "bold 15px sans-serif";
        this._easyModeBtn.width = 70;
        this._easyModeBtn.checked = true;
        this._easyModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Easy);

        this._mediumModeBtn = new Button(this._context, new Point(160, 0));
        this._mediumModeBtn.text = "Medium";
        this._mediumModeBtn.font = "bold 15px sans-serif";
        this._mediumModeBtn.width = 70;
        this._mediumModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Medium);

        this._difficultModeBtn = new Button(this._context, new Point(230, 0));
        this._difficultModeBtn.text = "Difficult";
        this._difficultModeBtn.font = "bold 15px sans-serif";
        this._difficultModeBtn.width = 70;
        this._difficultModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Difficult);

        this._customModeBtn = new Button(this._context, new Point(300, 0));
        this._customModeBtn.text = "Custom";
        this._customModeBtn.font = "bold 15px sans-serif";
        this._customModeBtn.width = 70;
        this._customModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Custom);

        this._statisticsBtn = new Button(this._context, new Point(380, 0));
        this._statisticsBtn.text = "Statistics";
        this._statisticsBtn.font = "bold 15px sans-serif";
        this._statisticsBtn.width = 70;
        this._statisticsBtn.onClick = this.showStatisticsPopup.bind(this);
    }

    private newGame(): void {
        if (!this.onNewGameClick)
            return;

        this.onNewGameClick();
    }

    public changeGameMode(mode: GameMode): void {
        if (!this.onModeChange)
            return;

        switch(mode) {
            case GameMode.Easy:
                this._easyModeBtn.checked = true;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Medium:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = true;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Difficult:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = true;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Custom:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = true;
                break;
        }

        this.onModeChange(mode);
    }

    private showStatisticsPopup(): void {
        if (this.onShowStatisticsClick)
            this.onShowStatisticsClick();
    }
}