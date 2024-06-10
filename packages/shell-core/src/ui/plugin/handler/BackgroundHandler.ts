/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { TianyuShellUIBackgroundZIndex } from "../../common/Declare";
import { getBackgroundInstanceId } from "../../tools/InstanceHelper";
import { BackgroundInterface } from "../interface/BackgroundInterfaceExpose";

export const VERY_DEFAULT_COLOR = "#ffffff";

export function initLayout(): void {
    const store = getStore();
    const instanceId = getBackgroundInstanceId();

    const layerId = store.selecte(BackgroundInterface.control.getId(instanceId));
    const color = store.selecte(BackgroundInterface.color.get(instanceId));

    const backgroundLayer = document.createElement("div");
    backgroundLayer.style.zIndex = `${TianyuShellUIBackgroundZIndex}`;
    backgroundLayer.style.background = color instanceof Missing ? VERY_DEFAULT_COLOR : color;
    backgroundLayer.classList.add("tys_basic_layer_styling", "tys_background_layer_styling");
    backgroundLayer.id = layerId instanceof Missing ? "" : layerId;
    document.body.appendChild(backgroundLayer);
}
