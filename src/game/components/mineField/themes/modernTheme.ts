import { AssetsManager } from '@/game/engine/managers/assetsManager';
import { Asset, Colors, GameState, Sprite, Theme } from '@/game/enums';
import { MineField } from '../mineField';
import { IThemeParams, ThemeBase } from './themeBase';
import { Minesweeper } from '@/game/minesweeper';
import { Helpers } from '@/game/helpers/helpers';
import { Label } from '@/game/engine/inputs/label';
import { ClockHelper } from '@/game/helpers/clockHelper';

export class ModernTheme extends ThemeBase {
	public constructor(context: CanvasRenderingContext2D, assetsManager: AssetsManager) {
		super(context, assetsManager);
        this._image = assetsManager.getImage(Asset.SpritesImg);
	}

	public draw(params: IThemeParams): void {
		this.drawClocks({
			flagsNumber: params.flagsNumber,
			time: params.time,
			positionX: params.positionX + MineField.Padding,
			positionY: params.positionY + MineField.MarginTop / 2,
			width: params.width - MineField.Padding - 8,
            height: params.height
        });

		this.drawFrame(params);
	}

	protected drawClocks(params: IThemeParams): void {
		const currentWidth = params.width < Minesweeper.MinWidth ? Minesweeper.MinWidth - 50 : params.width;

		Label.drawText(this._context, ClockHelper.formatFlagsNumber(params.flagsNumber), params.positionX - MineField.Padding, params.positionY - 60, {
			size: 42,
			family: 'pixelCode',
			bold: true,
			align: 'left',
			baseline: 'top',
			color: Colors.Red
		});

		const seconds = Helpers.roundTimeToSeconds(params.time);

		Label.drawText(
			this._context,
			Helpers.zeroPad(seconds < 1000 ? seconds : 999, 3),
			currentWidth - params.positionX - 15,
			params.positionY - 60,
			{
				size: 42,
				family: 'pixelCode',
				bold: true,
				align: 'left',
				baseline: 'top',
				color: Colors.Red
			}
		);
	}

    public drawFace(positionX: number, positionY: number, gameState: GameState): void {
		if (gameState === GameState.NotStarted || gameState === GameState.Started) {
            this._context.clearRect(positionX, positionY + 5, this._displaySize, this._displaySize)
            return;
        }

		let imageIndex = null;

        if (gameState === GameState.Won)
            imageIndex = Sprite.Win;
        else
        if (gameState === GameState.Lost)
            imageIndex = Sprite.Lost;

        this._context.drawImage(this._image, 
            imageIndex * this._spriteSize,
            Theme.Modern * this._spriteSize, 
            this._spriteSize, 
            this._spriteSize,
            positionX, 
            positionY + 5,
            this._displaySize, 
            this._displaySize
        );
    }

	private drawFrame(params: IThemeParams): void {
		this._context.save();
		this._context.beginPath();
		this._context.globalAlpha = 0.3;
		this._context.fillStyle = Colors.White;
		this._context.roundRect(params.positionX, params.positionY, params.width, params.height, [40]);
		this._context.strokeStyle = Colors.Black;
		this._context.stroke();
		this._context.fill();
		this._context.closePath();
		this._context.restore();
	}
}
