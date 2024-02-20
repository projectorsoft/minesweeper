import { AssetsManager } from '@/game/engine/managers/assetsManager';
import { Asset, Colors, GameState, Sprite, Theme } from '@/game/enums';
import { MineField } from '../mineField';
import { IThemeParams, ThemeBase } from './themeBase';
import { Minesweeper } from '@/game/minesweeper';
import { Label } from '@/game/engine/inputs/label';
import { Helpers } from '@/game/helpers/helpers';
import { ClockHelper } from '@/game/helpers/clockHelper';

export class ClassicTheme extends ThemeBase {
	private static readonly _backgroundColor: string = '#BDBDBD';
	private static readonly _frameLightColor: string = '#F5F5F5';
	private static readonly _frameDarkColor: string = '#7B7B7B';

	public constructor(context: CanvasRenderingContext2D, assetsManager: AssetsManager) {
		super(context, assetsManager);
        this._image = assetsManager.getImage(Asset.SpritesImg);

        this._displaySize = 38;
	}

	public draw(params: IThemeParams): void {
		this.drawBackground(params.positionX, params.positionY - 55, params.width + 2, params.height + 62, ClassicTheme._backgroundColor);

		this.drawClocks({
			flagsNumber: params.flagsNumber,
			time: params.time,
			positionX: params.positionX + MineField.Padding,
			positionY: params.positionY + MineField.MarginTop / 2,
			width: params.width - MineField.Padding - 8,
            height: params.height
        });

		//inner counters frame
		this.drawFrame(
			params.positionX + MineField.Padding,
			params.positionY - 42,
			params.width - MineField.Padding - 6,
			45,
			ClassicTheme._frameDarkColor,
			ClassicTheme._frameLightColor
		);

		//outer frame
		this.drawFrame(params.positionX + 3, params.positionY - 55, params.width + 3, params.height + 63, ClassicTheme._frameLightColor, ClassicTheme._frameDarkColor);

		//inner minefield frame
		this.drawFrame(
			params.positionX + MineField.Padding,
			params.positionY + MineField.MarginTop / 2,
			params.width - MineField.Padding - 7,
			params.height - MineField.MarginTop + 7,
			ClassicTheme._frameDarkColor,
			ClassicTheme._frameLightColor
		);
	}

    protected drawClocks(params: IThemeParams): void {
		const currentWidth = params.width < Minesweeper.MinWidth ? Minesweeper.MinWidth - 50 : params.width;

		Label.drawText(this._context, ClockHelper.formatFlagsNumber(params.flagsNumber), params.positionX + 5, params.positionY - 45, {
			size: 30,
			family: 'pixelCode',
			bold: true,
			align: 'left',
			baseline: 'top',
			color: Colors.Red,
			backgroundColor: Colors.Black,
		});

		const seconds = Helpers.roundTimeToSeconds(params.time);

		Label.drawText(
			this._context,
			Helpers.zeroPad(seconds < 1000 ? seconds : 999, 3),
			currentWidth - params.positionX - 15,
			params.positionY - 45,
			{
				size: 30,
				family: 'pixelCode',
				bold: true,
				align: 'left',
				baseline: 'top',
				color: Colors.Red,
				backgroundColor: Colors.Black,
			}
		);
	}

    public drawFace(positionX: number, positionY: number, gameState: GameState): void {
		if (gameState === GameState.NotStarted || gameState === GameState.Started) {
			this._context.fillStyle = ClassicTheme._backgroundColor;
            this._context.fillRect(positionX, positionY + 17, this._displaySize, this._displaySize)
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
            Theme.Classic * this._spriteSize, 
            this._spriteSize, 
            this._spriteSize,
            positionX, 
            positionY + 15,
            this._displaySize, 
            this._displaySize
        );
    }

	private drawFrame(positionX, positionY, width, height, color1: string, color2: string): void {
		this.drawTopBorderLine(positionX - 3, positionY, width, color1);
		this.drawLeftBorderLine(positionX - 2, positionY, height, color1);
		this.drawBottomBorderLine(positionX - 3, positionY + height - 3, width, color2);
		this.drawRightBorderLine(positionX + width - 6, positionY, height, color2);
	}

	private drawBackground(
		positionX: number,
		positionY: number,
		width: number,
		height: number,
		color: Colors | string
	): void {
		this._context.beginPath();
		this._context.fillStyle = color;
		this._context.rect(positionX, positionY, width, height);

		this._context.fill();
		this._context.closePath();
	}

	private drawTopBorderLine(positionX: number, positionY: number, width: number, color: Colors | string): void {
		this._context.beginPath();
		this._context.moveTo(positionX, positionY);
		this._context.lineTo(positionX + width, positionY);
		this._context.lineWidth = 1;
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX, positionY + 1);
		this._context.lineTo(positionX + width - 1, positionY + 1);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX, positionY + 2);
		this._context.lineTo(positionX + width - 2, positionY + 2);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();
	}

	private drawLeftBorderLine(positionX: number, positionY: number, height: number, color: Colors | string): void {
		this._context.beginPath();
		this._context.moveTo(positionX, positionY);
		this._context.lineTo(positionX, positionY + height);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX + 1, positionY);
		this._context.lineTo(positionX + 1, positionY + height - 1);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX + 2, positionY);
		this._context.lineTo(positionX + 2, positionY + height - 2);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();
	}

	private drawBottomBorderLine(positionX: number, positionY: number, width: number, color: Colors | string): void {
		this._context.beginPath();
		this._context.moveTo(positionX + 2, positionY);
		this._context.lineTo(positionX + width, positionY);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX + 1, positionY + 1);
		this._context.lineTo(positionX + width - 1, positionY + 1);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX, positionY + 2);
		this._context.lineTo(positionX + width, positionY + 2);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();
	}

	private drawRightBorderLine(positionX: number, positionY: number, height: number, color: Colors | string): void {
		this._context.beginPath();
		this._context.moveTo(positionX, positionY + 2);
		this._context.lineTo(positionX, positionY + height);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX + 1, positionY + 1);
		this._context.lineTo(positionX + 1, positionY + height);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();

		this._context.beginPath();
		this._context.moveTo(positionX + 2, positionY);
		this._context.lineTo(positionX + 2, positionY + height);
		this._context.strokeStyle = color;
		this._context.stroke();
		this._context.closePath();
	}
}
