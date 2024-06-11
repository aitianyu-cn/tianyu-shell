/**@format */

import { StyleBase } from "./Core";

export class StyleCss {
    /**
     * Add a new styling or update a existing styling to html document
     *
     * @param key the styling key
     * @param link the stylink url
     */
    public static add(key: string, link: string): void {
        StyleBase().css.add(key, link);
    }

    /**
     * Remove a styling from html document
     *
     * @param key the stylink key
     *
     * @returns return true is the styling is removed successful, otherwise false
     */
    public static remove(key: string): void {
        StyleBase().css.remove(key);
    }
}
