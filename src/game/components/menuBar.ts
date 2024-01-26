import { Component } from "../engine/inputs/component";
import { ImageButton } from "../engine/inputs/imageButton";
import { AssetsManager } from "../engine/managers/assetsManager";
import { Asset, Colors } from "../enums";

export class MenuBar extends Component {
    public static readonly height: number = 80;

    private _assetsManager: AssetsManager;

    private _width: number = 1000;
    public onNewGameClick: Function;
    public onShowStatisticsClick: Function;
    public onShowSettingsClick: Function;

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;

        if (this.getComponent('statisticsBtn') as ImageButton)
            (this.getComponent('statisticsBtn') as ImageButton).positionX = this.width - 150;

        if (this.getComponent('settingsBtn') as ImageButton)
            (this.getComponent('settingsBtn') as ImageButton).positionX = this.width - 70;
    }

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
        super(context);

        this._assetsManager = assetsManager;

        this.onNewGameClick = () => null;
        this.onShowStatisticsClick = () => null;
        this.onShowSettingsClick = () => null;
        this.createMenu();
    }

    protected drawInternal(): void {
        this._context.save();
        this._context.beginPath();
        this._context.globalAlpha = 0.5;
        this._context.fillStyle = Colors.DarkGrey;
        this._context.rect(0, 0, this.width, MenuBar.height);
        this._context.fill();
        this._context.closePath();
        this._context.restore();

        this._components.forEach(input => input.draw());
    }

    private createMenu(): void {
        const newGameBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.NewImgSvg });
        newGameBtn.parent = this;
        newGameBtn.positionX = 0;
        newGameBtn.positionY = 0;
        newGameBtn.text = "New game";
        newGameBtn.font = "bold 12px sans-serif";
        newGameBtn.width = 70;
        newGameBtn.height = MenuBar.height;
        newGameBtn.roundedCorners = true;
        newGameBtn.onClick = this.newGame.bind(this);

        const statisticsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.StatisticsImgSvg });
        statisticsBtn.parent = this;
        statisticsBtn.positionX = this.width - 190;
        statisticsBtn.positionY = 0;
        statisticsBtn.text = "Statistics";
        statisticsBtn.font = "bold 12px sans-serif";
        statisticsBtn.width = 70;
        statisticsBtn.height = MenuBar.height;
        statisticsBtn.onClick = this.showStatisticsPopup.bind(this);

        const settingsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.SettingsImgSvg });
        settingsBtn.parent = this;
        settingsBtn.positionX = this.width - 110;
        settingsBtn.positionY = 0;
        settingsBtn.text = "Settings";
        settingsBtn.font = "bold 12px sans-serif";
        settingsBtn.width = 70;
        settingsBtn.height = MenuBar.height;
        settingsBtn.roundedCorners = true;
        settingsBtn.onClick = this.showSettingsPopup.bind(this);

        this.addComponent('newGameBtn', newGameBtn);
        this.addComponent('statisticsBtn', statisticsBtn);
        this.addComponent('settingsBtn', settingsBtn);
    }

    private newGame(): void {
        if (!this.onNewGameClick)
            return;

        this.onNewGameClick();
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