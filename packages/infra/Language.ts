/**@format */

import { getCookie } from "./Cookie";

/** The cookie key for language */
export const LANGUAGE_COOKIE_ID = "LANGUAGE";

/**
 * Get language
 * Get language from cookie and if the language is not set in cookie to use default language of navigator
 *
 * @returns return the language formatted string
 */
export function getLanguage() {
    const defaultLanguage = navigator.language.replace("-", "_");
    const languageString = getCookie(LANGUAGE_COOKIE_ID, defaultLanguage);

    return languageString;
}
