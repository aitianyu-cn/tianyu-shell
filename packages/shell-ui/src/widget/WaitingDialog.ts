/**@format */

import { guid } from "@aitianyu.cn/types";
import { Log, isMobile } from "shell-core/index";
import { IWaitingDialogProps } from "../model/widget/WaitingDialog";
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
import { Component } from "../TianyuComponent";
import { Utils } from "shell-core/index";

import WAITING_DIALOG_IMG from "../res/waiting.svg";

export class WaitingDialog extends Component<IWaitingDialogProps> {
    private constructor(props: IWaitingDialogProps) {
        super(props);
    }

    public render(): HTMLElement {
        return this.props.onePlat || !isMobile ? this.renderNor() : this.renderMob();
    }

    private renderMob(): HTMLElement {
        const content = document.createElement("div");
        content.id = UI_WAITING_DIALOG_ID;
        handle_basicContainer(content);

        const header = document.createElement("h4");
        header.id = `${UI_WAITING_DIALOG_ID}_header`;
        handle_text(header);
        header.textContent = this.props.text ?? MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_TEXT");

        content.appendChild(header);

        return content;
    }

    private renderNor(): HTMLElement {
        const content = document.createElement("div");
        content.id = UI_WAITING_DIALOG_ID;
        handle_basicContainer(content);

        let img;
        if (this.props.image?.type === "base64" && this.props.image?.data) {
            img = document.createElement("img");
            img.src = this.props.image.data;
            img.alt = MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_AI_ALT");
        } else {
            img = document.createElement("div");
            img.innerHTML = this.props.image?.data ?? WAITING_DIALOG_IMG;
        }
        img.id = `${UI_WAITING_DIALOG_ID}_img`;
        if (this.props?.styles) {
            img.classList.add(...this.props.styles);
        } else {
            handle_waitingIcon(img);
            handle_imageAnimation(img);
        }

        const header = document.createElement("h4");
        header.id = `${UI_WAITING_DIALOG_ID}_header`;
        if (this.props?.fontStyles) {
            header.classList.add(...this.props.fontStyles);
        } else {
            handle_text(header);
            handle_textAnimation(header);
        }
        header.textContent = this.props.text ?? MessageBundle.getText("TIANYU_SHELL_UI_WAITING_DIALOG_TEXT");

        content.appendChild(img);
        content.appendChild(header);

        return content;
    }

    public static withDialog(fnRunner: () => Promise<any>, props: IWaitingDialogProps): void {
        const animations = createAnimation();

        const dialogId: string = guid();
        const dialog = new WaitingDialog(props);
        const content = dialog.render();
        content.id = dialogId;

        document.body.appendChild(content);
        Log.debug("TIANYU_SHELL_UI_WAITING_DIALOG_OPENED", true);

        const runnerPromise = fnRunner();

        const fnFinishWait = () => {
            document.body.removeChild(content);
            Utils.GlobalStyling.removeStylingSheet(animations);
            Log.debug("TIANYU_SHELL_UI_WAITING_DIALOG_CLOSED", true);
        };

        runnerPromise.finally(fnFinishWait);
    }
}
