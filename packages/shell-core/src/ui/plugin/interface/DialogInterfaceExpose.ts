/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
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
import { CreateDialogAction, DestroyDialogAction } from "./action/DialogAction";

export const DialogInterface = {
    core: {
        creator: CreateDialogAction,
        destroy: DestroyDialogAction,
    },
    layer: {
        current: {
            id: GetCurrentLayer,
            html: GetCurrentLayerHtml,
            index: GetCurrentLayerIndex,
        },

        count: GetDialogLayerCount,
        exist: GetDialogLayerExist,
        all: GetDialogLayers,
        hasElement: GetLayerHasElement,
        allowCreate: GetAllowCreateLayer,
        allowDelete: GetAllowDeleteLayer,

        getter: {
            layerHtml: GetLayerHtmlById,
            layerElementsCount: GetLayerElementShownCount,
        },
    },

    element: {
        isOpen: GetIsDialogElementOpen,
    },

    tools: {
        __toBoolean: ConvertCountToBoolean,

        externalObj: {
            create: DialogExternalObjectCreator,
            remove: DialogExternalObjectDestroy,
        },
    },
};

export const DialogExpose = {};

StoreUtils.registerExpose(DialogExpose, StoreType.DIALOG_STORE_TYPE);
