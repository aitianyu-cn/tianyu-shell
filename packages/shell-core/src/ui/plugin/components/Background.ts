/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { getBackgroundInstanceId } from "../../tools/InstanceHelper";
import { ListenerFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { BackgroundInterface } from "../interface/BackgroundInterfaceExpose";
import { TianyuShellUIBackgroundZIndex } from "../../common/Declare";
import { ITianyuShellCoreUIBackground } from "shell-core/src/core/declares/ui/UserInterface";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { IBackgroundInfo } from "../interface/state/BackgroundState";
import { StoreType } from "../interface/StoreTypes";

const VERY_DEFAULT_COLOR = "#ffffff";

function initLayout(): void {
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

let listener = null;

const backgroundGlobalAPI: ITianyuShellCoreUIBackground = {
    setColor: (color: string) =>
        void getStore().dispatch(BackgroundInterface.color.set(getBackgroundInstanceId(), color)),
    getColor: () => {
        const color = getStore().selecte(BackgroundInterface.color.get(getBackgroundInstanceId()));
        return color instanceof Missing ? VERY_DEFAULT_COLOR : color;
    },
    removeColor: () => void getStore().dispatch(BackgroundInterface.color.remove(getBackgroundInstanceId())),

    setElement: (element: HTMLElement, id?: string) =>
        void getStore().dispatch(BackgroundInterface.html.set(getBackgroundInstanceId(), { element, id })),
    removeElement: () => void getStore().dispatch(BackgroundInterface.html.clear(getBackgroundInstanceId())),
    clear: () => void getStore().dispatch(BackgroundInterface.control.reset(getBackgroundInstanceId())),
};

export async function initTianyuShellCoreUIBackground(): Promise<void> {
    const windowObj = window as any;
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.background) {
        return;
    }

    const store = getStore();
    const instanceId = getBackgroundInstanceId();

    store.registerInterface(StoreType.BACKGROUND_STORE_TYPE, BackgroundInterface);

    await store.dispatch(
        StoreUtils.createBatchAction([
            BackgroundInterface.core.creator(instanceId),
            BackgroundInterface.control.externalCreator(instanceId),
        ]),
    );

    listener = ListenerFactor.createListener(
        BackgroundInterface.control.getBackground(getBackgroundInstanceId()),
        onBackgroundChanged,
    );
    store.startListen(listener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                background: backgroundGlobalAPI,
            },
        },
    };

    initLayout();
}
