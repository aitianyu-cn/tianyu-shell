/** @format */

import { guid } from "@aitianyu.cn/types";
import { TianyuShellUIBackgroundPreious } from "shell-core/src/ui/common/Declare";
import {
    BackgroundExternalActionCreator,
    BackgroundLifecycleActionCreator,
    ClearHtmlElementsActionCreator,
    CreateBackgroundInstanceActionCreator,
    RemoveColorActionCreator,
    RemoveHtmlElementActionCreator,
    ResetBackgroundActionCreator,
    ResetHtmlElementActionCreator,
    SetColorActionCreator,
    SetHtmlElementActionCreator,
} from "./BackgroundActionCreator";
import { TianyuShellProcessor } from "shell-core/src/core/utils/Processor";
import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { GetBackgroundCurrentHTMLElementId, GetBackgroundDefaultColorSelector } from "../selector/BackgroundSelector";
import { BACKGROUND_ELEMENT_MAP } from "../state/BackgroundState";

export const CreateBackgroundInstanceAction = CreateBackgroundInstanceActionCreator.withReducer(function (_state) {
    const defaultColor = TianyuShellProcessor.getUIConfigures().core.background;

    return {
        layerId: `${TianyuShellUIBackgroundPreious}_${guid()}`,
        color: defaultColor,
        defaultColor: defaultColor,
        elementId: null,
    };
});

export const BackgroundExternalAction = BackgroundExternalActionCreator.withExternal(function (register) {
    register.add(BACKGROUND_ELEMENT_MAP, new Map<string, HTMLElement>());
});
export const BackgroundLifecycleAction = BackgroundLifecycleActionCreator.withExternal(function (register) {
    register.remove(BACKGROUND_ELEMENT_MAP);
});

export const SetColorAction = SetColorActionCreator.withReducer(function (state, data) {
    return StoreUtils.State.getNewState(state, ["color"], data);
});
export const RemoveColorAction = RemoveColorActionCreator.withHandler(function* (action) {
    const defaultColor = yield* StoreUtils.Handler.doSelector(GetBackgroundDefaultColorSelector(action.instanceId));
    yield* StoreUtils.Handler.doAction(SetColorAction(action.instanceId, defaultColor));
});

export const SetHtmlElementAction = SetHtmlElementActionCreator.withHandler(function* (action) {
    const htmlMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(BACKGROUND_ELEMENT_MAP) as Map<string, HTMLElement> | undefined;
    });
    if (!htmlMap) {
        return;
    }

    const elementId = action.params.id || guid();
    htmlMap.set(elementId, action.params.element);

    return elementId;
}).withReducer(function (state, data) {
    if (!data) {
        return state;
    }
    return StoreUtils.State.getNewState(state, ["elementId"], data);
});
export const RemoveHtmlElementAction = RemoveHtmlElementActionCreator.withHandler(function* (action) {
    const elementId = action.params;
    if (!elementId) {
        return;
    }

    const htmlMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(BACKGROUND_ELEMENT_MAP) as Map<string, HTMLElement> | undefined;
    });
    if (!htmlMap) {
        return;
    }
    htmlMap.delete(elementId);

    const current = yield* StoreUtils.Handler.doSelector(GetBackgroundCurrentHTMLElementId(action.instanceId));
    return current === elementId;
}).withReducer(function (state, data) {
    return data ? StoreUtils.State.getNewState(state, ["elementId"], null) : state;
});
export const ResetHtmlElementAction = ResetHtmlElementActionCreator.withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["elementId"], null);
});
export const ClearHtmlElementsAction = ClearHtmlElementsActionCreator.withHandler(function* (action) {
    const htmlMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(BACKGROUND_ELEMENT_MAP) as Map<string, HTMLElement> | undefined;
    });
    htmlMap?.clear();
}).withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["elementId"], null);
});

export const ResetBackgroundAction = ResetBackgroundActionCreator.withHandler(function* (action) {
    const htmlMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(BACKGROUND_ELEMENT_MAP) as Map<string, HTMLElement> | undefined;
    });
    htmlMap?.clear();
    const defaultColor = yield* StoreUtils.Handler.doSelector(GetBackgroundDefaultColorSelector(action.instanceId));
    return defaultColor;
}).withReducer(function (state, data) {
    let newState = StoreUtils.State.getNewState(state, ["elementId"], null);
    newState = StoreUtils.State.getNewState(state, ["color"], data);
    return newState;
});
