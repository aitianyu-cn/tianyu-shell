/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { guid, ObjectHelper } from "@aitianyu.cn/types";
import { TianyuShellUIMessagePreious } from "shell-core/src/ui/common/Declare";
import { GetMessageLinkSelector, GetTimestampSelector } from "../selector/MessageSelector";
import {
    DEFAULT_MESSAGE_HELPER,
    IMessageInfoLink,
    IMessageState,
    IMessageTipState,
    MESSAGE_LINKER_MAP,
} from "../state/MessageState";
import {
    CloseMessageActionCreator,
    CreateLinkerMapActionCreator,
    CreateMessageInstanceActionCreator,
    LifeCycleActionCreator,
    PostMessageActionCreator,
    SetHorizontalAlignActionCreator,
    SetHorizontalRateActionCreator,
    SetTimestampActionCreator,
    SetVerticalAlignActionCreator,
    SetVerticalRateActionCreator,
} from "./MessageActionCreator";

export const CreateMessageInstanceAction = CreateMessageInstanceActionCreator.withReducer(function (_state) {
    const instance = {
        helper: ObjectHelper.clone(DEFAULT_MESSAGE_HELPER),
        messages: {},
    };
    instance.helper.layerId = `${TianyuShellUIMessagePreious}_${guid()}`;
    return instance;
});

export const CreateLinkerMapAction = CreateLinkerMapActionCreator.withExternal(function (register) {
    register.add(MESSAGE_LINKER_MAP, new Map<string, IMessageInfoLink>());
});
export const LifeCycleAction = LifeCycleActionCreator.withExternal(function (register) {
    register.remove(MESSAGE_LINKER_MAP);
});

export const SetVerticalAlignAction = SetVerticalAlignActionCreator.withReducer(function (state, align) {
    return StoreUtils.State.getNewState(state, ["helper", "align", "vertical"], align);
});
export const SetHorizontalAlignAction = SetHorizontalAlignActionCreator.withReducer(function (state, align) {
    return StoreUtils.State.getNewState(state, ["helper", "align", "horizontal"], align);
});

export const SetVerticalRateAction = SetVerticalRateActionCreator.withReducer(function (state, rate) {
    return StoreUtils.State.getNewState(state, ["helper", "rate", "vertical"], rate);
});
export const SetHorizontalRateAction = SetHorizontalRateActionCreator.withReducer(function (state, align) {
    return StoreUtils.State.getNewState(state, ["helper", "rate", "horizontal"], align);
});
export const SetTimestampAction = SetTimestampActionCreator.withReducer(function (state, stamp) {
    return StoreUtils.State.getNewState(state, ["helper", "timestamp"], stamp);
});

export const PostMessageAction = PostMessageActionCreator.withHandler(function* (action) {
    let link = "";
    if (action.params.moreInfo || action.params.troubleShot) {
        const infoLink: IMessageInfoLink = {
            moreInfo: action.params.moreInfo,
            troubleShot: action.params.troubleShot,
        };

        const linkMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
            return register.get(MESSAGE_LINKER_MAP) as Map<string, IMessageInfoLink> | undefined;
        });
        if (linkMap) {
            link = guid();
            linkMap.set(link, infoLink);
        }
    }

    const timestamp = yield* StoreUtils.Handler.doSelectorWithThrow(GetTimestampSelector(action.instanceId));

    const messageId = guid();
    const message: IMessageTipState = {
        type: action.params.type,
        code: action.params.code,
        message: action.params.message,
        title: action.params.title,
        detail: action.params.detail || [],
        isTechError: Boolean(action.params.isTech),
        timestamp: timestamp,
        unread: true,
        link: link,
    };

    return {
        id: messageId,
        msg: message,
    };
}).withReducer(function (state, msg) {
    const newState = ObjectHelper.clone(state) as IMessageState;
    newState.messages[msg.id] = msg.msg;

    return newState;
});

export const CloseMessageAction = CloseMessageActionCreator.withHandler(function* (action) {
    const linkInfoId = yield* StoreUtils.Handler.doSelectorWithThrow(
        GetMessageLinkSelector(action.instanceId, action.params),
    );
    if (linkInfoId) {
        const linkMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
            return register.get(MESSAGE_LINKER_MAP) as Map<string, IMessageInfoLink> | undefined;
        });
        linkMap?.delete(linkInfoId);
    }

    return action.params;
}).withReducer(function (state, messageId) {
    const newState = ObjectHelper.clone(state) as IMessageState;
    if (newState.messages[messageId]) {
        delete newState.messages[messageId];
    }

    return newState;
});
