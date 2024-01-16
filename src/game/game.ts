import { CustomBoardSizePopup } from "./customBoardSizePopup";
import { EventBus } from "./engine/events/eventBus";
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
    public static readonly minWidth: number = 960;
    public static readonly minHeight: number = 610;

    private _canvas!: HTMLCanvasElement;
    private _context!: CanvasRenderingContext2D;
    private _gameState: GameState = GameState.Started;
    private _gameMode: GameMode = GameMode.Easy;
    private _currentGameMode: GameMode = GameMode.Easy;
    private _assetsManager!: AssetsManager;

    private _mineField!: MineField;
    private _menuBar!: MenuBar;
    private _statisticsPopup!: StatisticsPopup | null;
    private _customBoardSizePopup!: CustomBoardSizePopup | null;
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

        this._canvas.oncontextmenu = (e) => e.preventDefault();
  
        this.createMenuBar();
        this.createStatusBar();
        this.createMineField();

        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
        
        this.animate();
    }

    private animate(): void {
        setTimeout(() => requestAnimationFrame(() => this.animate()), 1000 / 10);
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._menuBar.draw();
        this._mineField.draw();
        this._faceIndicatorImage.draw();

        this._statisticsPopup?.draw();
        this._customBoardSizePopup?.draw();
    }

    private createMenuBar(): void {
        this._menuBar = new MenuBar(this._context);
        this._menuBar.width = this._canvas.width;
        this._menuBar.onModeChange = (mode: GameMode) => { this.changeMode(mode) };
        this._menuBar.onNewGameClick = this.newGame.bind(this);
        this._menuBar.onShowStatisticsClick = this.createStatisticsPopup.bind(this);
    }

    private createStatusBar(): void {
        this._faceIndicatorImage = new ImageObject(this._context, this._assetsManager, new Point(Game.minWidth / 2 - 20, Field.marginTop - 62));
    }

    private createMineField(customOptions?: {xSize: number, ySize: number, mines: number}): void {
        this._mineField = new MineFieldBuilder(this._context, this._assetsManager)
            .setDifficulty(this._gameMode, customOptions)
            .setFiledChangedHandler(this.setGameState.bind(this))
            .Build();
    }

    private createStatisticsPopup(): void {
        this.setEnabled(false);

        this._statisticsPopup = new StatisticsPopup(this._context);
        this._statisticsPopup.title = "Player's statistics";
        this._statisticsPopup.onClose = () => { this._statisticsPopup = null; this.setEnabled(true); };
    }

    private createCustomBoardSizePopup(): void {
        this.setEnabled(false);

        this._customBoardSizePopup = new CustomBoardSizePopup(this._context);
        this._customBoardSizePopup.title = "Custom board settings";
        this._customBoardSizePopup.onSave = (xSize: number, ySize: number, mines: number) => {
            this.setCanvasSize(Field.fieldSize * xSize + 30, Field.fieldSize * ySize + 125);
            this._customBoardSizePopup = null; 
            this.setEnabled(true); 
            this.newGame({xSize, ySize, mines}); //TODO: interface for options, add private field 
        };

        this._customBoardSizePopup.onCancel = () => { 
            this._gameMode = this._currentGameMode;
            this._menuBar.changeGameMode(this._currentGameMode);
            this._customBoardSizePopup = null; 
            this.setEnabled(true); 
        };
    }

    private setCanvasSize(width: number, height: number): void {
        this._canvas.width = width;
        this._canvas.height = height;
    }

    private setEnabled(value: boolean): void {
        this._menuBar.enabled = value;
        this._mineField.enabled = value;
    }

    private setGameState(state: GameState): void {
        this._gameState = state;
        this._faceIndicatorImage.gameState = this._gameState;
    }

    private adjustComponentsWidth(): void {
        this._menuBar.width = this._canvas.width;
        this._faceIndicatorImage.position.x = Game.getWidth() / 2 - 20;
    }

    private newGame(customOptions?: {xSize: number, ySize: number, mines: number}): void {
        if (this._gameMode !== GameMode.Custom)
            this.setCanvasSize(Game.minWidth, Game.minHeight);

        this.adjustComponentsWidth();
        this.setGameState(GameState.Started);
        this.createMineField(customOptions);
    }

    private changeMode(mode: GameMode): void {
        this._currentGameMode = this._gameMode;
        this._gameMode = mode;

        if (mode === GameMode.Custom) {
            this.createCustomBoardSizePopup();
        }
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

    public static getWidth(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).width;
    }

    public static getHeight(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).height;
    }
}