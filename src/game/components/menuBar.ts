import { Component } from "../engine/inputs/component";
import { ImageButton } from "../engine/inputs/imageButton";
import { AssetsManager } from "../engine/managers/assetsManager";
import { Asset, Colors } from "../enums";

export class MenuBar extends Component {
    public static readonly height: number = 80;

    private _assetsManager: AssetsManager;
    private _enabled: boolean = true;

    private _newGameBtn!: ImageButton;
    private _statisticsBtn!: ImageButton;
    private _settingsBtn!: ImageButton;

    private _width: number = 1000;
    public onNewGameClick: Function;
    public onShowStatisticsClick: Function;
    public onShowSettingsClick: Function;

    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;

        this._newGameBtn.enabled = value;
        this._statisticsBtn.enabled = value;
        this._settingsBtn.enabled = value;
    }
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;

        this._statisticsBtn.positionX = this.width - 150;
        this._settingsBtn.positionX = this.width - 70;
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

        this._newGameBtn.draw();
        this._statisticsBtn.draw();
        this._settingsBtn.draw();

        this._components.forEach(input => input.draw());
    }

    private createMenu(): void {
        this._newGameBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.NewImgSvg });
        this._newGameBtn.parent = this;
        this._newGameBtn.positionX = 0;
        this._newGameBtn.positionY = 0;
        this._newGameBtn.text = "New game";
        this._newGameBtn.font = "bold 12px sans-serif";
        this._newGameBtn.width = 70;
        this._newGameBtn.height = MenuBar.height;
        this._newGameBtn.roundedCorners = true;
        this._newGameBtn.onClick = this.newGame.bind(this);

        this._statisticsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.StatisticsImgSvg });
        this._statisticsBtn.parent = this;
        this._statisticsBtn.positionX = this.width - 190;
        this._statisticsBtn.positionY = 0;
        this._statisticsBtn.text = "Statistics";
        this._statisticsBtn.font = "bold 12px sans-serif";
        this._statisticsBtn.width = 70;
        this._statisticsBtn.height = MenuBar.height;
        this._statisticsBtn.onClick = this.showStatisticsPopup.bind(this);

        this._settingsBtn = new ImageButton(this._context, this._assetsManager, { asset: Asset.SettingsImgSvg });
        this._settingsBtn.parent = this;
        this._settingsBtn.positionX = this.width - 110;
        this._settingsBtn.positionY = 0;
        this._settingsBtn.text = "Settings";
        this._settingsBtn.font = "bold 12px sans-serif";
        this._settingsBtn.width = 70;
        this._settingsBtn.height = MenuBar.height;
        this._settingsBtn.roundedCorners = true;
        this._settingsBtn.onClick = this.showSettingsPopup.bind(this);

        this._components.push(this._newGameBtn);
        this._components.push(this._statisticsBtn);
        this._components.push(this._settingsBtn);
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