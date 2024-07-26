/**@format */

import { CallbackActionT } from "@aitianyu.cn/types";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import {
    TianyuShellUIDialogButtons,
    TianyuShellUIDialogType,
    ITianyuShellUIDialogCallbackValue,
} from "shell-core/src/core/declares/ui/UserInterface";
import * as MessageBundle from "../../resources/i18n/Message";
import { isMobile } from "shell-core/src/core/plugin/Runtime";
import { getStore } from "shell-core/src/core/utils/Store";
import { DialogInterface } from "../interface/DialogInterfaceExpose";
import { getDialogInstanceId } from "../../tools/InstanceHelper";

export class DialogBase {
    private yesButton: HTMLElement | null;
    private noButton: HTMLElement | null;
    private cancelButton: HTMLElement | null;
    private closeButton: HTMLElement | null;
    private inputBox: HTMLInputElement | null;

    private id: string;
    private message: string;
    private mode: TianyuShellUIDialogButtons;
    private type: TianyuShellUIDialogType;

    private callback: CallbackActionT<ITianyuShellUIDialogCallbackValue>;

    public constructor(
        id: string,
        message: string,
        button?: TianyuShellUIDialogButtons,
        type?: TianyuShellUIDialogType,
        close?: boolean,
        callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue>,
    ) {
        this.id = id;
        this.message = message;
        this.mode =
            button === TianyuShellUIDialogButtons.NONE && isMobile()
                ? TianyuShellUIDialogButtons.OK
                : button || TianyuShellUIDialogButtons.OK;
        this.type = type || TianyuShellUIDialogType.INFO;
        this.callback =
            callback ||
            (() => {
                /** */
            });

        this.inputBox = DialogBase._createInputBox(this.mode, this.type);
        this.yesButton = DialogBase._createYesButton(this.mode, this.type);
        this.noButton = DialogBase._createNoButton(this.mode, this.type);
        this.cancelButton = DialogBase._createCancelButton(this.mode, this.type);
        this.closeButton = DialogBase._createCloseButton(this.mode, close);

        this.handleCallbackEvent();
    }

    public render(): HTMLElement {
        const basic = document.createElement("div");
        basic.classList.add(isMobile() ? "tys_dialog_view_container_styling_mb" : "tys_dialog_view_container_styling");

        basic.appendChild(this.processCloseButton());
        basic.appendChild(this.processContent());
        basic.appendChild(this.processSelectionButtons());

        return basic;
    }

    private processCloseButton(): HTMLElement {
        const closeButtonLine = document.createElement("div");

        if (this.closeButton) {
            closeButtonLine.classList.add("tys_common_view_show");
            closeButtonLine.appendChild(this.closeButton);
        } else {
            closeButtonLine.classList.add("tys_common_view_hidden");
        }

        return closeButtonLine;
    }

    private processContent(): HTMLElement {
        const contentLine = document.createElement("div");
        contentLine.classList.add("tys_common_user_no_seletion", "tys_dialog_view_content_line");

        const textLine = document.createElement("div");
        textLine.classList.add("tys_common_user_no_seletion", "tys_dialog_view_fontsize");
        textLine.style.marginBottom = "10px";
        textLine.innerText = this.message;
        contentLine.appendChild(textLine);

        this.inputBox && contentLine.appendChild(this.inputBox);

        return contentLine;
    }

    private processSelectionButtons(): HTMLElement {
        const selectionLine = document.createElement("div");

        this.cancelButton && selectionLine.appendChild(this.cancelButton);
        this.noButton && selectionLine.appendChild(this.noButton);
        this.yesButton && selectionLine.appendChild(this.yesButton);

        const shouldShow = Boolean(this.yesButton || this.noButton || this.cancelButton);
        selectionLine.classList.add(shouldShow ? "tys_common_view_show" : "tys_common_view_hidden");
        selectionLine.classList.add("tys_dialog_view_selectionline_styling");

        return selectionLine;
    }

