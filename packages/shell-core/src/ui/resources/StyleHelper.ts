/**@format */

import { ObjectHelper } from "@aitianyu.cn/types";
import { TianyuUIStyleDeclaration } from "../../core/declares/ui/TianyuUIStyle";

export class StyleHelper {
    /**
     * Merge Tianyu Shell UI Styling definiation into a new object
     *
     * @param styles the merged stylings
     * @returns return a new styling definiation
     */
    public static merge(...styles: TianyuUIStyleDeclaration[]): TianyuUIStyleDeclaration {
        const newStyles: TianyuUIStyleDeclaration = {};
        for (const style of styles) {
            for (const styleKey of Object.keys(style)) {
                (newStyles as any)[styleKey] = (style as any)[styleKey];
            }
        }

        return newStyles;
    }

    /**
     * Insert stylings into a target styling definiation
     *
     * @param source the target styling definiation
     * @param styles inserted stylings
     * @returns return target styling
     */
    public static insert(
        source: TianyuUIStyleDeclaration,
        ...styles: TianyuUIStyleDeclaration[]
    ): TianyuUIStyleDeclaration {
        for (const style of styles) {
            for (const styleKey of Object.keys(style)) {
                (source as any)[styleKey] = (style as any)[styleKey];
            }
        }

        return source;
    }

    /**
     * Set Tianyu Shell UI Styling definiation into HTML element
     *
     * @param element HTML element
     * @param style Tianyu Shell UI Styling definiation
     */
    public static set(element: HTMLElement, style: TianyuUIStyleDeclaration): void {
        for (const styleKey of Object.keys(style)) {
            (element.style as any)[styleKey] = (style as any)[styleKey];
        }
    }
}
