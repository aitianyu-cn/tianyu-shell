/** @format */

import { formatUserThemeId } from "../../tools/UserStylingHelper";

export function removeUserTheme(themeId: string): boolean {
    const id = formatUserThemeId(themeId);
    const element = document.getElementById(id);
    if (element) {
        document.head.removeChild(element);
        return true;
    }

    return false;
}

export function containsUserTheme(themeId: string): boolean {
    return !!getUserThemeElement(themeId);
}

export function getUserThemeElement(themeId: string): HTMLLinkElement | null {
    const id = formatUserThemeId(themeId);
    const element = document.getElementById(id) as HTMLLinkElement;
    return element;
}

export function addUserTheme(themeId: string, url: string, oldElement?: HTMLElement): void {
    const id = formatUserThemeId(themeId);
    const newCustomThemeElement = document.createElement("link");
    newCustomThemeElement.href = url;
    newCustomThemeElement.rel = "stylesheet";
    newCustomThemeElement.type = "text/css";
    newCustomThemeElement.id = id;
    if (oldElement) {
        document.head.replaceChild(newCustomThemeElement, oldElement);
    } else {
        document.head.appendChild(newCustomThemeElement);
    }
}
