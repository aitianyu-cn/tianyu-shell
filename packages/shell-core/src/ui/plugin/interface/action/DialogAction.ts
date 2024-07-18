/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { DIALOG_ELEMENT_MAP, DIALOG_LAYER_MAP, DialogElementMap, IDialogState, LayerMap } from "../state/DialogState";
import {
    GetAllowDeleteLayer,
    GetCurrentLayer,
    GetDialogLayerCount,
    GetDialogLayerExist,
    GetLayerHasElement,
} from "../selector/DialogSelector";
import { generateDialogLayerBase } from "../../handler/DialogHandler";
import { ObjectHelper } from "@aitianyu.cn/types";

export const CreateDialogAction = ActionFactor.makeCreateStoreAction<IDialogState>().withReducer(function (_) {
    return {
        id: "",
        layers: [],
        current: "",
        dialogs: [],
    } as IDialogState;
});

export const DestroyDialogAction = ActionFactor.makeDestroyStoreAction();

export const DialogExternalObjectCreator = ActionFactor.makeActionCreator<IDialogState>().withExternal(function (
    register,
) {
    const layerMap: LayerMap = new Map<string, HTMLElement>();
    const elementMap: DialogElementMap = new Map<string, { layer: string; element: HTMLElement }>();

    register.add(DIALOG_LAYER_MAP, layerMap);
    register.add(DIALOG_ELEMENT_MAP, elementMap);
});

export const DialogExternalObjectDestroy = ActionFactor.makeActionCreator<IDialogState>().withExternal(function (
    register,
) {
    register.remove(DIALOG_LAYER_MAP);
    register.remove(DIALOG_ELEMENT_MAP);
});

export const SetBaseLayerIdAction = ActionFactor.makeActionCreator<IDialogState, string>().withReducer(function (
    state,
    id,
) {
    return StoreUtils.State.getNewState(state, ["id"], state.id || id);
});

export const AddNewLayerAction = ActionFactor.makeActionCreator<IDialogState, string>()
    .withHandler(function* (action) {
        if (!action.params) {
            return;
        }

        const hasLayer = yield* StoreUtils.Handler.doSelector(GetDialogLayerExist(action.instanceId, action.params));
        if (hasLayer instanceof Missing || hasLayer) {
            return;
        }

        const layerMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
            return register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
        });
        if (!layerMap) {
            return;
        }

        const layerIndex = yield* StoreUtils.Handler.doSelector(GetDialogLayerCount(action.instanceId));
        if (layerIndex instanceof Missing) {
            return;
        }

        const layerHtml = generateDialogLayerBase(action.params, layerIndex);
        layerMap.set(action.params, layerHtml);

        return action.params;
    })
    .withReducer(function (state, data) {
        const newState = ObjectHelper.clone(state) as IDialogState;

        if (data) {
            newState.layers.push(data);
        }

        return newState;
    });

export const SwitchLayerAction = ActionFactor.makeActionCreator<IDialogState, string>()
    .withHandler(function* (action) {
        const currentLayer = yield* StoreUtils.Handler.doSelector(GetCurrentLayer(action.instanceId));
        if (currentLayer instanceof Missing || currentLayer === action.params) {
            return;
        }

        const hasLayer = yield* StoreUtils.Handler.doSelector(GetDialogLayerExist(action.instanceId, action.params));
        if (hasLayer instanceof Missing || !hasLayer) {
            return;
        }

        return action.params;
    })
    .withReducer(function (state, newLayer) {
        return StoreUtils.State.getNewState(state, ["current"], newLayer);
    });

export const RefreshLayerDisplayState = ActionFactor.makeActionCreator<IDialogState, string>().withHandler(function* (
    action,
) {
    if (!action.params) {
        return;
    }

    const layerHtml = yield* StoreUtils.Handler.doReadExternal((register) => {
        const layerMap = register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
        return layerMap?.get(action.params);
    });
    if (!layerHtml) {
        return;
    }

    const layerDisplay = yield* StoreUtils.Handler.doSelector(GetLayerHasElement(action.instanceId, action.params));
    if (layerDisplay instanceof Missing) {
        return;
    }

    if (layerDisplay) {
        layerHtml.classList.remove("tys_common_view_hidden");
        layerHtml.classList.add("tys_common_view_show");
    } else {
        layerHtml.classList.remove("tys_common_view_show");
        layerHtml.classList.add("tys_common_view_hidden");
    }
});

export const RemoveLayerAction = ActionFactor.makeActionCreator<IDialogState, string>().withHandler(function* ({
    instanceId,
    params: layerId,
}) {
    const canDelete = yield* StoreUtils.Handler.doSelector(GetAllowDeleteLayer(instanceId, layerId));
    if (canDelete instanceof Missing || !canDelete) {
        return;
    }

    //
});
