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
    public static getDefault(): ITheme {
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
        const theme = ThemeBase().custom?.theme;
        const color = ThemeBase().custom?.color;
        return theme && color
            ? {
                  theme,
                  color,
              }
            : null;
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
