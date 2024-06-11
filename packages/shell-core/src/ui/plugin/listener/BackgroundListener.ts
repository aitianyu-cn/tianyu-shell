/** @format */

import { Missing, ListenerFactor } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { getBackgroundInstanceId } from "../../tools/InstanceHelper";
import { VERY_DEFAULT_COLOR } from "../handler/BackgroundHandler";
import { BackgroundInterface, BackgroundListenerExpose } from "../interface/BackgroundInterfaceExpose";
import { IBackgroundInfo } from "../interface/state/BackgroundState";

function onBackgroundChanged(oldState: IBackgroundInfo | undefined, newState: IBackgroundInfo | undefined): void {
    const store = getStore();
    const instanceId = getBackgroundInstanceId();

    const layerId = store.selecte(BackgroundInterface.control.getId(instanceId));
    if (layerId instanceof Missing) {
        return;
    }

    const backgroundLayer = document.getElementById(layerId);
    if (!backgroundLayer) {
        return;
    }

    if (oldState?.elementId !== newState?.elementId) {
        if (oldState?.elementId) {
            const oldElement = store.selecte(BackgroundInterface.html.current(instanceId, oldState.elementId));
            if (oldElement && !(oldElement instanceof Missing)) {
                backgroundLayer.removeChild(oldElement);
            }
        }

        if (newState?.elementId) {
            const newElement = store.selecte(BackgroundInterface.html.current(instanceId, newState.elementId));
            if (newElement && !(newElement instanceof Missing)) {
                backgroundLayer.appendChild(newElement);
            }
        }
    }

    if (oldState?.color !== newState?.color) {
        backgroundLayer.style.background = newState?.color || VERY_DEFAULT_COLOR;
    }
}

export const BackgroundChangedListener = ListenerFactor.createListener(
    BackgroundListenerExpose.control.getBackground(getBackgroundInstanceId()),
    onBackgroundChanged,
);
