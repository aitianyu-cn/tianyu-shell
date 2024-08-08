/** @format */

import {
    ActionFactor,
    ITianyuStoreInterface,
    ITianyuStoreInterfaceImplementation,
    SelectorFactor,
    StoreUtils,
} from "@aitianyu.cn/tianyu-store";
import {
    BackgroundExternalAction,
    BackgroundLifecycleAction,
    ClearHtmlElementsAction,
    CreateBackgroundInstanceAction,
    RemoveColorAction,
    RemoveHtmlElementAction,
    ResetBackgroundAction,
    SetColorAction,
    SetHtmlElementAction,
} from "./action/BackgroundAction";
import { DestroyBackgroundInstanceActionCreator } from "./action/BackgroundActionCreator";
import {
    GetBackgroundColorSelector,
    GetBackgroundCurrentHTMLElement,
    GetBackgroundCurrentHTMLElementId,
    GetBackgroundDefaultColorSelector,
    GetBackgroundHTMLElements,
    GetBackgroundInfoSelector,
    GetBackgroundLayerIdSelector,
} from "./selector/BackgroundSelector";
import { IBackgroundInfo, IBackgroundState } from "./state/BackgroundState";
import { StoreType } from "./StoreTypes";

export const BackgroundInterface = {
    core: {
        creator: CreateBackgroundInstanceAction,
        destroy: DestroyBackgroundInstanceActionCreator,
    },
    control: {
        externalCreator: BackgroundExternalAction,
        externalDestroy: BackgroundLifecycleAction,

        reset: ResetBackgroundAction,

        getId: GetBackgroundLayerIdSelector,
        getBackground: GetBackgroundInfoSelector,
    },
    color: {
        set: SetColorAction,
        remove: RemoveColorAction,

        get: GetBackgroundColorSelector,
        getDefault: GetBackgroundDefaultColorSelector,
    },
    html: {
        set: SetHtmlElementAction,
        remove: RemoveHtmlElementAction,
        reset: ResetBackgroundAction,
        clear: ClearHtmlElementsAction,

        current: GetBackgroundCurrentHTMLElement,
        currentId: GetBackgroundCurrentHTMLElementId,
        getAllElements: GetBackgroundHTMLElements,
    },
};

export const BackgroundListenerExpose = {
    control: {
        getId: SelectorFactor.makeVirtualSelector<IBackgroundState, string>(),
        getBackground: SelectorFactor.makeVirtualSelector<IBackgroundState, IBackgroundInfo>(),
    },
    html: {
        current: SelectorFactor.makeVirtualParameterSelector<IBackgroundState, string, HTMLElement | undefined>(),
    },
};

export const BackgroundExpose = {
    control: {
        reset: ActionFactor.makeVirtualAction<IBackgroundState>(),

        getId: SelectorFactor.makeVirtualSelector<IBackgroundState, string>(),
        getBackground: SelectorFactor.makeVirtualSelector<IBackgroundState, IBackgroundInfo>(),
    },
    color: {
        set: ActionFactor.makeVirtualAction<IBackgroundState, string>(),
        remove: ActionFactor.makeVirtualAction<IBackgroundState>(),

        get: SelectorFactor.makeVirtualSelector<IBackgroundState, string>(),
        getDefault: SelectorFactor.makeVirtualSelector<IBackgroundState, string>(),
    },
    html: {
        set: ActionFactor.makeVirtualAction<IBackgroundState, { element: HTMLElement; id?: string }>(),
        remove: ActionFactor.makeVirtualAction<IBackgroundState, string>(),
        reset: ActionFactor.makeVirtualAction<IBackgroundState>(),
        clear: ActionFactor.makeVirtualAction<IBackgroundState>(),

        currentId: SelectorFactor.makeVirtualSelector<IBackgroundState, string | null>(),
        getAllElements: SelectorFactor.makeVirtualSelector<IBackgroundState, string[]>(),
    },
};

BackgroundInterface as ITianyuStoreInterface<IBackgroundState>;
BackgroundExpose as ITianyuStoreInterfaceImplementation;
BackgroundListenerExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(BackgroundExpose, StoreType.BACKGROUND_STORE_TYPE);
StoreUtils.registerExpose(BackgroundListenerExpose, StoreType.BACKGROUND_STORE_TYPE);
