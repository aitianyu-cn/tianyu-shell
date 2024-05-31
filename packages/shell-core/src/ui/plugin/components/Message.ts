/** @format */

import { InstanceId, IStore, ListenerFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { MapOfType, ObjectCalculater, ObjectHelper } from "@aitianyu.cn/types";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import {
    ITianyuShellCoreUIMessage,
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIMessageHelper,
    ITianyuShellUIVerticalAlignment,
    TianyuShellUIHyperLink,
    TianyuShellUIMessageType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { isMobile } from "shell-core/src/core/plugin/Runtime";
import { getStore } from "shell-core/src/core/utils/Store";
import { TianyuShellUIMessageZIndex } from "../../common/Declare";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { MessageInterface } from "../interface/MessageInterfaceExpose";
import { DEFAULT_MESSAGE_HELPER, IMessageHelper, IMessageTipState } from "../interface/state/MessageState";
import { StoreType } from "../interface/StoreTypes";
import { MessageTip } from "../types/MessageTip";
import * as MessageBundle from "../../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";

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

const messageGlobalAPIs: ITianyuShellCoreUIMessage = {
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

function updateMessageLayer(messageLayer: HTMLElement, messageHelper: IMessageHelper): void {
    // to setup message layer setting.
    const leftAlign = messageHelper.align.horizontal === ITianyuShellUIHorizontalAlignment.LEFT;
    const rightAlign = messageHelper.align.horizontal === ITianyuShellUIHorizontalAlignment.RIGHT;
    const topAlign = messageHelper.align.vertical === ITianyuShellUIVerticalAlignment.TOP;
    const bottomAlign = messageHelper.align.vertical === ITianyuShellUIVerticalAlignment.BOTTOM;

    messageLayer.id = messageHelper.layerId;
    messageLayer.classList.add(
        "tys_message_layer_styling",
        topAlign ? "tys_message_layer_styling_vtop" : "tys_message_layer_styling_vntop",
    );
    messageLayer.style.zIndex = `${TianyuShellUIMessageZIndex}`;
    messageLayer.style.width = isMobile ? "100%" : `${messageHelper.rate.horizontal}%`;
    messageLayer.style.maxHeight = isMobile ? "100%" : `${messageHelper.rate.vertical}%`;
    messageLayer.style.height = "fit-content";
    messageLayer.style.left = leftAlign
        ? "0px"
        : rightAlign
        ? "auto"
        : isMobile
        ? "0px"
        : `${(100 - messageHelper.rate.horizontal) / 2}%`;
    messageLayer.style.right = leftAlign
        ? "auto"
        : rightAlign
        ? "0px"
        : isMobile
        ? "0px"
        : `${(100 - messageHelper.rate.horizontal) / 2}%`;

    messageLayer.style.top = topAlign
        ? "0px"
        : bottomAlign
        ? "auto"
        : isMobile
        ? "0px"
        : `${(100 - messageHelper.rate.vertical) / 2}%`;
    messageLayer.style.bottom = topAlign
        ? "auto"
        : bottomAlign
        ? "0px"
        : isMobile
        ? "0px"
        : `${(100 - messageHelper.rate.vertical) / 2}%`;
    messageLayer.style.alignItems = leftAlign ? "flex-start" : rightAlign ? "flex-end" : "center";
}

function initLayout(): void {
    const store = getStore();
    const instanceId = getMessageInstanceId();

    const layerId = store.selecte(MessageInterface.control.getId(instanceId));
    const messageLayer = document.createElement("div");
    messageLayer.id = layerId instanceof Missing ? "" : layerId;
    document.body.appendChild(messageLayer);

    const messageHelperWithMissing = store.selecte(MessageInterface.control.getHelper(instanceId));
    const messageHelper =
        messageHelperWithMissing instanceof Missing ? DEFAULT_MESSAGE_HELPER : messageHelperWithMissing;
    updateMessageLayer(messageLayer, messageHelper);
}

function onMessagePost(
    oldMessages: MapOfType<IMessageTipState> | undefined,
    newMessage: MapOfType<IMessageTipState> | undefined,
): void {
    oldMessages = oldMessages || {};
    newMessage = newMessage || {};

    const store = getStore();
    const instanceId = getMessageInstanceId();

    const layerId = store.selecte(MessageInterface.control.getId(instanceId));
    if (layerId instanceof Missing) {
        return;
    }

    const messageLayer = document.getElementById(layerId);
    if (!messageLayer) {
        Log.error(MessageBundle.getText("TIANYU_UI_MESSAGE_POST_NO_LAYER", layerId));
        return;
    }

    const oldMessageIds = Object.keys(oldMessages);
    const newMessageIds = Object.keys(newMessage);
    for (const id of newMessageIds) {
        if (!oldMessageIds.includes(id)) {
            // to open
            const tip = new MessageTip(id);
            const renderElement = tip.render();
            messageLayer.appendChild(renderElement);
            Log.debug(MessageBundle.getText("TIANYU_UI_MESSAGE_POST_SUCCESS", id));
        }
    }
}

function onLayerSettingChanged(oldState: IMessageHelper | undefined, newState: IMessageHelper | undefined): void {
    const messageHelper = newState
        ? newState
        : ObjectHelper.compareObjects(oldState, DEFAULT_MESSAGE_HELPER) === "different"
        ? DEFAULT_MESSAGE_HELPER
        : undefined;

    if (!messageHelper) {
        return;
    }

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

    updateMessageLayer(messageLayer, messageHelper);
}

let layerSettingListener = null;
let messagePostListener = null;

export async function initTianyuShellCoreUIMessage(): Promise<void> {
    const windowObj = window as any;
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.background) {
        return;
    }

    const store = getStore();
    const instanceId = getMessageInstanceId();

    store.registerInterface(StoreType.MESSAGE_STORE_TYPE, MessageInterface);

    await store.dispatch(
        StoreUtils.createBatchAction([
            MessageInterface.core.creator(instanceId),
            MessageInterface.control.init(instanceId),
        ]),
    );

    layerSettingListener = ListenerFactor.createListener(
        MessageInterface.control.getHelper(instanceId),
        onLayerSettingChanged,
    );
    messagePostListener = ListenerFactor.createListener(
        MessageInterface.control.allMessages(instanceId),
        onMessagePost,
    );
    store.startListen(layerSettingListener);
    store.startListen(messagePostListener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                message: messageGlobalAPIs,
            },
        },
    };

    initLayout();
}
