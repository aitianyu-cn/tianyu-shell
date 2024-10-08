/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import {
    DIALOG_ELEMENT_MAP,
    DIALOG_LAYER_MAP,
    DialogElementMap,
    IDialogInstance,
    IDialogState,
    LayerMap,
} from "../state/DialogState";
import {
    GetAllowCreateLayer,
    GetAllowDeleteLayer,
    GetCurrentLayer,
    GetDialogLayerCount,
    GetDialogLayerExist,
    GetLayerHasElement,
    GetLayerHtmlById,
} from "../selector/DialogSelector";
import { generateDialogElement, generateDialogLayerBase } from "../../handler/DialogHandler";
import { ObjectHelper } from "@aitianyu.cn/types";
import { register } from "module";

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

        const canAdd = yield* StoreUtils.Handler.doSelector(GetAllowCreateLayer(action.instanceId));
        if (typeof canAdd !== "boolean" || !canAdd) {
            return;
        }

        const hasLayer = yield* StoreUtils.Handler.doSelector(GetDialogLayerExist(action.instanceId, action.params));
        if (typeof hasLayer !== "boolean" || hasLayer) {
            return;
        }

        const layerMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
            return register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
        });
        if (!layerMap) {
            return;
        }

        const layerIndex = yield* StoreUtils.Handler.doSelectorWithThrow(GetDialogLayerCount(action.instanceId));
        const layerHtml = generateDialogLayerBase(action.params, layerIndex);
        layerMap.set(action.params, layerHtml);

        yield* StoreUtils.Handler.doAction(SetBaseLayerIdAction(action.instanceId, action.params));

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
        const currentLayer = yield* StoreUtils.Handler.doSelectorWithThrow(GetCurrentLayer(action.instanceId));
        if (currentLayer === action.params) {
            return;
        }

        const hasLayer = yield* StoreUtils.Handler.doSelector(GetDialogLayerExist(action.instanceId, action.params));
        if (typeof hasLayer !== "boolean" || !hasLayer) {
            return;
        }

        return action.params;
    })
    .withReducer(function (state, newLayer) {
        return StoreUtils.State.getNewState(state, ["current"], newLayer || state.current);
    });

