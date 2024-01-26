import { FaceIndicator } from "./components/faceIndicator";
import { MenuBar } from "./components/menuBar";
import { Field } from "./components/mineField/field";
import { MineField } from "./components/mineField/mineField";
import { ICustomModeOptions, MineFieldBuilder } from "./components/mineField/mineFiledBuilder";
import { EventBus } from "./engine/events/eventBus";
import { IMouseClickEvent } from "./engine/events/types/IMouseClickEvent";
import { IMouseMoveEvent } from "./engine/events/types/IMouseMoveEvent";
import { AssetsManager } from "./engine/managers/assetsManager";
import { StorageService } from "./engine/managers/storageService";
import { Point } from "./engine/point";
import { Asset, GameMode, GameState, InputEvent, MouseButtons } from "./enums";
import { Helpers } from "./helpers/helpers";
import { TapHelper } from "./helpers/tapHelper";
import { CustomBoardSizePopup } from "./popups/customBoardSizePopup";
import { SettingsPopup } from "./popups/settingsPopup";
import { StatisticsPopup } from "./popups/statisticsPopup";
import { Statistics } from "./services/statistics";
import { StatisticsService } from "./services/statisticsService";

export class Game {
    public static readonly MinWidth: number = 960;
    public static readonly MinHeight: number = 660;

    private _canvas!: HTMLCanvasElement;
    private _context!: CanvasRenderingContext2D;
    private _gameState: GameState = GameState.Started;
    private _gameMode: GameMode = GameMode.Easy;
    private _previousGameMode: GameMode = GameMode.Easy;
    private _customModeOptions: ICustomModeOptions | null;
    private _assetsManager!: AssetsManager;
    private _statisticsService!: StatisticsService;
    private _storageService!: StorageService<Statistics>;
    private _currenPointerPossision: Point = new Point(0, 0);

