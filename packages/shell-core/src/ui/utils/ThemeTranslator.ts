/**@format */

import { TianyuShellUIThemeColor } from "../../core/declares/ui/UserInterface";

/**
 * Convert Theme Color Id to Color
 *
 * @param color color id
 * @returns return converted color
 */
export function translateThemeColor(color: number): TianyuShellUIThemeColor {
    return color === 1 ? "light" : "dark";
}

/**
 * Convert Theme Color String to Color Id
 *
 * @param color color string
 * @returns return converted color id
 */
export function translateThemeColorToId(color: string): number {
    return color.toLowerCase() === "light" ? 1 : 0;
}
