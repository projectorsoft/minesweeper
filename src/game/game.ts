import { FaceIndicator } from "./components/faceIndicator";
import { MenuBar } from "./components/menuBar";
import { MineField } from "./components/mineField/mineField";
import { ICustomModeOptions, MineFieldBuilder } from "./components/mineField/mineFiledBuilder";
import { ThemeFactory } from "./components/mineField/themes/themeFactory";
import { EventBus } from "./engine/events/eventBus";
import { IMouseClickEvent } from "./engine/events/types/IMouseClickEvent";
import { IMouseMoveEvent } from "./engine/events/types/IMouseMoveEvent";
import { AssetsManager } from "./engine/managers/assetsManager";
import { StorageService } from "./engine/managers/storageService";
import { TimersManager } from "./engine/managers/timersManager";
import { Point } from "./engine/point";
import { Asset, GameMode, GameState, InputEvent, MouseButtons, Theme } from "./enums";
import { Helpers } from "./helpers/helpers";
import { TapHelper } from "./helpers/tapHelper";
import { CustomBoardSizePopup } from "./popups/customBoardSizePopup";
import { SettingsPopup } from "./popups/settingsPopup";
import { StatisticsPopup } from "./popups/statisticsPopup";
import { Settings } from "./services/settings";
import { SettingsService } from "./services/settingsService";

export class Game {
    public static readonly TimerName: string = 'MainTimer';
    public static readonly MinWidth: number = 370;
    public static readonly MinHeight: number = 445;
    public static readonly MinBoardXSize: number = 9;
    public static readonly MaxBoardXSize: number = 65;
    public static readonly MinBoardYSize: number = 9;
    public static readonly MaxBoardYSize: number = 50;
    public static readonly MinMinesNumber: number = 27;
    public static readonly MaxMinesNumber: number = 999;
    public static readonly CustomBoardDefaultXSize: number = 14;
    public static readonly CustomBoardDefaultYSize: number = 14;
    public static readonly CustomBoardDefaultMinesNumber: number = 65;

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _assetsManager: AssetsManager;
    private _timersManager: TimersManager;
    private _settingsService: SettingsService;
    private _storageService: StorageService<Settings>;
    private _themeFactory: ThemeFactory;

    private _gameState: GameState = GameState.NotStarted;
    private _gameMode: GameMode = GameMode.Easy;
    private _previousGameMode: GameMode = GameMode.Easy;
    private _isPaused: boolean = false;
    private _luckyGuess: boolean = false;
    private _allowQuestionMark: boolean = true;
    private _customModeOptions: ICustomModeOptions | null;
    private _currenPointerPossision: Point = new Point(0, 0);
    private _currentTheme: Theme = Theme.Modern;

    private _mineField!: MineField;
    private _menuBar!: MenuBar;
    private _statisticsPopup!: StatisticsPopup;
    private _customBoardSizePopup!: CustomBoardSizePopup;
    private _settingsPopup: SettingsPopup;
    private _faceIndicator!: FaceIndicator;

    public onGameStateChanged: Function = () => null;
    public onStatisticsCleared: Function = () => null;

