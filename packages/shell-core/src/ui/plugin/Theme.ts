/**@format */

import { ITheme } from "../common/Interface";
import { ThemeBase } from "./Core";

/** Tianyu Shell UI System Theme Center */
export class Theme {
    /**
     * Get system default theme
     *
     * @returns return default theme
     */
    public static getDefault(): ITheme | null {
        if (!ThemeBase().default.valid) {
            return null;
        }

        return {
            theme: ThemeBase().default.theme,
            color: ThemeBase().default.color,
        };
    }
    /**
     * Get system customized theme
     *
     * @returns return customized theme
     */
    public static getCustome(): ITheme | null {
        if (!ThemeBase().custom.valid) {
            return null;
        }

        return {
            theme: ThemeBase().custom.theme,
            color: ThemeBase().custom.color,
        };
    }
    /**
     * To change system customized theme or add a custom customized theme
     *
     * @param theme theme name of system themes or theme id of custom theme
     * @param save true to save the system customized theme to local storage
     */
    public static change(theme: ITheme, save?: boolean): void {
        ThemeBase().change(theme.theme, theme.color, save);
    }
    /** Reset all themes and set theme to be default */
    public static reset(): void {
        ThemeBase().reset();
    }
}
