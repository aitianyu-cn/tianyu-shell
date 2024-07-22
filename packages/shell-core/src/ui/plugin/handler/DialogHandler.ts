/** @format */

import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { TianyuShellUIDialogZIndex } from "../../common/Declare";
import { IDialogInstance } from "../interface/state/DialogState";
import { createHTMLbyTianyuUI } from "./Creator";
import { DialogBase } from "../types/DialogBase";

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
