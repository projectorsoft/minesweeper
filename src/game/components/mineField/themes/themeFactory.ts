import { AssetsManager } from "@/game/engine/managers/assetsManager";
import { Theme } from "@/game/enums";
import { ClassicTheme } from "./classicTheme";
import { ModernTheme } from "./modernTheme";
import { ThemeBase } from "./themeBase";

export class ThemeFactory {
    private _context: CanvasRenderingContext2D;
    private _assetsManager: AssetsManager;

    public constructor(context: CanvasRenderingContext2D,
        assetsManager: AssetsManager) {
            this._context = context;
            this._assetsManager = assetsManager;
    }

    public Create(theme: Theme): ThemeBase {
        switch (theme) {
            case Theme.Modern:
                return new ModernTheme(this._context, this._assetsManager);
            case Theme.Classic:
            default:
                return new ClassicTheme(this._context, this._assetsManager);
        }
    }
}