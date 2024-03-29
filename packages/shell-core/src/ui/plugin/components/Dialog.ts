/**@format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import {
    ITianyuShellCoreUIDialog,
    ITianyuShellCoreUIDialogLayer,
    ITianyuShellUIDialogCallbackValue,
    TianyuShellUIDialogButtons,
    TianyuShellUIDialogType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { TianyuShellUIDialogPreious, TianyuShellUIDialogZIndex } from "../../common/Declare";
import { CallbackActionT, guid } from "@aitianyu.cn/types";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { DialogBase } from "../types/DialogBase";
import { createHTMLbyTianyuUI } from "../handler/Creator";

interface IDialogContent {
    id: string;
    layers: { id: string; layer: HTMLElement }[];
    current: string;
    dialog: Map<string, { layer: string; element: HTMLElement }>;
}

const _dialogContent: IDialogContent = {
    id: "",
    layers: [],
    current: "",
    dialog: new Map<string, { layer: string; element: HTMLElement }>(),
};

const _generateLayerBase = (id: string): HTMLElement => {
    const dialogLayer = document.createElement("div");
    dialogLayer.id = id;
    dialogLayer.style.zIndex = `${TianyuShellUIDialogZIndex + _dialogContent.layers.length * 100}`;
    dialogLayer.classList.add("tys_basic_layer_styling", "tys_dialog_layer_styling", "tys_common_view_hidden");
    document.body.appendChild(dialogLayer);

    return dialogLayer;
};

const _createLayer = (id?: string): string => {
    const layerId = id || guid();
    const layerHTML = _generateLayerBase(layerId);
    _dialogContent.layers.push({ id: layerId, layer: layerHTML });

    return layerId;
};

const _findLayerFromContent = (id: string): { id: string; layer: HTMLElement } | undefined => {
    return _dialogContent.layers.find((value) => {
        return value.id === id;
    });
};

const _freshLayerShownState = (id: string): void => {
    const layer = _findLayerFromContent(id);
    if (!layer) {
        return;
    }

    let layerDialogCount = 0;
    _dialogContent.dialog.forEach((value) => {
        if (value.layer === id) {
            layerDialogCount++;
        }
    });

    if (layerDialogCount > 0) {
        layer.layer.classList.remove("tys_common_view_hidden");
        layer.layer.classList.add("tys_common_view_show");
    } else {
        layer.layer.classList.remove("tys_common_view_show");
        layer.layer.classList.add("tys_common_view_hidden");
    }
};

function _count(): number {
    return _dialogContent.layers.length;
}
function _create(): string | null {
    if (_dialogContent.layers.length === 10) {
        return null;
    }

    return _createLayer();
}
function _layers(): string[] {
    return _dialogContent.layers.map((value) => {
        return value.id;
    });
}
function _switch(layerId: string): void {
    if (_dialogContent.id === layerId) {
        return;
    }

    const layer = _findLayerFromContent(layerId);
    if (layer) {
        _dialogContent.current = layer.id;
    }
}
function _remove(layerId: string): void {
    // the basic layer is not support to delete
    if (layerId === _dialogContent.id) {
        return;
    }
    const index = _dialogContent.layers.findIndex((value) => {
        return value.id === layerId;
    });
    if (-1 === index) {
        return;
    }

    const removedItem = _dialogContent.layers[index];
    for (let i = index; index < _dialogContent.layers.length - 1; ++i) {
        _dialogContent.layers[index] = _dialogContent.layers[index + 1];
        _dialogContent.layers[index].layer.style.zIndex = `${TianyuShellUIDialogZIndex + index * 100}`;
    }
    _dialogContent.layers.pop();

    document.body.removeChild(removedItem.layer);

    if (_dialogContent.current === layerId) {
        // switch default layer

        // if removed item is end of origin layers
        // to set to pre-one
        // otherwise set the next one
        _dialogContent.current =
            _dialogContent.layers[index === _dialogContent.layers.length ? _dialogContent.layers.length - 1 : index].id;
    }
}
function _current(): string {
    return _dialogContent.current;
}
function _index(): number {
    return _dialogContent.layers.findIndex((value) => {
        return value.id === _dialogContent.current;
    });
}

function _open(
    element: TianyuUI | string,
    button?: TianyuShellUIDialogButtons,
    type?: TianyuShellUIDialogType,
    close?: boolean,
    callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue>,
): string {
    const elementId = guid();
    const renderElement =
        typeof element === "string"
            ? new DialogBase(elementId, element, button, type, close, callback).render()
            : createHTMLbyTianyuUI(element);

    const layer = _findLayerFromContent(_dialogContent.current);
    if (layer) {
        layer.layer.appendChild(renderElement);
        _dialogContent.dialog.set(elementId, { layer: layer.id, element: renderElement });

        _freshLayerShownState(layer.id);

        return elementId;
    }

    return "";
}
function _close(id: string): void {
    const dialog = _dialogContent.dialog.get(id);
    if (dialog) {
        const layer = _findLayerFromContent(dialog.layer);
        if (layer) {
            layer.layer.removeChild(dialog.element);
            _dialogContent.dialog.delete(id);
            _freshLayerShownState(layer.id);
        }
    }
}
function _isOpen(id?: string): boolean {
    return id ? _dialogContent.dialog.has(id) : _dialogContent.dialog.size > 0;
}

const _dialogLayer: ITianyuShellCoreUIDialogLayer = {
    count: _count,
    create: _create,
    layers: _layers,
    switch: _switch,
    remove: _remove,
    current: _current,
    index: _index,
};

const _dialog: ITianyuShellCoreUIDialog = {
    layer: _dialogLayer,
    open: _open,
    close: _close,
    isOpen: _isOpen,
};

function __init_dialog_layer_base(): void {
    _dialogContent.id = `${TianyuShellUIDialogPreious}_${guid()}`;

    _createLayer(_dialogContent.id);
    const dialogLayer = _findLayerFromContent(_dialogContent.id);

    if (dialogLayer) {
        _dialogContent.current = dialogLayer.id;
    }
}

export function initTianyuShellCoreUIDialog(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.dialog) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    dialog: _dialog,
                },
            },
        };

        __init_dialog_layer_base();
    }
}
