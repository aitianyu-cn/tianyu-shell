/**@format */

import { MapOfString } from "@aitianyu.cn/types";
import { IGlobalStyleSheetIndex } from "shell-core/src/core/declares/ui/TianyuUIStyle";

/**
 * Tianyu Shell UI Global Styling helper
 */
export class GlobalStyling {
    /**
     * Get HTML global styling element
     *
     * @returns return the element and to create a new styling element if not exist
     */
    public static getStyleElement(): HTMLStyleElement {
        let style = document.head.getElementsByTagName("style")[0] as HTMLStyleElement;
        if (!style) {
            style = document.createElement("style");
            document.head.appendChild(style);
        }

        return style;
    }

    /**
     * Insert a styling sheet item into global styling.
     *
     * @param stylings the stylings map
     * @returns return a sheet index map for all added stylings
     */
    public static insertStylingSheet(stylings: MapOfString): IGlobalStyleSheetIndex {
        const indexMap: IGlobalStyleSheetIndex = {};
        const styleElement = GlobalStyling.getStyleElement();
        for (const stylingKey of Object.keys(stylings)) {
            const index = styleElement.sheet?.insertRule(stylings[stylingKey]);
            indexMap[stylingKey] = index;
        }
        return indexMap;
    }

    /**
     * To remove all styling sheet items which are provided in the styling index map
     *
     * @param indexMap the styling index map
     */
    public static removeStylingSheet(indexMap: IGlobalStyleSheetIndex): void {
        const styleElement = GlobalStyling.getStyleElement();
        for (const styling of Object.keys(indexMap)) {
            const index = indexMap[styling];
            index && styleElement.sheet?.deleteRule(index);
        }
    }
}
