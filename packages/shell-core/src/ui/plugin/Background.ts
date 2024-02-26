/**@format */

import { BackgroundBase } from "./Core";

export class Background {
    /**
     * Set the background color
     * SUPPORT
     * 1. HEX color value RGB&ARGB
     * 2. (var) Calculation color
     * 3. Predefined color name
     *
     * @param color the color string
     */
    public static setColor(color: string): void {
        BackgroundBase().setColor(color);
    }

    /**
     * Get current background color
     *
     * @returns return the color string (color will not be translated, will return the origin color string)
     */
    public static getColor(): string {
        return BackgroundBase().getColor();
    }

    /** Remove current background color and reset to default background color */
    public static removeColor(): void {
        BackgroundBase().removeColor();
    }

    /**
     * Set an html element as background
     *
     * @param html the html element
     */
    public static setElement(html: HTMLElement): void {
        BackgroundBase().setElement(html);
    }

    /** Remove current used background html element */
    public static removeElement(): void {
        BackgroundBase().removeElement();
    }

    /** Clean all background color and html element and reset to default */
    public static clear(): void {
        BackgroundBase().clear();
    }
}
