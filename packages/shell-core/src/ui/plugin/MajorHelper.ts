/**@format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { MajorBase } from "./Core";

/** Tianyu Shell Core UI Major layer Helper APIs */
export class MajorHelper {
    /**
     * add new CSS styles for Tianyu Shell Major Layer
     *
     * @param classNames the CSS styling names
     */
    public static addClass(...classNames: string[]): void {
        MajorBase().helper.addClass(...classNames);
    }
    /**
     * add new tianyu shell styles for Tianyu Shell Major Layer
     *
     * @param classNames the tianyu shell styling names
     */
    public static addStyle(...styles: (string | TianyuUIStyleDeclaration)[]): void {
        MajorBase().helper.addStyle(...styles);
    }
    /**
     * remove a CSS style from Tianyu Shell Major Layer
     *
     * @param classNames the removed CSS styling name
     */
    public static removeClass(className: string): void {
        MajorBase().helper.removeClass(className);
    }
    /**
     * remove a tianyu shell style from Tianyu Shell Major Layer
     *
     * @param classNames the removed tianyu shell styling name
     */
    public static resetStyle(): void {
        MajorBase().helper.resetStyle();
    }
}
