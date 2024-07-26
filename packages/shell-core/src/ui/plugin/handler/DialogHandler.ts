/** @format */

import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { TianyuShellUIDialogPreious, TianyuShellUIDialogZIndex } from "../../common/Declare";
import { IDialogInstance } from "../interface/state/DialogState";
import { createHTMLbyTianyuUI } from "./Creator";
import { DialogBase } from "../types/DialogBase";
import { guid } from "@aitianyu.cn/types";
import { getStore } from "shell-core/src/core/utils/Store";
import { getDialogInstanceId } from "../../tools/InstanceHelper";
import { DialogInterface } from "../interface/DialogInterfaceExpose";
import { StoreUtils } from "@aitianyu.cn/tianyu-store";

export function generateDialogLayerBase(id: string, index: number): HTMLElement {
    const dialogLayer = document.createElement("div");
    dialogLayer.id = id;
    dialogLayer.style.zIndex = `${TianyuShellUIDialogZIndex + index * 100}`;
    dialogLayer.classList.add("tys_basic_layer_styling", "tys_dialog_layer_styling", "tys_common_view_hidden");
    document.body.appendChild(dialogLayer);

    return dialogLayer;
}

export function generateDialogElement(elementDef: IDialogInstance): HTMLElement {
    const renderElement =
        typeof elementDef.element === "string"
            ? new DialogBase(
                  elementDef.id,
                  elementDef.element,
                  elementDef.button,
                  elementDef.type,
                  elementDef.close,
                  elementDef.callback,
              ).render()
            : createHTMLbyTianyuUI(elementDef.element);

    return renderElement;
}

export async function initDialogLayout(): Promise<string> {
    const layerId = `${TianyuShellUIDialogPreious}_${guid()}`;
    await getStore().dispatch(
        StoreUtils.createBatchAction([
            DialogInterface.layer.add(getDialogInstanceId(), layerId),
            DialogInterface.layer.switch(getDialogInstanceId(), layerId),
        ]),
    );
    return layerId;
}
