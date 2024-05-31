/**@format */

import { TianyuShellUIHyperLink, TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import { IMessage } from "./IMessage";
import { CallbackActionT } from "@aitianyu.cn/types";
import { MessageTipHelper } from "./MessageTipHelper";

export class MessageTip {
    private id: string;
    private type: TianyuShellUIMessageType;
    private code: string;
    private message: string;
    private title: string;
    private detail: string[];
    private timestamp: number;
    private unread: boolean;
    private isTechError: boolean;
    private moreInfo?: TianyuShellUIHyperLink | undefined;
    private troubleShot?: TianyuShellUIHyperLink | undefined;

    private onClose: CallbackActionT<string>;
    private timer: number;
    private isClosed: boolean;

    public constructor(props: IMessage, close: CallbackActionT<string>) {
        this.id = props.id;
        this.type = props.type;
        this.code = props.code;
        this.message = props.message;
        this.title = props.title;
        this.detail = props.detail;
        this.timestamp = props.timestamp;
        this.isTechError = props.isTechError;
        this.moreInfo = props.moreInfo;
        this.troubleShot = props.troubleShot;

        this.onClose = close;

        this.unread = true;
        this.timer = 0;
        this.isClosed = false;

        this._timer();
    }

    public close(): void {
        // todo: support close tip and callback on close
        this._close();
    }

    public render(): HTMLElement {
        const element = document.createElement("div");
        element.id = this.id;

        // todo: support content internal.
        MessageTipHelper.processBasicStyles(element);
        MessageTipHelper.processBackground(element, this.type);
        MessageTipHelper.processFrontColor(element, this.type);
        MessageTipHelper.processCloseButton(element, this.type, this._close.bind(this));
        MessageTipHelper.processContent(element, this.message);
        MessageTipHelper.processHyperLink(element, this.type, this.moreInfo, this.troubleShot);

        return element;
    }

    private _timer(): void {
        // todo: support auto-close timer.
        if (MessageTipHelper.isAutoClose(this.type)) {
            this.timer = window.setTimeout(this._onTimeTrigger.bind(this), this.timestamp);
        }
    }

    private _onTimeTrigger(): void {
        // todo: on auto-close timer execution.
        // set back to 0;
        this.timer = 0;
        // execute close operation
        this._close();
    }

    private _clearTimer(): void {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = 0;
        }
    }

    private _close(): void {
        // todo: internal close method for close event.
        if (this.isClosed) {
            return;
        }

        // to clean timer if the close is not triggered by timer.
        this._clearTimer();
        this.onClose(this.id);
        this.isClosed = true;
    }
}
