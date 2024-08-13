/** @format */

import {
    ActionFactor,
    ITianyuStoreInterface,
    ITianyuStoreInterfaceImplementation,
    SelectorFactor,
    StoreUtils,
} from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
} from "shell-core/src/core/declares/ui/UserInterface";
import {
    CloseMessageAction,
    CreateLinkerMapAction,
    CreateMessageInstanceAction,
    LifeCycleAction,
    PostMessageAction,
    SetHorizontalAlignAction,
    SetHorizontalRateAction,
    SetTimestampAction,
    SetVerticalAlignAction,
    SetVerticalRateAction,
} from "./action/MessageAction";
import { DestroyMessageInstanceActionCreator } from "./action/MessageActionCreator";
import {
    GetMessageLayerIdSelector,
    GetVerticalAlignSelector,
    GetVerticalRateSelector,
    GetHorizontalAlignSelector,
    GetHorizontalRateSelector,
    GetTimestampSelector,
    IsMessageOpenSelector,
    GetMessagePostCountSelector,
    GetMessageLinkSelector,
    GetMessageInfoSelector,
    GetMessageLinkInfoSelector,
    GetHelperSelector,
    GetAllMessageInfoSelector,
} from "./selector/MessageSelector";
import { IMessageHelper, IMessagePostData, IMessageState, IMessageTipState } from "./state/MessageState";
import { StoreType } from "./StoreTypes";
import { MapOfType } from "@aitianyu.cn/types";

export const MessageInterface = {
    core: {
        creator: CreateMessageInstanceAction,
        destroy: DestroyMessageInstanceActionCreator,
    },
    control: {
        init: CreateLinkerMapAction,
        lifecycle: LifeCycleAction,
        getId: GetMessageLayerIdSelector,
        getHelper: GetHelperSelector,
        allMessages: GetAllMessageInfoSelector,
    },
    helper: {
        setVerticalAlign: SetVerticalAlignAction,
        setVerticalRate: SetVerticalRateAction,
        setHorizontalAlign: SetHorizontalAlignAction,
        setHorizontalRate: SetHorizontalRateAction,
        setTimestamp: SetTimestampAction,

        getVerticalAlign: GetVerticalAlignSelector,
        getVerticalRate: GetVerticalRateSelector,
        getHorizontalAlign: GetHorizontalAlignSelector,
        getHorizontalRate: GetHorizontalRateSelector,
        getTimestamp: GetTimestampSelector,
    },
    message: {
        post: PostMessageAction,
        close: CloseMessageAction,

        isOpen: IsMessageOpenSelector,
        count: GetMessagePostCountSelector,
        getLinkId: GetMessageLinkSelector,
        getMessageState: GetMessageInfoSelector,
        getLink: GetMessageLinkInfoSelector,
    },
};

export const MessageListenerExpose = {
    control: {
        getId: SelectorFactor.makeVirtualSelector<IMessageState, string>(),
        getHelper: SelectorFactor.makeVirtualSelector<IMessageState, IMessageHelper>(),
        allMessages: SelectorFactor.makeVirtualSelector<IMessageState, MapOfType<IMessageTipState>>(),
    },
};

export const MessageExpose = {
    helper: {
        setVerticalAlign: ActionFactor.makeVirtualAction<IMessageState, ITianyuShellUIVerticalAlignment>(),
        setVerticalRate: ActionFactor.makeVirtualAction<IMessageState, number>(),
        setHorizontalAlign: ActionFactor.makeVirtualAction<IMessageState, ITianyuShellUIHorizontalAlignment>(),
        setHorizontalRate: ActionFactor.makeVirtualAction<IMessageState, number>(),
        setTimestamp: ActionFactor.makeVirtualAction<IMessageState, number>(),

        getVerticalAlign: SelectorFactor.makeVirtualSelector<IMessageState, ITianyuShellUIVerticalAlignment>(),
        getVerticalRate: SelectorFactor.makeVirtualSelector<IMessageState, number>(),
        getHorizontalAlign: SelectorFactor.makeVirtualSelector<IMessageState, ITianyuShellUIHorizontalAlignment>(),
        getHorizontalRate: SelectorFactor.makeVirtualSelector<IMessageState, number>(),
        getTimestamp: SelectorFactor.makeVirtualSelector<IMessageState, number>(),
    },
    message: {
        post: ActionFactor.makeVirtualAction<IMessageState, IMessagePostData>(),
        close: ActionFactor.makeVirtualAction<IMessageState, string>(),

        isOpen: SelectorFactor.makeVirtualParameterSelector<IMessageState, string, boolean>(),
        count: SelectorFactor.makeVirtualSelector<IMessageState, number>(),
    },
};

MessageInterface as ITianyuStoreInterface<IMessageState>;
MessageExpose as ITianyuStoreInterfaceImplementation;
MessageListenerExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(MessageExpose, StoreType.MESSAGE_STORE_TYPE);
StoreUtils.registerExpose(MessageListenerExpose, StoreType.MESSAGE_STORE_TYPE);
