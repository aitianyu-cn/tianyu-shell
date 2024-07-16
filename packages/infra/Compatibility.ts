/**@format */

const THEME_CONFIG = require("./configs/themes.json");
const LANGUAGE_CONFIG = require("./configs/language.json");

/**
 * Get Tianyu Shell UI Theme Compatibility List
 *
 * @returns return a theme list contains themes are supported
 */
export function themeList(): string[] {
    return THEME_CONFIG.theme || /* istanbul ignore next */ [];
}

/**
 * Get Tianyu Shell Language Compatibility List
 *
 * @returns return language support list and pending list
 */
export function languageDef(): { support: string[]; pending: string[]; [key: string]: string[] } {
    return {
        support: LANGUAGE_CONFIG.support || /* istanbul ignore next */ [],
        pending: LANGUAGE_CONFIG.pending || /* istanbul ignore next */ [],
    };
}
