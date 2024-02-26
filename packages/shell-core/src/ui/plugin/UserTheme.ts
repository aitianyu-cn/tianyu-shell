/**@format */

import { ThemeBase } from "./Core";

/** Tianyu Shell UI Custom Theme Center */
export class CustomizedTheme {
    /**
     * Get current using custom themes
     *
     * @returns all using custom themes
     */
    public static get(): string[] {
        return ThemeBase().user.get();
    }
    /**
     * Get whether the theme is using currently
     *
     * @param themeId custom theme id
     *
     * @returns return true if the theme is applied to ui, otherwise false
     */
    public static contains(themeId: string): boolean {
        return ThemeBase().user.contains(themeId);
    }
    /**
     * Remove using custom theme
     *
     * @param themeId the using custom theme id
     */
    public static remove(themeId: string): void {
        ThemeBase().user.remove(themeId);
    }
    /** Reset custom theme status and remove all using custom theme */
    public static reset(): void {
        ThemeBase().user.reset();
    }
}

/** Tianyu Shell UI Customized Theme Manager */
export class CustomizedThemeManager {
    /**
     * Add a new theme into theme list
     *
     * @param themeId — theme id
     * @param style — theme remote link
     */
    public static add(themeId: string, style: string): void {
        ThemeBase().user.manager.add(themeId, style);
    }
    /**
     * Update a exist theme
     * If the theme is using, the UI css will be updated automatically
     *
     * @param themeId — theme id
     * @param style — new theme remote link
     */
    public static update(themeId: string, style: string): void {
        ThemeBase().user.manager.update(themeId, style);
    }
    /**
     * Remove a theme
     * If the theme is using, the UI css will be removed automatically
     *
     * @param themeId — theme id
     */
    public static delete(themeId: string): void {
        ThemeBase().user.manager.delete(themeId);
    }
    /**
     * Get all custom themes
     *
     * @returns — custom theme ids list
     */
    public static getThemes(): string[] {
        return ThemeBase().user.manager.getThemes();
    }
    /**
     * Get a theme URL by theme id
     *
     * @param themeId theme id
     *
     * @returns return theme URL
     */
    public static getUrl(themeId: string): string {
        return ThemeBase().user.manager.getUrl(themeId);
    }
}
