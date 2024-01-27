import { Component } from "../engine/inputs/component";
import { ImageButton } from "../engine/inputs/imageButton";
import { AssetsManager } from "../engine/managers/assetsManager";
import { Asset, Colors, GameState } from "../enums";
import { MineField } from "./mineField/mineField";

export class MenuBar extends Component {
    public static readonly Height: number = 80;

    private _assetsManager: AssetsManager;
    private _gameState: GameState = GameState.Started;
    
    public onNewGameClick: Function = () => null;
    public onShowStatisticsClick: Function = () => null;
    public onShowSettingsClick: Function = () => null;
    public onPauseClick: Function = (paused: boolean) => null;

    public get gameState(): GameState {
        return this._gameState;
    }
    public set gameState(value: GameState) {
        this._gameState = value;

        if (value === GameState.Won || value === GameState.Lost)
            this.getComponent('pauseBtn').enabled = false;
        else
            if (value === GameState.NotStarted) {
                this.getComponent('pauseBtn').enabled = false;
            }
        else {
            this.getComponent('pauseBtn').enabled = true;
            (this.getComponent('pauseBtn') as ImageButton).checked = false;
        }
    }
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;

        if (this.getComponent('newGameBtn') as ImageButton)
            (this.getComponent('newGameBtn') as ImageButton).positionX = -MineField.MinMarginLeft + 1;

        if (this.getComponent('pauseBtn') as ImageButton)
            (this.getComponent('pauseBtn') as ImageButton).positionX = value - 202;

        if (this.getComponent('statisticsBtn') as ImageButton)
            (this.getComponent('statisticsBtn') as ImageButton).positionX = value - 129;

        if (this.getComponent('settingsBtn') as ImageButton)
            (this.getComponent('settingsBtn') as ImageButton).positionX = value - 56;
    }

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
        super(context);

        this._assetsManager = assetsManager;

        this.createMenu();
    }

    protected drawInternal(): void {
        this._context.save();
        this._context.beginPath();
        this._context.globalAlpha = 0.5;
        this._context.fillStyle = Colors.DarkGrey;
        this._context.rect(this.positionX - MineField.MinMarginLeft, 0, this.width + 2 * MineField.MinMarginLeft, MenuBar.Height);
        this._context.fill();
        this._context.closePath();
        this._context.restore();

        this._components.forEach(input => input.draw());
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    private createMenu(): void {
        const newGameBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.NewImgSvg });
        newGameBtn.parent = this;
        newGameBtn.positionX = -MineField.MinMarginLeft;
        newGameBtn.positionY = 0;
        newGameBtn.text = "New game";
        newGameBtn.font = "bold 12px sans-serif";
        newGameBtn.width = 70;
        newGameBtn.height = MenuBar.Height;
        newGameBtn.roundedCorners = false;
        newGameBtn.onClick = this.newGame.bind(this);

        const pauseBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.PauseImgSvg });
        pauseBtn.parent = this;
        pauseBtn.positionX = this.width - 270;
        pauseBtn.positionY = 0;
        pauseBtn.text = "Pause";
        pauseBtn.font = "bold 12px sans-serif";
        pauseBtn.width = 70;
        pauseBtn.height = MenuBar.Height;
        pauseBtn.onClick = this.pause.bind(this);

        const statisticsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.StatisticsImgSvg });
        statisticsBtn.parent = this;
        statisticsBtn.positionX = this.width - 190;
        statisticsBtn.positionY = 0;
        statisticsBtn.text = "Statistics";
        statisticsBtn.font = "bold 12px sans-serif";
        statisticsBtn.width = 70;
        statisticsBtn.height = MenuBar.Height;
        statisticsBtn.onClick = this.showStatisticsPopup.bind(this);

        const settingsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.SettingsImgSvg });
        settingsBtn.parent = this;
        settingsBtn.positionX = this.width - 110;
        settingsBtn.positionY = 0;
        settingsBtn.text = "Settings";
        settingsBtn.font = "bold 12px sans-serif";
        settingsBtn.width = 70;
        settingsBtn.height = MenuBar.Height;
        settingsBtn.roundedCorners = false;
        settingsBtn.onClick = this.showSettingsPopup.bind(this);

        this.addComponent('newGameBtn', newGameBtn);
        this.addComponent('pauseBtn', pauseBtn);
        this.addComponent('statisticsBtn', statisticsBtn);
        this.addComponent('settingsBtn', settingsBtn);
    }

    private newGame(): void {
        if (!this.onNewGameClick)
            return;

        this.onNewGameClick();
    }

    private pause(): void {
        if (this.onPauseClick) {
            const pauseBtn = this.getComponent('pauseBtn') as ImageButton;
            pauseBtn.checked = !pauseBtn.checked;
            this.onPauseClick(pauseBtn.checked);
        }
    }

    private showStatisticsPopup(): void {
        if (this.onShowStatisticsClick)
            this.onShowStatisticsClick();
    }

    private showSettingsPopup(): void {
        if (this.onShowSettingsClick)
            this.onShowSettingsClick();
    }
}