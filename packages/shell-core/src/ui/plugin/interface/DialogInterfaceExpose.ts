/** @format */

import {
    ActionFactor,
    ITianyuStoreInterface,
    ITianyuStoreInterfaceImplementation,
    SelectorFactor,
    StoreUtils,
} from "@aitianyu.cn/tianyu-store";
import { StoreType } from "./StoreTypes";
import {
    ConvertCountToBoolean,
    GetAllowCreateLayer,
    GetAllowDeleteLayer,
    GetCurrentLayer,
    GetCurrentLayerHtml,
    GetCurrentLayerIndex,
    GetDialogLayerCount,
    GetDialogLayerExist,
    GetDialogLayers,
    GetIsDialogElementOpen,
    GetLayerElementShownCount,
    GetLayerHasElement,
    GetLayerHtmlById,
} from "./selector/DialogSelector";
import {
    AddNewLayerAction,
    CloseDialogAction,
    CreateDialogAction,
    DestroyDialogAction,
    DialogExternalObjectCreator,
    DialogExternalObjectDestroy,
    OpenDialogAction,
    RefreshLayerDisplayState,
    RemoveLayerAction,
    SetBaseLayerIdAction,
    SwitchLayerAction,
    _RemoveElementFromLayer,
    _RemoveLayerById,
    _UpdateCurrentLayer,
} from "./action/DialogAction";
import { IDialogState, IDialogInstance } from "./state/DialogState";

export const DialogInterface = {
    core: {
        creator: CreateDialogAction,
        destroy: DestroyDialogAction,
    },
    layer: {
        add: AddNewLayerAction,
        switch: SwitchLayerAction,
        remove: RemoveLayerAction,

        internal: {
            _remove: _RemoveLayerById,
            _removeElements: _RemoveElementFromLayer,
            _updateCurrent: _UpdateCurrentLayer,

            _getLayerHtml: GetLayerHtmlById,
            _getLayerElementsCount: GetLayerElementShownCount,

            _allowCreate: GetAllowCreateLayer,
            _allowDelete: GetAllowDeleteLayer,
        },

        current: {
            id: GetCurrentLayer,
            html: GetCurrentLayerHtml,
            index: GetCurrentLayerIndex,
        },

        count: GetDialogLayerCount,
        exist: GetDialogLayerExist,
        all: GetDialogLayers,
        hasElement: GetLayerHasElement,
    },

    tools: {
        __toBoolean: ConvertCountToBoolean,

        externalObj: {
            create: DialogExternalObjectCreator,
            remove: DialogExternalObjectDestroy,
        },

        setBaseId: SetBaseLayerIdAction,
        refreshState: RefreshLayerDisplayState,
    },

    open: OpenDialogAction,
    close: CloseDialogAction,
    isOpen: GetIsDialogElementOpen,
};

export const DialogExpose = {
    open: ActionFactor.makeVirtualAction<IDialogState, IDialogInstance>(),
    close: ActionFactor.makeVirtualAction<IDialogState, string>(),

    isOpen: SelectorFactor.makeVirtualParameterSelector<IDialogState, string, boolean>(),

    layer: {
        add: ActionFactor.makeVirtualAction<IDialogState, string>(),
        switch: ActionFactor.makeVirtualAction<IDialogState, string>(),
        remove: ActionFactor.makeVirtualAction<IDialogState, string>(),

        count: SelectorFactor.makeVirtualSelector<IDialogState, number>(),
        exist: SelectorFactor.makeVirtualParameterSelector<IDialogState, string, boolean>(),
        all: SelectorFactor.makeVirtualSelector<IDialogState, string[]>(),
        hasElement: SelectorFactor.makeVirtualRestrictSelector<string, boolean>(),

        current: {
            id: SelectorFactor.makeVirtualSelector<IDialogState, string>(),
            html: SelectorFactor.makeVirtualRestrictSelector<any, HTMLElement | undefined>(),
            index: SelectorFactor.makeVirtualSelector<IDialogState, number>(),
        },
    },
};

DialogInterface as ITianyuStoreInterface<IDialogState>;
DialogExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(DialogExpose, StoreType.DIALOG_STORE_TYPE);
