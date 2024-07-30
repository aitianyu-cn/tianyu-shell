/** @format */

import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { MajorTianyuUI } from "../types/MajorTianyuUI";
import { createHTMLbyTianyuUI } from "./Creator";
import { TianyuUIGenerateNotSupportException } from "../../common/UIException";
import { getMajorInstanceId } from "../../tools/InstanceHelper";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorInterface } from "../interface/MajorInterfaceExpose";
import { TianyuShellUIMajorZIndex } from "../../common/Declare";
import { Missing } from "@aitianyu.cn/tianyu-store";

export function generateMajorElement(
    element: HTMLElement | TianyuUI | string,
    notCreate?: boolean,
): HTMLElement | null {
    if (element instanceof MajorTianyuUI) {
        if (notCreate) {
            return document.getElementById(element.id);
        }
        return createHTMLbyTianyuUI(element);
    } else if (element instanceof HTMLElement) {
        return element;
    } else if (typeof element === "string") {
        return document.getElementById(element);
    } else {
        throw new TianyuUIGenerateNotSupportException(`${element}`);
    }
}

export function initMajorLayout(): void {
    const store = getStore();
    const instanceId = getMajorInstanceId();

    const layerId = store.selecte(MajorInterface.layer.getId(instanceId));
    const majorLayer = document.createElement("div");
    majorLayer.style.zIndex = `${TianyuShellUIMajorZIndex}`;
    majorLayer.style.position = "absolute";
    majorLayer.style.width = "100%";
    majorLayer.style.height = "100%";
    majorLayer.id = layerId instanceof Missing ? "" : layerId;
    document.body.appendChild(majorLayer);
}