    private handleCallbackEvent(): void {
        if (this.closeButton) {
            this.closeButton.addEventListener("click", (ev) => {
                ev.stopPropagation();
                this.callbackInternal({ status: "Cancel" });
            });
        }

        if (this.yesButton) {
            this.yesButton.addEventListener("click", (ev) => {
                ev.stopPropagation();
                if (this.inputBox) {
                    if (!this.inputBox.value) {
                        ((window as any).tianyuShell as ITianyuShell).core.ui.dialog.open(
                            MessageBundle.getText(
                                "TIANYU_UI_DIALOG_EMPTY_IMPUT",
                                MessageBundle.getText(
                                    this.mode === TianyuShellUIDialogButtons.OK
                                        ? "TIANYU_UI_DIALOG_BUTTON_OK"
                                        : "TIANYU_UI_DIALOG_BUTTON_YES",
                                ),
                            ),
                            TianyuShellUIDialogButtons.OK,
                            TianyuShellUIDialogType.WARNING,
                        );
                    } else {
                        this.callbackInternal({ status: "Yes", data: this.inputBox.value });
                    }
                } else {
                    this.callbackInternal({ status: "Yes" });
                }
            });
        }

        if (this.noButton) {
            this.noButton.addEventListener("click", (ev) => {
                ev.stopPropagation();
                this.callbackInternal({ status: "No" });
            });
        }

        if (this.cancelButton) {
            this.cancelButton.addEventListener("click", (ev) => {
                ev.stopPropagation();
                this.callbackInternal({ status: "Cancel" });
            });
        }
    }

    private callbackInternal(ev: ITianyuShellUIDialogCallbackValue): void {
        void getStore().dispatch(DialogInterface.close(getDialogInstanceId(), this.id));
        this.callback(ev);
    }

    private static _createInputBox(
        mode: TianyuShellUIDialogButtons,
        type: TianyuShellUIDialogType,
    ): HTMLInputElement | null {
        if (type !== TianyuShellUIDialogType.INPUT && type !== TianyuShellUIDialogType.PASSWORD) {
            return null;
        }

        const input = document.createElement("input");
        input.classList.add("tys_dialog_view_input", "tys_dialog_view_fontsize");
        if (type === TianyuShellUIDialogType.PASSWORD) {
            input.type = "password";
        }

        return input;
    }
    private static _createYesButton(
        mode: TianyuShellUIDialogButtons,
        type: TianyuShellUIDialogType,
    ): HTMLElement | null {
        if (mode === TianyuShellUIDialogButtons.NONE) {
            return null;
        }

        return DialogBase.__createButton(
            MessageBundle.getText(
                mode === TianyuShellUIDialogButtons.OK ? "TIANYU_UI_DIALOG_BUTTON_OK" : "TIANYU_UI_DIALOG_BUTTON_YES",
            ),
        );
    }
    private static _createNoButton(
        mode: TianyuShellUIDialogButtons,
        type: TianyuShellUIDialogType,
    ): HTMLElement | null {
        if (mode !== TianyuShellUIDialogButtons.YES_NO && mode !== TianyuShellUIDialogButtons.YES_NO_CANCEL) {
            return null;
        }

        return DialogBase.__createButton(MessageBundle.getText("TIANYU_UI_DIALOG_BUTTON_NO"));
    }
    private static _createCancelButton(
        mode: TianyuShellUIDialogButtons,
        type: TianyuShellUIDialogType,
    ): HTMLElement | null {
        if (mode !== TianyuShellUIDialogButtons.YES_NO_CANCEL) {
            return null;
        }

        return DialogBase.__createButton(MessageBundle.getText("TIANYU_UI_DIALOG_BUTTON_CANCEL"));
    }
    private static _createCloseButton(mode: TianyuShellUIDialogButtons, close?: boolean): HTMLElement | null {
        // mobile environment should not add close button
        if (isMobile()) {
            return null;
        }
        const hasClose = close || mode === TianyuShellUIDialogButtons.NONE;
        if (!hasClose) {
            return null;
        }

        return DialogBase.__createButton("×", true);
    }

    private static __createButton(text: string, isClose?: boolean): HTMLElement {
        const closeButton = document.createElement("div");
        closeButton.innerText = text;
        closeButton.classList.add(
            isClose ? "tys_view_close_button" : "tys_view_button",
            "tys_dialog_view_button",
            "tys_common_user_no_seletion",
            "tys_dialog_view_fontsize",
        );

        return closeButton;
    }
}
