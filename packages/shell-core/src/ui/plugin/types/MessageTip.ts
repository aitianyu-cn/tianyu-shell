/**@format */

import { TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import { MessageTipHelper } from "./MessageTipHelper";
import { DEFAULT_MESSAGE_TIP, IMessageTipState } from "../interface/state/MessageState";
import { getStore } from "shell-core/src/core/utils/Store";
import { MessageInterface } from "../interface/MessageInterfaceExpose";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { Missing } from "@aitianyu.cn/tianyu-store";
import * as MessageBundle from "../../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";

export class MessageTip {
    private timer: number;
    private id: string;
    private unsubscribe: Function;

    public constructor(id: string) {
        this.timer = 0;
        this.id = id;
        this.unsubscribe = () => undefined;
    }

    public render(): HTMLElement {
        const element = document.createElement("div");
        element.id = this.id;

        const store = getStore();
        const instanceId = getMessageInstanceId();

        const stateWithMissing = store.selecte(MessageInterface.message.getMessageState(instanceId, this.id));
        const state = !stateWithMissing || stateWithMissing instanceof Missing ? DEFAULT_MESSAGE_TIP : stateWithMissing;

        const linkerWithMissing = store.selecte(MessageInterface.message.getLink(instanceId, state.link));
        const linker = !linkerWithMissing || linkerWithMissing instanceof Missing ? {} : linkerWithMissing;

        // todo: support content internal.
        MessageTipHelper.processBasicStyles(element);
        MessageTipHelper.processBackground(element, state.type);
        MessageTipHelper.processFrontColor(element, state.type);
        MessageTipHelper.processCloseButton(element, state.type, () => {
            this.close();
        });
        MessageTipHelper.processContent(element, state.message);
        MessageTipHelper.processHyperLink(element, state.type, linker?.moreInfo, linker?.troubleShot);

        const styling = document.createElement("style");
        styling.addEventListener("load", () => {
            this.startTimer(state.type, state.timestamp);
            this.unsubscribe = store.subscribe(
                MessageInterface.message.getMessageState(getMessageInstanceId(), this.id),
                this.onSubscribe.bind(this),
            );
        });
        element.appendChild(styling);

        return element;
    }

    private startTimer(type: TianyuShellUIMessageType, timestamp: number): void {
        // todo: support auto-close timer.
        if (MessageTipHelper.isAutoClose(type)) {
            this.timer = window.setTimeout(() => {
                this.onTimeTrigger();
            }, timestamp);
        }
    }

    private onTimeTrigger(): void {
        // todo: on auto-close timer execution.
        // set back to 0;
        this.timer = 0;
        // execute close operation
        this.close();
    }

    private clearTimer(): void {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = 0;
        }
    }

    private close(): void {
        // dispatch close action
        void getStore().dispatch(MessageInterface.message.close(getMessageInstanceId(), this.id));
    }

    private onSubscribe(_oldState: IMessageTipState | undefined, newState: IMessageTipState | undefined): void {
        // to process state is null
        if (!newState) {
            // to unsubscribe state
            this.unsubscribe();
            // to clean timer
            this.clearTimer();
            // close tip
            this.removeTipFromDocument();
            Log.debug(MessageBundle.getText("TIANYU_UI_MESSAGE_CLOSED", this.id));
        }
    }

    private removeTipFromDocument(): void {
        const store = getStore();
        const instanceId = getMessageInstanceId();

        const layerId = store.selecte(MessageInterface.control.getId(instanceId));
        if (layerId instanceof Missing) {
            return;
        }

        const messageLayer = document.getElementById(layerId);
        if (!messageLayer) {
            return;
        }

        const messageTip = document.getElementById(this.id);
        if (!messageTip) {
            return;
        }

        messageLayer.removeChild(messageTip);
    }
}