    private _mineField!: MineField;
    private _menuBar!: MenuBar;
    private _statisticsPopup!: StatisticsPopup;
    private _customBoardSizePopup!: CustomBoardSizePopup;
    private _settingsPopup: SettingsPopup;
    private _faceIndicator!: FaceIndicator;

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
                alert(error); //TODO: show more sophisticated/user friendly message
            });
    }

    private initialize(): void {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        this._storageService = new StorageService();
        this._statisticsService = new StatisticsService(this._storageService);

        this.registerEvents();
        this.createMenuBar();
        this.createStatusBar();
        this.createMineField();
        this.createCustomBoardSizePopup();
        this.createStatisticsPopup();
        this.createSettingsPopup();
        this.adjustComponentsToBoardSize();
        
        this.animate();
    }

    private registerEvents(): void {
        this._canvas.oncontextmenu = (e) => e.preventDefault();

        if (Helpers.hasTouchScreen()) {
            this._canvas.addEventListener('touchstart', (event: TouchEvent) => this.onTouchStart(event));
            this._canvas.addEventListener('touchend', () => this.onTouchEnd());
        }
        else
            this._canvas.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp(event));
            this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
    }

    private animate(): void {
        setTimeout(() => requestAnimationFrame(() => this.animate()), 1000 / 10);
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._menuBar.draw();
        this._mineField.draw();
        this._faceIndicator.draw();

        this._statisticsPopup.draw();
        this._customBoardSizePopup.draw();
        this._settingsPopup.draw();
    }

    private createMenuBar(): void {
        this._menuBar = new MenuBar(this._context, this._assetsManager);
        this._menuBar.width = this._canvas.width;
        this._menuBar.onNewGameClick = () => { this.newGame() };
        this._menuBar.onShowStatisticsClick = () => { this.showStatisticsPopup() };
        this._menuBar.onShowSettingsClick = () => { this.showSettingsPopup() };
    }

    private createStatusBar(): void {
        this._faceIndicator = new FaceIndicator(this._context, this._assetsManager);
        this._faceIndicator.positionX = Game.MinWidth / 2 - 20;
        this._faceIndicator.positionY = Field.MarginTop - 66;
    }

    private createMineField(customOptions?: ICustomModeOptions): void {
        this._mineField = new MineFieldBuilder(this._context, this._assetsManager, this._statisticsService)
            .setDifficulty(this._gameMode, customOptions)
            .setFiledChangedHandler(this.setGameState.bind(this))
            .Build();
    }

    private createCustomBoardSizePopup(): void {
        this._customBoardSizePopup = new CustomBoardSizePopup(this._context);
        this._customBoardSizePopup.title = "Custom board settings";
        this._customBoardSizePopup.width = 340;
        this._customBoardSizePopup.height = 200;
        this._customBoardSizePopup.visible = false;
        this._customBoardSizePopup.enabled = false;
        this._customBoardSizePopup.onSave = (options: ICustomModeOptions) => {
            this._customModeOptions = options;
            this.setComponentsEnabled(true); 
            this._customBoardSizePopup.visible = false;
            this.newGame();
        };

        this._customBoardSizePopup.onCancel = () => { 
            this._gameMode = this._previousGameMode;
            this._settingsPopup.changeGameMode(this._previousGameMode);
            this._customBoardSizePopup.visible = false;
            this.setComponentsEnabled(true); 
        };
    }

    private createStatisticsPopup(): void {
        this._statisticsPopup = new StatisticsPopup(this._context, this._statisticsService);
        this._statisticsPopup.title = "Player's statistics";
        this._statisticsPopup.width = 280;
        this._statisticsPopup.height = 320;
        this._statisticsPopup.roundedCorners = true;
        this._statisticsPopup.visible = false;
        this._statisticsPopup.enabled = false;
        this._statisticsPopup.onClose = () => { 
            this._statisticsPopup.visible = false;
            this.setComponentsEnabled(true);
        };
    }

    private createSettingsPopup(): void {
        this._settingsPopup = new SettingsPopup(this._context, this._statisticsService);
        this._settingsPopup.title = "Settings";
        this._settingsPopup.width = 380;
        this._settingsPopup.height = 420;
        this._settingsPopup.roundedCorners = false;
        this._settingsPopup.visible = false;
        this._settingsPopup.enabled = false;
        this._settingsPopup.onCancel = () => {
            this._settingsPopup.changeGameMode(this._previousGameMode);
            this._settingsPopup.visible = false;
            this.setComponentsEnabled(true);
        };
        this._settingsPopup.onSave = (mode: GameMode) => { 
            this._settingsPopup.visible = false; 
            this.changeMode(mode);

            if (mode === GameMode.Custom)
                this.showCustomBoardSizePopup();
            else {
                this.newGame();
                this.setComponentsEnabled(true);
            }
        };
    }

    private showStatisticsPopup(): void {
        this.setComponentsEnabled(false);
        this._statisticsPopup.visible = true;
    }

    private showCustomBoardSizePopup(): void {
        this.setComponentsEnabled(false);
        this._customBoardSizePopup.visible = true;
    }

    private showSettingsPopup(): void {
        this.setComponentsEnabled(false);
        this._settingsPopup.visible = true;
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
        this._faceIndicator.gameState = this._gameState;
    }

    private adjustComponentsToBoardSize(): void {
        this._menuBar.positionX = this._mineField.marginLeft;
        this._menuBar.width = this._mineField.width; //Game.getWidth();
        this._faceIndicator.positionX = Game.getWidth() / 2 - 20;
    }

    private adjustCanvasSize(): void {
        if (this._gameMode === GameMode.Custom) {
            const newWidth: number = Field.FieldSize * this._customModeOptions.xSize + 30;
            const newHeight: number = Field.FieldSize * this._customModeOptions.ySize + 175;

            if (this._canvas.width !== newWidth ||
                this._canvas.height !== newHeight)
                this.setCanvasSize(newWidth, newHeight);
        }
        else {
            if (this._previousGameMode === GameMode.Custom)
                this.setCanvasSize(Game.MinWidth, Game.MinHeight);
        }
    }

    private newGame(): void {
        this.adjustCanvasSize();
        this.setGameState(GameState.Started);
        this.createMineField(this._customModeOptions);
        this.adjustComponentsToBoardSize();
        this._previousGameMode = this._gameMode;
    }

    private changeMode(mode: GameMode): void {
        this._previousGameMode = this._gameMode;
        this._gameMode = mode;

        if (mode === GameMode.Custom) {
            this.showCustomBoardSizePopup();
        }
    }

    private onMouseUp(event: MouseEvent): void {
        this.setCanvasCoordinates(event);

        if (this._gameState === GameState.Started) {
            if (event.button === MouseButtons.Left)
                this._mineField.onLeftButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
            else
            if (event.button === MouseButtons.Right)
                this._mineField.onRightButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
        }

        EventBus.getInstance().emit<IMouseClickEvent>(InputEvent.OnClick, {
            x: this._currenPointerPossision.x, 
            y: this._currenPointerPossision.y,
            button: event.button
        });
    }

    private onMouseMove(event: MouseEvent): void {
        this.setCanvasCoordinates(event);

        EventBus.getInstance().emit<IMouseMoveEvent>(InputEvent.OnMouseMove, {
            x: this._currenPointerPossision.x, 
            y: this._currenPointerPossision.y,
        });
    }

    private onTouchStart(event: TouchEvent): void {
        this._currenPointerPossision.x = Math.floor(event.touches[0].pageX - this._canvas.offsetLeft);
        this._currenPointerPossision.y = Math.floor(event.touches[0].pageY - this._canvas.offsetTop);

        TapHelper.onTouchStart();
    }

    private onTouchEnd(): void {
        TapHelper.onTouchEnd();

        if (this._gameState === GameState.Started) {
            if (TapHelper.result === InputEvent.OnTap)
                this._mineField.onLeftButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
            else
                if (TapHelper.result === InputEvent.OnDoubleTap)
                this._mineField.onRightButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
        }

        EventBus.getInstance().emit(InputEvent.OnClick, new Point(this._currenPointerPossision.x, this._currenPointerPossision.y));
    }

    private setCanvasCoordinates(event: MouseEvent): void {
        this._currenPointerPossision.x = Math.floor(event.pageX - this._canvas.offsetLeft);
        this._currenPointerPossision.y = Math.floor(event.pageY - this._canvas.offsetTop);
    }

    private addAssets(): void {
        this._assetsManager.addFontAsset(Asset.PixelCodeFont, `${AssetsManager.Path}assets/fonts/pixelCode.woff`);
        this._assetsManager.addImageAsset(Asset.SpritesImg, `${AssetsManager.Path}assets/images/sprites.png`);
        this._assetsManager.addImageAsset(Asset.NewImgSvg, `${AssetsManager.Path}assets/images/new.svg`);
        this._assetsManager.addImageAsset(Asset.StatisticsImgSvg, `${AssetsManager.Path}assets/images/statistics.svg`);
        this._assetsManager.addImageAsset(Asset.SettingsImgSvg, `${AssetsManager.Path}assets/images/settings.svg`);
        this._assetsManager.addImageAsset(Asset.SmileImgSvg, `${AssetsManager.Path}assets/images/smile.svg`);
        this._assetsManager.addImageAsset(Asset.SadImgSvg, `${AssetsManager.Path}assets/images/sad.svg`);
    }

    public static getWidth(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).width;
    }

    public static getHeight(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).height;
    }
}