    public get isPaused(): boolean {
        return this._isPaused;
    }
    public set isPaused(value: boolean) {
        this._isPaused = value;

        const timer = this._timersManager.get(Game.TimerName);

        if (!timer)
            return;

        if (value) {
            timer.pause();
            this._mineField.enabled = false;
        } else {
            timer.start();
            this._mineField.enabled = true;
        }
    }

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
                console.log(error); //TODO: show more sophisticated/user friendly message
            });
    }

    public startExternalCustomGame(options: ICustomModeOptions): void {
        //ToDo: move to separeter validator
        if (!options)
            return;

        if (options.mines > (options.xSize * options.ySize) / 3)
            return;

        this._customModeOptions = options;
        this._customBoardSizePopup.updateValues(options);
        this._customBoardSizePopup.visible = false;
        this._statisticsPopup.visible = false;
        this._settingsPopup.visible = false;
        this._settingsPopup.changeGameMode(GameMode.Custom);
        this.changeMode(GameMode.Custom);
        this.newGame();
        this.setComponentsEnabled(true);
    }

    public updateTheme(theme: Theme): void {
        this._currentTheme = theme;
        this._mineField.setTheme(theme);
        this._faceIndicator.theme = theme;
    }

    private initialize(): void {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        this._timersManager = new TimersManager();
        this._storageService = new StorageService();
        this._settingsService = new SettingsService(this._storageService);
        this._themeFactory = new ThemeFactory(this._context, this._assetsManager);

        this.registerEvents();
        this.createMenuBar();
        this.createStatusBar();
        this.createCustomBoardSizePopup();
        this.createStatisticsPopup();
        this.createSettingsPopup();
        this.newGame();
        
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
        setTimeout(() => requestAnimationFrame(() => this.animate()), 100);
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
        this._menuBar.gameState = this._gameState;
        this._menuBar.onNewGameClick = () => { this.newGame() };
        this._menuBar.onPauseClick = (paused: boolean) => { this.isPaused = paused };
        this._menuBar.onShowStatisticsClick = () => { this.showStatisticsPopup() };
        this._menuBar.onShowSettingsClick = () => { this.showSettingsPopup() };
    }

    private createStatusBar(): void {
        this._faceIndicator = new FaceIndicator(this._context, this._themeFactory);
        this._faceIndicator.positionX = Game.MinWidth / 2;
        this._faceIndicator.positionY = MineField.MarginTop - 70;
        this._faceIndicator.theme = this._currentTheme;
    }

    private createMineField(): void {
        this._mineField = new MineFieldBuilder(this._context, 
            this._assetsManager, 
            this._settingsService,
            this._timersManager,
            this._themeFactory)
            .setDifficulty(this._gameMode, this._customModeOptions)
            .setLuckyGuess(this._luckyGuess)
            .setAllowQuestionmark(this._allowQuestionMark)
            .setFieldChangedHandler(this.setGameState.bind(this))
            .setTheme(this._currentTheme)
            .Build();
    }

    private createCustomBoardSizePopup(): void {
        this._customBoardSizePopup = new CustomBoardSizePopup(this._context);
        this._customBoardSizePopup.title = "Custom board settings";
        this._customBoardSizePopup.width = 340;
        this._customBoardSizePopup.height = 200;
        this._customBoardSizePopup.visible = false;
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
        this._statisticsPopup = new StatisticsPopup(this._context, this._settingsService);
        this._statisticsPopup.title = "Player's statistics";
        this._statisticsPopup.width = 320;
        this._statisticsPopup.height = 380;
        this._statisticsPopup.roundedCorners = true;
        this._statisticsPopup.visible = false;
        this._statisticsPopup.onClose = () => { 
            this._statisticsPopup.visible = false;
            this.setComponentsEnabled(true);
        };
    }

    private createSettingsPopup(): void {
        this._settingsPopup = new SettingsPopup(this._context, this._settingsService);
        this._settingsPopup.title = "Settings";
        this._settingsPopup.width = 380;
        this._settingsPopup.height = 430;
        this._settingsPopup.roundedCorners = false;
        this._settingsPopup.visible = false;
        this._settingsPopup.onCancel = () => {
            this._settingsPopup.changeGameMode(this._previousGameMode);
            this._settingsPopup.changeLuckyGuess(this._luckyGuess);
            this._settingsPopup.changeAllowQuestionMark(this._allowQuestionMark);
            this._settingsPopup.visible = false;
            this.setComponentsEnabled(true);
        };
        this._settingsPopup.onSave = (mode: GameMode, luckyGuess: boolean, allowQuestionMark: boolean) => { 
            this._settingsPopup.visible = false; 
            this._luckyGuess = luckyGuess;
            this._allowQuestionMark = allowQuestionMark;
            this.changeMode(mode);

            if (mode === GameMode.Custom)
                this.showCustomBoardSizePopup();
            else {
                this.setComponentsEnabled(true);
                this.newGame();
            }
        };
        this._settingsPopup.onStatisticsCleard = () => {
            if (this.onStatisticsCleared)
                this.onStatisticsCleared();
        }
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

    private setComponentsEnabled(value: boolean): void {
        this._menuBar.enabled = value;

        if (!this._isPaused)
            this._mineField.enabled = value;
    }

    private setGameState(state: GameState): void {
        this._gameState = state;
        this._faceIndicator.gameState = this._gameState;
        this._menuBar.gameState = this._gameState;

        if (this.onGameStateChanged)
            this.onGameStateChanged(state);
    }

    private newGame(): void {
        this.setGameState(GameState.NotStarted);
        this.createMineField();
        this.adjustCanvasSize();
        this.adjustComponentsToBoardSize();
        
        this._isPaused = false;
        this._previousGameMode = this._gameMode;
    }

    private adjustCanvasSize(): void {
        let newWidth: number = this._mineField.width;
        let newHeight: number = this._mineField.height + 150;

        if (newWidth < Game.MinWidth)
            newWidth = Game.MinWidth;
        else
            newWidth += 28;

        if (newHeight < Game.MinHeight)
            newHeight = Game.MinHeight;

        if (this._gameMode === GameMode.Custom) {
            if (this._canvas.width !== newWidth ||
                this._canvas.height !== newHeight)
                this.setCanvasSize(newWidth, newHeight);
        }
        else {
            if (this._gameMode !== this._previousGameMode)
                this.setCanvasSize(newWidth, newHeight);
        }
    }

    private adjustComponentsToBoardSize(): void {
        this._mineField.positionX = (this._canvas.width - this._mineField.width) / 2;
        this._mineField.positionY = 140;
        this._menuBar.width = this._canvas.width;
        this._menuBar.positionX = (this._canvas.width - this._menuBar.width) / 2;
        this._faceIndicator.positionX = this._canvas.width / 2 - 15;
        this._faceIndicator.positionY = 85;
        this._faceIndicator.theme = this._currentTheme;
        this._statisticsPopup.reposition();
        this._settingsPopup.reposition();
        this._customBoardSizePopup.reposition();
    }

    private setCanvasSize(width: number, height: number): void {
        this._canvas.width = width;
        this._canvas.height = height;
    }

    private changeMode(mode: GameMode): void {
        this._previousGameMode = this._gameMode;
        this._gameMode = mode;
    }

    private onMouseUp(event: MouseEvent): void {
        this.setCanvasCoordinates(event);

        if (this._gameState === GameState.NotStarted || this._gameState === GameState.Started) {
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
        event.preventDefault();
        this._currenPointerPossision.x = Math.floor(event.touches[0].pageX - this._canvas.offsetLeft);
        this._currenPointerPossision.y = Math.floor(event.touches[0].pageY - this._canvas.offsetTop);

        TapHelper.onTouchStart();
    }

    private onTouchEnd(): void {
        TapHelper.onTouchEnd();

        if (this._gameState === GameState.NotStarted || this._gameState === GameState.Started) {
            if (TapHelper.result === InputEvent.OnTap)
                this._mineField.onLeftButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
            else
                if (TapHelper.result === InputEvent.OnDoubleTap)
                this._mineField.onRightButtonClick(this._currenPointerPossision.x, this._currenPointerPossision.y);
        }

        EventBus.getInstance().emit(InputEvent.OnTap, new Point(this._currenPointerPossision.x, this._currenPointerPossision.y));
    }

    private setCanvasCoordinates(event: MouseEvent): void {
        this._currenPointerPossision.x = Math.floor(event.pageX - this._canvas.offsetLeft);
        this._currenPointerPossision.y = Math.floor(event.pageY - this._canvas.offsetTop);
    }

    private addAssets(): void {
        this._assetsManager.addFontAsset(Asset.PixelCodeFont, '/fonts/pixelCode.woff');
        this._assetsManager.addImageAsset(Asset.SpritesImg, '/images/sprites.png');
        this._assetsManager.addImageAsset(Asset.NewImgSvg, '/images/new.svg');
        this._assetsManager.addImageAsset(Asset.PauseImgSvg, '/images/pause.svg');
        this._assetsManager.addImageAsset(Asset.StatisticsImgSvg, '/images/statistics.svg');
        this._assetsManager.addImageAsset(Asset.SettingsImgSvg, '/images/settings.svg');
    }

    public static getWidth(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).width;
    }

    public static getHeight(): number {
        return (document.getElementById('canvas') as HTMLCanvasElement).height;
    }
}