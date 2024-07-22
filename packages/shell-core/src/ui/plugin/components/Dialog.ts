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
