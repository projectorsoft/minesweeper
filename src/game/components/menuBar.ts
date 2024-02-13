import { Component } from "../engine/inputs/component";
import { ImageButton } from "../engine/inputs/imageButton";
import { AssetsManager } from "../engine/managers/assetsManager";
import { Asset, Colors, ComponentAlign, GameState } from "../enums";

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

        const pauseBtn = (this.getComponent('pauseBtn') as ImageButton);
        pauseBtn.enabled = value === GameState.Started ? true : false;
        pauseBtn.checked = false;
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
        this._context.rect(this.positionX, 0, this.width, MenuBar.Height);
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
        newGameBtn.positionX = 0;
        newGameBtn.positionY = 0;
        newGameBtn.text = "New game";
        newGameBtn.font = "bold 12px sans-serif";
        newGameBtn.width = 70;
        newGameBtn.height = MenuBar.Height;
        newGameBtn.roundedCorners = false;
        newGameBtn.onClick = this.newGame.bind(this);

        const pauseBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.PauseImgSvg });
        pauseBtn.parent = this;
        pauseBtn.componentlAlign = ComponentAlign.End;
        pauseBtn.positionX = 150;
        pauseBtn.positionY = 0;
        pauseBtn.text = "Pause";
        pauseBtn.font = "bold 12px sans-serif";
        pauseBtn.width = 70;
        pauseBtn.height = MenuBar.Height;
        pauseBtn.checkedColor = Colors.Danger;
        pauseBtn.onClick = this.pause.bind(this);

        const statisticsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.StatisticsImgSvg });
        statisticsBtn.parent = this;
        statisticsBtn.componentlAlign = ComponentAlign.End;
        statisticsBtn.positionX = 75;
        statisticsBtn.positionY = 0;
        statisticsBtn.text = "Statistics";
        statisticsBtn.font = "bold 12px sans-serif";
        statisticsBtn.width = 70;
        statisticsBtn.height = MenuBar.Height;
        statisticsBtn.onClick = this.showStatisticsPopup.bind(this);

        const settingsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.SettingsImgSvg });
        settingsBtn.parent = this;
        settingsBtn.componentlAlign = ComponentAlign.End;
        settingsBtn.positionX = 0;
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