/**@format */

import { TianyuShellUIThemeColor } from "shell-core/src/core/declares/ui/UserInterface";

/** Theme Configure Struct */
export interface ITheme {
    /** Theme Name or Id */
    theme: string;
    /** Theme Color */
    color: TianyuShellUIThemeColor;
}

/** Tianyu Shell Z-Index Verification APIs */
export interface IZIndexVerification {
    /**
     * Check the Z-Index for Background Layer
     *
     * @param index zIndex number
     *
     * @returns return true if the index is valid, otherwise false
     */
    background(index: number): boolean;
    /**
     * Check the Z-Index for Major Layer
     *
     * @param index zIndex number
     *
     * @returns return true if the index is valid, otherwise false
     */
    major(index: number): boolean;
    /**
     * Check the Z-Index for Message Layer
     *
     * @param index zIndex number
     *
     * @returns return true if the index is valid, otherwise false
     */
    message(index: number): boolean;
    /**
     * Check the Z-Index for Dialog Layer
     *
     * @param index zIndex number
     *
     * @returns return true if the index is valid, otherwise false
     */
    dialog(index: number): boolean;
}