export const RefreshLayerDisplayState = ActionFactor.makeActionCreator<IDialogState, string>().withHandler(function* (
    action,
) {
    /* istanbul ignore if */
    if (!action.params) {
        return;
    }

    const layerHtml = yield* StoreUtils.Handler.doReadExternal((register) => {
        const layerMap = register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
        return layerMap?.get(action.params);
    });
    /* istanbul ignore if */
    if (!layerHtml) {
        return;
    }

    const layerDisplay = yield* StoreUtils.Handler.doSelector(GetLayerHasElement(action.instanceId, action.params));
    /* istanbul ignore if */
    if (typeof layerDisplay !== "boolean") {
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

export const _UpdateLayerElementsZIndex = ActionFactor.makeActionCreator<IDialogState, number>().withHandler(
    function* ({ params: deletedZIndex }) {
        yield* StoreUtils.Handler.doReadExternal((register) => {
            const layerMap = register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
            /* istanbul ignore if */
            if (!layerMap) {
                return;
            }

            for (const pair of layerMap) {
                const zIndex = Number(pair[1].style.zIndex);
                if (!Number.isNaN(zIndex) && zIndex > deletedZIndex) {
                    pair[1].style.zIndex = `${zIndex - 100}`;
                }
            }
        });
    },
);

export const _RemoveLayerById = ActionFactor.makeActionCreator<IDialogState, string>()
    .withHandler(function* ({ instanceId, params: layerId }) {
        const deletedZIndex = yield* StoreUtils.Handler.doReadExternal((register) => {
            const layerMap = register.get(DIALOG_LAYER_MAP) as LayerMap | undefined;
            if (!layerMap) {
                return -1;
            }

            const layer = layerMap.get(layerId);
            if (!layer) {
                return -1;
            }

            const zIndex = layer.style.zIndex;
            layerMap.delete(layerId);
            layer.remove();
            return Number(zIndex);
        });

        const isZIndexValid = !Number.isNaN(deletedZIndex) && -1 !== deletedZIndex;
        if (isZIndexValid) {
            yield* StoreUtils.Handler.doAction(_UpdateLayerElementsZIndex(instanceId, deletedZIndex));
        }

        return isZIndexValid ? layerId : undefined;
    })
    .withReducer(function (state, layerId) {
        if (layerId) {
            const newState = ObjectHelper.clone(state) as IDialogState;
            newState.layers.splice(newState.layers.indexOf(layerId), 1);
            return newState;
        }

        return state;
    });

export const _RemoveElementFromLayer = ActionFactor.makeActionCreator<IDialogState, string>()
    .withHandler(function* ({ instanceId: _instanceId, params: layerId }) {
        return yield* StoreUtils.Handler.doReadExternal((register) => {
            const elementMap = register.get(DIALOG_ELEMENT_MAP) as DialogElementMap | undefined;
            const deletedList: string[] = [];
            if (elementMap) {
                for (const elem of elementMap) {
                    if (elem[1].layer === layerId) {
                        deletedList.push(elem[0]);

                        elem[1].element.remove();
                    }
                }

                for (const elemId of deletedList) {
                    elementMap.delete(elemId);
                }
            }

            return deletedList;
        });
    })
    .withReducer(function (state, deleteList) {
        if (deleteList.length) {
            const newState = ObjectHelper.clone(state) as IDialogState;
            newState.dialogs = newState.dialogs.filter((value) => !deleteList.includes(value));
            return newState;
        }
        return state;
    });

export const _UpdateCurrentLayer = ActionFactor.makeActionCreator<IDialogState>().withReducer(function (state) {
    return state.layers.includes(state.current)
        ? state
        : StoreUtils.State.getNewState(state, ["current"], state.layers[state.layers.length - 1]);
});

export const RemoveLayerAction = ActionFactor.makeActionCreator<IDialogState, string>().withHandler(function* ({
    instanceId,
    params: layerId,
}) {
    const canDelete = yield* StoreUtils.Handler.doSelectorWithThrow(GetAllowDeleteLayer(instanceId, layerId));
    if (!canDelete) {
        return;
    }

    yield* StoreUtils.Handler.doAction(_RemoveElementFromLayer(instanceId, layerId));
    yield* StoreUtils.Handler.doAction(_RemoveLayerById(instanceId, layerId));
    yield* StoreUtils.Handler.doAction(_UpdateCurrentLayer(instanceId));
});

export const OpenDialogAction = ActionFactor.makeActionCreator<IDialogState, IDialogInstance>()
    .withHandler(function* ({ instanceId, params: elementDef }) {
        const layerId = yield* StoreUtils.Handler.doSelectorWithThrow(GetCurrentLayer(instanceId));
        const layer = yield* StoreUtils.Handler.doSelectorWithThrow(GetLayerHtmlById(instanceId, layerId));
        if (!layer) {
            return;
        }

        const dialogMap = yield* StoreUtils.Handler.doReadExternal((register) => {
            return register.get(DIALOG_ELEMENT_MAP) as DialogElementMap | undefined;
        });
        /* istanbul ignore if */
        if (!dialogMap) {
            return;
        }

        const dialogIns = generateDialogElement(elementDef);
        dialogMap.set(elementDef.id, {
            layer: layerId,
            element: dialogIns,
        });
        layer.appendChild(dialogIns);

        yield* StoreUtils.Handler.doAction(RefreshLayerDisplayState(instanceId, layerId));

        return elementDef.id;
    })
    .withReducer(function (state, elementId) {
        if (elementId) {
            return StoreUtils.State.getNewState(state, ["dialogs"], state.dialogs.concat(elementId));
        }
        return state;
    });

export const CloseDialogAction = ActionFactor.makeActionCreator<IDialogState, string>()
    .withHandler(function* ({ instanceId, params: elementId }) {
        const dialogMap = yield* StoreUtils.Handler.doReadExternal((register) => {
            return register.get(DIALOG_ELEMENT_MAP) as DialogElementMap | undefined;
        });
        if (!dialogMap) {
            return;
        }
        const element = dialogMap.get(elementId);
        if (!element) {
            return;
        }

        const layer = yield* StoreUtils.Handler.doSelectorWithThrow(GetLayerHtmlById(instanceId, element.layer));
        /* istanbul ignore if */
        if (!layer) {
            return;
        }

        dialogMap.delete(elementId);
        layer.removeChild(element.element);

        yield* StoreUtils.Handler.doAction(RefreshLayerDisplayState(instanceId, element.layer));

        return elementId;
    })
    .withReducer(function (state, elementId) {
        if (elementId) {
            return StoreUtils.State.getNewState(
                state,
                ["dialogs"],
                state.dialogs.filter((value) => value !== elementId),
            );
        }
        return state;
    });
