/**@format */

import { guid } from "@aitianyu.cn/types";
import { Log, isMobile } from "shell-core/index";
import { IWaitingDialogImage, IWaitingDialogOptions } from "../model/widget/Waiting";
import * as MessageBundle from "../i18n/Message";
import {
    handle_text,
    handle_basicContainer,
    handle_waitingIcon,
    createAnimation,
    handle_textAnimation,
    handle_imageAnimation,
    UI_WAITING_DIALOG_ID,
} from "../style/widget/WaitingDialogHandler";
import { GlobalStyling } from "../common/GlobalStyling";

import WAITING_DIALOG_IMG from "../res/waiting.svg";

export class WaitingDialog {
    private waitingText?: string;

    protected waitingImg?: IWaitingDialogImage;
    protected options?: IWaitingDialogOptions;

    private constructor(text?: string, waitingImg?: IWaitingDialogImage, options?: IWaitingDialogOptions) {
        this.waitingText = text;
        this.waitingImg = waitingImg;
        this.options = options;
    }

    public render(): HTMLElement {
        return this.options?.onePlat || !isMobile ? this.renderNor() : this.renderMob();
    }

    private renderMob(): HTMLElement {
        const content = document.createElement("div");
        content.id = UI_WAITING_DIALOG_ID;
        handle_basicContainer(content);

        const header = document.createElement("h4");
        header.id = `${UI_WAITING_DIALOG_ID}_header`;
        handle_text(header);
        header.textContent = this.waitingText ?? MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_TEXT");

        content.appendChild(header);

        return content;
    }

    private renderNor(): HTMLElement {
        const content = document.createElement("div");
        content.id = UI_WAITING_DIALOG_ID;
        handle_basicContainer(content);

        let img;
        if (this.waitingImg?.type === "base64" && this.waitingImg?.data) {
            img = document.createElement("img");
            img.src = this.waitingImg.data;
            img.alt = MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_AI_ALT");
        } else {
            img = document.createElement("div");
            img.innerHTML = this.waitingImg?.data ?? WAITING_DIALOG_IMG;
        }
        img.id = `${UI_WAITING_DIALOG_ID}_img`;
        if (this.options?.styles) {
            img.classList.add(...this.options?.styles);
        } else {
            handle_waitingIcon(img);
            handle_imageAnimation(img);
        }

        const header = document.createElement("h4");
        header.id = `${UI_WAITING_DIALOG_ID}_header`;
        if (this.options?.fontStyles) {
            header.classList.add(...this.options.fontStyles);
        } else {
            handle_text(header);
            handle_textAnimation(header);
        }
        header.textContent = this.waitingText ?? MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_TEXT");

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    public static withDialog(
        fnRunner: () => Promise<any>,
        text?: string,
        img?: IWaitingDialogImage,
        options?: IWaitingDialogOptions,
    ): void {
        const animations = createAnimation();

        const dialogId: string = guid();
        const dialog = new WaitingDialog(text, img, options);
        const content = dialog.render();
        content.id = dialogId;

        document.body.appendChild(content);
        Log.debug("TIANYU_SHELL_UI_WAITING_DIALOG_OPENED", true);

        const runnerPromise = fnRunner();

        const fnFinishWait = () => {
            document.body.removeChild(content);
            GlobalStyling.removeStylingSheet(animations);
            Log.debug("TIANYU_SHELL_UI_WAITING_DIALOG_CLOSED", true);
        };

        runnerPromise.finally(fnFinishWait);
    }
}
