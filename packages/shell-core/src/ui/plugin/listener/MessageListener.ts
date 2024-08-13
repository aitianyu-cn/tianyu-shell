/** @format */

import { ListenerFactor, Missing } from "@aitianyu.cn/tianyu-store";
import { MapOfType, ObjectHelper } from "@aitianyu.cn/types";
import { getStore } from "shell-core/src/core/utils/Store";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { MessageListenerExpose } from "../interface/MessageInterfaceExpose";
import { DEFAULT_MESSAGE_HELPER, IMessageHelper, IMessageTipState } from "../interface/state/MessageState";
import { MessageTip } from "../types/MessageTip";
import * as MessageBundle from "../../resources/i18n/Message";
import { updateMessageLayer } from "../handler/MessageHandler";
import { Log } from "shell-core/src/core/plugin/Console";
import { TestHook } from "infra/TestHook";

function onMessagePost(
    oldMessages: MapOfType<IMessageTipState> | undefined,
    newMessage: MapOfType<IMessageTipState> | undefined,
): void {
    oldMessages = oldMessages || {};
    newMessage = newMessage || {};

    const store = getStore();
    const instanceId = getMessageInstanceId();

    const layerId = store.selecte(MessageListenerExpose.control.getId(instanceId));
    if (typeof layerId !== "string") {
        return;
    }

    const messageLayer = document.getElementById(layerId);
    if (!messageLayer) {
        Log.error(MessageBundle.getText("TIANYU_UI_MESSAGE_POST_NO_LAYER", layerId));
        TestHook.debugger("message layer is invalid");
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

    const layerId = store.selecte(MessageListenerExpose.control.getId(instanceId));
    if (typeof layerId !== "string") {
        return;
    }

    const messageLayer = document.getElementById(layerId);
    if (!messageLayer) {
        return;
    }

    updateMessageLayer(messageLayer, messageHelper);
}

export const LayerSettingListener = ListenerFactor.createListener(
    MessageListenerExpose.control.getHelper(getMessageInstanceId()),
    onLayerSettingChanged,
);

export const MessagePostListener = ListenerFactor.createListener(
    MessageListenerExpose.control.allMessages(getMessageInstanceId()),
    onMessagePost,
);
