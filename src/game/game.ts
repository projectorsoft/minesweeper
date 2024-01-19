import { EventBus } from "./engine/events/eventBus";
import { AssetsManager } from "./engine/managers/assetsManager";
import { StorageService } from "./engine/managers/storageService";
import { Point } from "./engine/point";
import { Asset, Event, GameMode, GameState, MouseButtons } from "./enums";
import { FaceIndicator } from "./faceIndicator";
import { Field } from "./field";
import { MenuBar } from "./menuBar";
import { MineField } from "./mineField";
import { ICustomModeOptions, MineFieldBuilder } from "./mineFiledBuilder";
import { CustomBoardSizePopup } from "./popups/customBoardSizePopup";
import { StatisticsPopup } from "./popups/statisticsPopup";
import { Statistics } from "./services/statistics";
import { StatisticsService } from "./services/statisticsService";

export class Game {
    public static readonly minWidth: number = 960;
    public static readonly minHeight: number = 610;

    private _canvas!: HTMLCanvasElement;
    private _context!: CanvasRenderingContext2D;
    private _gameState: GameState = GameState.Started;
    private _gameMode: GameMode = GameMode.Easy;
    private _previousGameMode: GameMode = GameMode.Easy;
    private _customModeOptions: ICustomModeOptions | null;
    private _assetsManager!: AssetsManager;
    private _statisticsService!: StatisticsService;
    private _storageService!: StorageService<Statistics>;

    private _mineField!: MineField;
    private _menuBar!: MenuBar;
    private _statisticsPopup!: StatisticsPopup | null;
    private _customBoardSizePopup!: CustomBoardSizePopup | null;
    private _faceIndicatorImage!: FaceIndicator;

    constructor() {
        this._storageService = new StorageService();
        this._statisticsService = new StatisticsService(this._storageService);
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
                alert(error); //TODO: show more sophisticated/user friendly message
            });
    }

    private initialize(): void {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        this._canvas.oncontextmenu = (e) => e.preventDefault();
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        this.createMenuBar();
        this.createStatusBar();
        this.createMineField();

        this._customBoardSizePopup = new CustomBoardSizePopup(this._context);
        this._statisticsPopup = new StatisticsPopup(this._context, this._statisticsService);
        
        this.animate();
    }

    private animate(): void {
        setTimeout(() => requestAnimationFrame(() => this.animate()), 1000 / 10);
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._menuBar.draw();
        this._mineField.draw();
        this._faceIndicatorImage.draw();

        this._statisticsPopup.draw();
        this._customBoardSizePopup.draw();
    }

    private createMenuBar(): void {
        this._menuBar = new MenuBar(this._context);
        this._menuBar.width = this._canvas.width;
        this._menuBar.onModeChange = (mode: GameMode) => { this.changeMode(mode) };
        this._menuBar.onNewGameClick = () => { this.newGame() };
        this._menuBar.onShowStatisticsClick = () => { this.createStatisticsPopup() };
    }

    private createStatusBar(): void {
        this._faceIndicatorImage = new FaceIndicator(this._context, this._assetsManager, new Point(Game.minWidth / 2 - 20, Field.marginTop - 62));
    }

    private createMineField(customOptions?: ICustomModeOptions): void {
        this._mineField = new MineFieldBuilder(this._context, this._assetsManager, this._statisticsService)
            .setDifficulty(this._gameMode, customOptions)
            .setFiledChangedHandler(this.setGameState.bind(this))
            .Build();
    }

    private createStatisticsPopup(): void {
        this.setComponentsEnabled(false);
        this._statisticsPopup.visible = true;

        this._statisticsPopup.height = 300;
        this._statisticsPopup.title = "Player's statistics";
        this._statisticsPopup.onClose = () => { this._statisticsPopup.visible = false; this.setComponentsEnabled(true); };
    }

    private createCustomBoardSizePopup(): void {
        this.setComponentsEnabled(false);
        this._customBoardSizePopup.visible = true;

        this._customBoardSizePopup.title = "Custom board settings";
        this._customBoardSizePopup.onSave = (options: ICustomModeOptions) => {
            this._customModeOptions = options;
            this.setComponentsEnabled(true); 
            this._customBoardSizePopup.visible = false;
            console.log('custom popup')
            this.newGame();
        };

        this._customBoardSizePopup.onCancel = () => { 
            this._gameMode = this._previousGameMode;
            this._menuBar.changeGameMode(this._previousGameMode);
            this._customBoardSizePopup.visible = false;
            this.setComponentsEnabled(true); 
        };
    }

    private setCanvasSize(width: number, height: number): void {
        this._canvas.width = width;
        this._canvas.height = height;
    }

    private setComponentsEnabled(value: boolean): void {
        this._menuBar.enabled = value;
        this._mineField.enabled = value;
    }

    private setGameState(state: GameState): void {
        this._gameState = state;
        this._faceIndicatorImage.gameState = this._gameState;
    }

    private adjustComponentsWidth(): void {
        this._menuBar.width = Game.getWidth();
        this._faceIndicatorImage.position.x = Game.getWidth() / 2 - 20;
    }

    private adjustCanvasSize(): void {
        if (this._gameMode === GameMode.Custom) {
            const newWidth: number = Field.fieldSize * this._customModeOptions.xSize + 30;
            const newHeight: number = Field.fieldSize * this._customModeOptions.ySize + 125;

            if (this._canvas.width !== newWidth ||
                this._canvas.height !== newHeight)
                this.setCanvasSize(newWidth, newHeight);
        }
        else {
            if (this._previousGameMode === GameMode.Custom)
                this.setCanvasSize(Game.minWidth, Game.minHeight);
        }
    }

    private newGame(): void {
        this.adjustCanvasSize();
        this.adjustComponentsWidth();
        this.setGameState(GameState.Started);
        this.createMineField(this._customModeOptions);
        this._previousGameMode = this._gameMode;
    }

    private changeMode(mode: GameMode): void {
        this._previousGameMode = this._gameMode;
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