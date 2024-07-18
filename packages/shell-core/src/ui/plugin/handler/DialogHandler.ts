/** @format */

import { TianyuShellUIDialogZIndex } from "../../common/Declare";

export function generateDialogLayerBase(id: string, index: number): HTMLElement {
    const dialogLayer = document.createElement("div");
    dialogLayer.id = id;
    dialogLayer.style.zIndex = `${TianyuShellUIDialogZIndex + index * 100}`;
    dialogLayer.classList.add("tys_basic_layer_styling", "tys_dialog_layer_styling", "tys_common_view_hidden");
    document.body.appendChild(dialogLayer);

    return dialogLayer;
}
