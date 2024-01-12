import { Button } from "./button";
import { Point } from "./engine/point";
import { Asset, GameMode, GameState, MouseButtons } from "./enums";
import { Field } from "./field";
import { ImageObject } from "./image";
import { AssetsManager } from "./managers/assetsManager";
import { MineField } from "./mineField";
import { MineFieldBuilder } from "./mineFiledBuilder";

export class Game {
    public static readonly width: number = 960;
    public static readonly height: number = 610;

    private _canvas!: HTMLCanvasElement;
    private _context!: CanvasRenderingContext2D;
    private _animationHandlerId: number;
    private _mineField: MineField;
    private _gameState: GameState;
    private _gameMode: GameMode = GameMode.Easy;
    private _assetsManager!: AssetsManager;

    private _newGameBtn: Button;
    private _easyModeBtn: Button;
    private _mediumModeBtn: Button;
    private _difficultModeBtn: Button;
    private _faceIndicatorImage: ImageObject;

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
        this._canvas.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        this._canvas.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
        
        this._gameState = GameState.Started;
        this.createMineField();
        this.createMenu();
        this.createStatusBar();
        
        this.animate();
    }

    private createMenu(): void {
        this._newGameBtn = new Button(this._context, new Point(this._mineField.marginLeft - 15, 0));
        this._newGameBtn.text = "New game";
        this._newGameBtn.width = 80;
        this._newGameBtn.onClick = this.newGame.bind(this);

        this._easyModeBtn = new Button(this._context, new Point(this._mineField.marginLeft - 15 + 90, 0));
        this._easyModeBtn.text = "Easy";
        this._easyModeBtn.width = 70;
        this._easyModeBtn.checked = true;
        this._easyModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Easy);

        this._mediumModeBtn = new Button(this._context, new Point(this._mineField.marginLeft - 15 + 160, 0));
        this._mediumModeBtn.text = "Medium";
        this._mediumModeBtn.width = 70;
        this._mediumModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Medium);

        this._difficultModeBtn = new Button(this._context, new Point(this._mineField.marginLeft - 15 + 230, 0));
        this._difficultModeBtn.text = "Difficult";
        this._difficultModeBtn.width = 70;
        this._difficultModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Difficult);
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

    private animate(): void {
        this._animationHandlerId = requestAnimationFrame(() => this.animate());
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._mineField.draw();
        this._newGameBtn.draw();
        this._easyModeBtn.draw();
        this._mediumModeBtn.draw();
        this._difficultModeBtn.draw();
        this._faceIndicatorImage.draw();
    }

    private setGameState(state: GameState): void {
        this._gameState = state;
        this._faceIndicatorImage.gameState = this._gameState;
    }

    private newGame(): void {
        this.setGameState(GameState.Started);
        this.createMineField();
    }

    private changeGameMode(mode: GameMode): void {
        this._gameMode = mode;

        switch(mode) {
            case GameMode.Easy:
                this._easyModeBtn.checked = true;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = false;
                break;
            case GameMode.Medium:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = true;
                this._difficultModeBtn.checked = false;
                break;
            case GameMode.Difficult:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = true;
                break;
        }

        //this.newGame();
    }

    private onMouseDown(event: MouseEvent): void {
        const x = Math.floor(event.pageX - this._canvas.offsetLeft);
        const y = Math.floor(event.pageY - this._canvas.offsetTop);
        this._newGameBtn.isClicked(new Point(x, y));
        this._easyModeBtn.isClicked(new Point(x, y));
        this._mediumModeBtn.isClicked(new Point(x, y));
        this._difficultModeBtn.isClicked(new Point(x, y));

        if (this._gameState !== GameState.Started)
            return;

        if (event.button === MouseButtons.Left)
            this._mineField.onLeftButtonClick(x, y);
        else
        if (event.button === MouseButtons.Right)
            this._mineField.onRightButtonClick(x, y);
    }

    private onMouseMove(event: MouseEvent): void {
        const x = Math.floor(event.pageX - this._canvas.offsetLeft);
        const y = Math.floor(event.pageY - this._canvas.offsetTop);

        this._newGameBtn.onMouseMove(new Point(x, y));
        this._easyModeBtn.onMouseMove(new Point(x, y));
        this._mediumModeBtn.onMouseMove(new Point(x, y));
        this._difficultModeBtn.onMouseMove(new Point(x, y));
    }

    private addAssets(): void {
        this._assetsManager.addFontAsset(Asset.PixelCodeFont, `${AssetsManager.Path}assets/fonts/pixelCode.woff`);
        this._assetsManager.addImageAsset(Asset.SpritesImg, `${AssetsManager.Path}assets/images/sprites.png`);
    }
}