/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIMessageHelper,
    ITianyuShellUIVerticalAlignment,
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellCoreUIMessage,
    TianyuShellUIMessageType,
    TianyuShellUIHyperLink,
} from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { MessageInterface } from "../interface/MessageInterfaceExpose";
import { DEFAULT_MESSAGE_HELPER } from "../interface/state/MessageState";

const messageHelperGlobalAPIs: ITianyuShellUIMessageHelper = {
    setVerticalAlign: function (align: ITianyuShellUIVerticalAlignment): void {
        void getStore().dispatch(MessageInterface.helper.setVerticalAlign(getMessageInstanceId(), align));
    },
    setVerticalRate: function (rate: number): void {
        void getStore().dispatch(MessageInterface.helper.setVerticalRate(getMessageInstanceId(), rate));
    },
    setHorizontalAlign: function (align: ITianyuShellUIHorizontalAlignment): void {
        void getStore().dispatch(MessageInterface.helper.setHorizontalAlign(getMessageInstanceId(), align));
    },
    setHorizontalRate: function (rate: number): void {
        void getStore().dispatch(MessageInterface.helper.setHorizontalRate(getMessageInstanceId(), rate));
    },
    setTimestamp: function (stamp: number): void {
        void getStore().dispatch(MessageInterface.helper.setTimestamp(getMessageInstanceId(), stamp));
    },
    getVerticalAlign: function (): ITianyuShellUIVerticalAlignment {
        const align = getStore().selecte(MessageInterface.helper.getVerticalAlign(getMessageInstanceId()));
        return align instanceof Missing ? DEFAULT_MESSAGE_HELPER.align.vertical : align;
    },
    getVerticalRate: function (): number {
        const rate = getStore().selecte(MessageInterface.helper.getVerticalRate(getMessageInstanceId()));
        return rate instanceof Missing ? DEFAULT_MESSAGE_HELPER.rate.vertical : rate;
    },
    getHorizontalAlign: function (): ITianyuShellUIHorizontalAlignment {
        const align = getStore().selecte(MessageInterface.helper.getHorizontalAlign(getMessageInstanceId()));
        return align instanceof Missing ? DEFAULT_MESSAGE_HELPER.align.horizontal : align;
    },
    getHorizontalRate: function (): number {
        const rate = getStore().selecte(MessageInterface.helper.getHorizontalRate(getMessageInstanceId()));
        return rate instanceof Missing ? DEFAULT_MESSAGE_HELPER.rate.horizontal : rate;
    },
    getTimestamp: function (): number {
        const stamp = getStore().selecte(MessageInterface.helper.getTimestamp(getMessageInstanceId()));
        return stamp instanceof Missing ? DEFAULT_MESSAGE_HELPER.timestamp : stamp;
    },
};

export const MessageGlobalAPIs: ITianyuShellCoreUIMessage = {
    post: function (
        type: TianyuShellUIMessageType,
        code: string,
        message: string,
        title: string,
        detail?: string[],
        isTech?: boolean | undefined,
        moreInfo?: TianyuShellUIHyperLink | undefined,
        troubleShot?: TianyuShellUIHyperLink | undefined,
    ): void {
        void getStore().dispatch(
            MessageInterface.message.post(getMessageInstanceId(), {
                type,
                code,
                message,
                title,
                detail,
                isTech,
                moreInfo,
                troubleShot,
            }),
        );
    },
    close: function (id: string): void {
        void getStore().dispatch(MessageInterface.message.close(getMessageInstanceId(), id));
    },
    isOpen: function (id: string): boolean {
        const isOpen = getStore().selecte(MessageInterface.message.isOpen(getMessageInstanceId(), id));
        return isOpen instanceof Missing ? false : isOpen;
    },
    count: function (): number {
        const count = getStore().selecte(MessageInterface.message.count(getMessageInstanceId()));
        return count instanceof Missing ? 0 : count;
    },
    helper: messageHelperGlobalAPIs,
};
