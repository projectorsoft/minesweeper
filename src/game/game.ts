import { EventBus } from "./engine/eventBus";
import { Point } from "./engine/point";
import { Asset, Event, GameMode, GameState, MouseButtons } from "./enums";
import { Field } from "./field";
import { ImageObject } from "./image";
import { AssetsManager } from "./managers/assetsManager";
import { MenuBar } from "./menuBar";
import { MineField } from "./mineField";
import { MineFieldBuilder } from "./mineFiledBuilder";
import { StatisticsPopup } from "./statisticsPopup";

export class Game {
    public static readonly width: number = 960;
    public static readonly height: number = 610;

    private _canvas!: HTMLCanvasElement;
    private _context!: CanvasRenderingContext2D;
    private _gameState: GameState = GameState.Started;
    private _gameMode: GameMode = GameMode.Easy;
    private _enabled: boolean = true;
    private _assetsManager!: AssetsManager;

    private _mineField!: MineField;
    private _menuBar!: MenuBar;
    private _statisticsPopup!: StatisticsPopup | null;
    private _faceIndicatorImage!: ImageObject;

    constructor() {
        this._assetsManager = new AssetsManager();
        this.addAssets();
        this._assetsManager
            .loadAll()
            .then(() => {
                const pixelCodeFont = this._assetsManager.getFont(Asset.PixelCodeFont);
                (document as any).fonts.add(pixelCodeFont);
                pixelCodeFont.load().then(() => this.initialize());
            })
            .catch((error: Error) => {
                alert(error.message); //TODO: show more sophisticated/user friendly message
            });
    }

    private initialize(): void {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        const size = MineFieldBuilder.getBoardSize(this._gameMode);

        this._canvas.oncontextmenu = (e) => e.preventDefault();
  
        this.createMenuBar();
        this.createStatusBar();
        this.createMineField();
        //this.createStatisticsPopup();

        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
        
        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._menuBar.draw();
        this._mineField.draw();
        this._faceIndicatorImage.draw();

        this._statisticsPopup?.draw();
    }

    private createMenuBar(): void {
        this._menuBar = new MenuBar(this._context);
        this._menuBar.width = this._canvas.width;
        this._menuBar.onModeChange = (mode: GameMode) => { this.changeMode(mode) };
        this._menuBar.onNewGameClick = this.newGame.bind(this);
        this._menuBar.onShowStatisticsClick = this.createStatisticsPopup.bind(this);
    }

    private createStatusBar(): void {
        this._faceIndicatorImage = new ImageObject(this._context, this._assetsManager, new Point(Game.width / 2 - 20, Field.marginTop - 62));
    }

    private createMineField(): void {
        this._mineField = new MineFieldBuilder(this._context, this._assetsManager)
            .setDifficulty(this._gameMode)
            .setFiledChangedHandler(this.setGameState.bind(this))
            .Build();
    }

    private createStatisticsPopup(): void {
        this.setEnabled(false);

        this._statisticsPopup = new StatisticsPopup(this._context);
        this._statisticsPopup.title = "Select board size";
        this._statisticsPopup.onCancel = () => { this._statisticsPopup = null; this.setEnabled(true); };
        this._statisticsPopup.onSave = () => { this._statisticsPopup = null; this.setEnabled(true); };
    }

    private setEnabled(value: boolean): void {
        this._enabled = value;

        this._menuBar.enabled = value;
        this._mineField.enabled = value;
    }

    private setGameState(state: GameState): void {
        this._gameState = state;
        this._faceIndicatorImage.gameState = this._gameState;
    }

    private newGame(): void {
        this.setGameState(GameState.Started);
        this.createMineField();
    }

    private changeMode(mode: GameMode): void {
        this._gameMode = mode
    }

    private onMouseDown(event: MouseEvent): void {
        const x = Math.floor(event.pageX - this._canvas.offsetLeft);
        const y = Math.floor(event.pageY - this._canvas.offsetTop);

        if (this._gameState == GameState.Started) {
            if (event.button === MouseButtons.Left)
                this._mineField.onLeftButtonClick(x, y);
            else
            if (event.button === MouseButtons.Right)
                this._mineField.onRightButtonClick(x, y);
        }

        EventBus.getInstance().emit(Event.OnClick, new Point(x, y));
    }

    private onMouseMove(event: MouseEvent): void {
        const x = Math.floor(event.pageX - this._canvas.offsetLeft);
        const y = Math.floor(event.pageY - this._canvas.offsetTop);

        EventBus.getInstance().emit(Event.OnMouseMove, new Point(x, y));
    }

    private addAssets(): void {
        this._assetsManager.addFontAsset(Asset.PixelCodeFont, `${AssetsManager.Path}assets/fonts/pixelCode.woff`);
        this._assetsManager.addImageAsset(Asset.SpritesImg, `${AssetsManager.Path}assets/images/sprites.png`);
    }
}