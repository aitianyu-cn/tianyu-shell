/**@format */

import { CallbackActionT } from "@aitianyu.cn/types";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import {
    TianyuShellUIDialogButtons,
    TianyuShellUIDialogType,
    ITianyuShellUIDialogCallbackValue,
} from "shell-core/src/core/declares/ui/UserInterface";
import { DialogBase } from "./Core";

export class Dialog {
    /**
     * Open a dialog
     * Support TianyuUI element and string only element.
     * If string only element provided, to use tianyu shell dialog default ui
     *
     * @param element dialog element
     * @param button dialog buttons type (only valid for string only element)
     * @param type dialog view type (only valid for string only element)
     * @param close dialog should add a close button (only valid for string only element)
     * @param callback the selection callback function (only valid for string only element)
     *
     * @returns return the opened dialog id
     */
    public static open(
        element: TianyuUI | string,
        button?: TianyuShellUIDialogButtons,
        type?: TianyuShellUIDialogType,
        close?: boolean,
        callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue>,
    ): string {
        return DialogBase().open(element, button, type, close, callback);
    }

    /**
     * Close a dialog by dialog id
     *
     * @param id the closed dialog id
     */
    public static close(id: string): void {
        DialogBase().close(id);
    }

    /**
     * Get dialog is opened
     *
     * @param id dialog id provides to get the specific dialog is opened or undefined to get whether any dialog is opened
     *
     * @returns return dialog is opened status
     */
    public static isOpen(id?: string): boolean {
        return DialogBase().isOpen(id);
    }
}
