/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { MapOfType, ObjectHelper } from "@aitianyu.cn/types";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
} from "shell-core/src/core/declares/ui/UserInterface";
import {
    IMessageHelper,
    IMessageInfoLink,
    IMessageState,
    IMessageTipState,
    MESSAGE_LINKER_MAP,
} from "../state/MessageState";

export const GetMessageLayerIdSelector = SelectorFactor.makeSelector<IMessageState, string>(function (state) {
    return state.helper.layerId;
});

export const GetVerticalAlignSelector = SelectorFactor.makeSelector<IMessageState, ITianyuShellUIVerticalAlignment>(
    function (state) {
        return state.helper.align.vertical;
    },
);
export const GetVerticalRateSelector = SelectorFactor.makeSelector<IMessageState, number>(function (state) {
    return state.helper.rate.vertical;
});
export const GetHorizontalAlignSelector = SelectorFactor.makeSelector<IMessageState, ITianyuShellUIHorizontalAlignment>(
    function (state) {
        return state.helper.align.horizontal;
    },
);
export const GetHorizontalRateSelector = SelectorFactor.makeSelector<IMessageState, number>(function (state) {
    return state.helper.rate.horizontal;
});
export const GetTimestampSelector = SelectorFactor.makeSelector<IMessageState, number>(function (state) {
    return state.helper.timestamp;
});

export const GetHelperSelector = SelectorFactor.makeSelector<IMessageState, IMessageHelper>(function (state) {
    return ObjectHelper.clone(state.helper);
});

export const IsMessageOpenSelector = SelectorFactor.makeParameterSelector<IMessageState, string, boolean>(function (
    state,
    msgId,
) {
    return Boolean(state.messages[msgId]);
});
export const GetMessagePostCountSelector = SelectorFactor.makeSelector<IMessageState, number>(function (state) {
    return Object.keys(state.messages).length;
});

export const GetMessageLinkSelector = SelectorFactor.makeParameterSelector<IMessageState, string, string>(function (
    state,
    messageId,
) {
    return state.messages[messageId]?.link || "";
});

export const GetMessageInfoSelector = SelectorFactor.makeParameterSelector<
    IMessageState,
    string,
    IMessageTipState | undefined
>(function (state, messageId) {
    return state.messages[messageId];
});

export const GetAllMessageInfoSelector = SelectorFactor.makeSelector<IMessageState, MapOfType<IMessageTipState>>(
    function (state) {
        return state.messages;
    },
);

export const GetMessageLinkInfoSelector = SelectorFactor.makeParameterSelector<
    IMessageState,
    string,
    IMessageInfoLink,
    Map<string, IMessageInfoLink> | undefined
>(
    function (_state, messageId, linkMap) {
        return linkMap?.get(messageId) || {};
    },
    function (register) {
        return register.get(MESSAGE_LINKER_MAP) as Map<string, IMessageInfoLink> | undefined;
    },
);
