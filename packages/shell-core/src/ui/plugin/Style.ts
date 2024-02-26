/**@format */

import { TianyuUIStyleDeclaration } from "../../core/declares/ui/TianyuUIStyle";
import { StyleBase } from "./Core";

export class Style {
    /**
     * Add a customized styling to cache
     *
     * @param key the styling name
     * @param styling styling object
     * @param path the styling saved path
     *
     * @returns return true if the styling is saved, otherwise false
     */
    public static set(key: string, styling: TianyuUIStyleDeclaration, path?: string): boolean {
        return StyleBase().set(key, styling, path);
    }

    /**
     * Get a customized styling
     *
     * If there are some same name styling during the path, the styling will be auto merged by param "isDepth"
     *
     * @param key styling name
     * @param path styling path
     * @param isDepth a flag to deep search stylings which have the same name and merge them
     *
     * @returns return styling object
     */
    public static get(key: string | string[], path?: string): TianyuUIStyleDeclaration {
        return StyleBase().get(key, path);
    }

    /**
     * Remove a customized styling
     *
     * @param key styling name
     * @param path styling path
     */
    public static remove(key: string, path?: string): void {
        StyleBase().remove(key, path);
    }
}
