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
