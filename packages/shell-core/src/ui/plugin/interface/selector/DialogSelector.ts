/** @format */

import { SelectorFactor, TianyuStoreEntityInterfaceExpose } from "@aitianyu.cn/tianyu-store";
import { DIALOG_ELEMENT_MAP, DIALOG_LAYER_MAP, DialogElementMap, IDialogState, LayerMap } from "../state/DialogState";
import { ObjectHelper } from "@aitianyu.cn/types";

export const GetDialogLayerCount = SelectorFactor.makeSelector<IDialogState, number>(function (state) {
    return state.layers.length;
});

export const GetDialogLayerExist = SelectorFactor.makeParameterSelector<IDialogState, string, boolean>(function (
    state,
    id,
) {
    return state.layers.includes(id);
});

export const GetDialogLayers = SelectorFactor.makeSelector<IDialogState, string[]>(function (state) {
    return ObjectHelper.clone(state.layers);
});

export const GetCurrentLayer = SelectorFactor.makeSelector<IDialogState, string>(function (state) {
    return state.current;
});

export const GetCurrentLayerIndex = SelectorFactor.makeSelector<IDialogState, number>(function (state) {
    return state.layers.findIndex((value) => value === state.current);
});

export const GetLayerHtmlById = SelectorFactor.makeParameterSelector<
    IDialogState,
    string,
    HTMLElement | undefined,
    LayerMap | undefined
>(
    function (_, id, layerMap) {
        return layerMap?.get(id);
    },
    function (register) {
        return register.get(DIALOG_LAYER_MAP);
    },
);

export const GetCurrentLayerHtml = SelectorFactor.makeRestrictSelector(GetCurrentLayer, GetLayerHtmlById);

export const GetLayerElementShownCount = SelectorFactor.makeParameterSelector<
    IDialogState,
    string,
    number,
    DialogElementMap | undefined
>(
    function (_, id, elements) {
        let count = 0;
        if (elements) {
            for (const dialogElem of elements) {
                if (dialogElem[1].layer === id) {
                    count = count + 1;
                }
            }
        }

        return count;
    },
    function (register) {
        return register.get(DIALOG_ELEMENT_MAP);
    },
);

export const GetLayerHasElement = SelectorFactor.makeRestrictSelector<boolean, string>(
    GetLayerElementShownCount,
    TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].utils.toBoolean,
);

export const GetAllowCreateLayer = SelectorFactor.makeSelector<IDialogState, boolean>(function (state) {
    return state.layers.length < 10;
});

export const GetAllowDeleteLayer = SelectorFactor.makeParameterSelector<IDialogState, string, boolean>(function (
    state,
    id,
) {
    return state.id !== id && state.layers.includes(id);
});

export const GetIsDialogElementOpen = SelectorFactor.makeParameterSelector<IDialogState, string, boolean>(function (
    state,
    elementId,
) {
    return state.dialogs.includes(elementId);
});
