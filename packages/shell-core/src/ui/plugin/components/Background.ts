/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { getBackgroundInstanceId } from "../../tools/InstanceHelper";
import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { BackgroundInterface } from "../interface/BackgroundInterfaceExpose";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { StoreType } from "../interface/StoreTypes";
import { initLayout } from "../handler/MessageHandler";
import { BackgroundChangedListener } from "../listener/BackgroundListener";
import { BackgroundGlobalAPI } from "../apis/BackgroundAPIs";

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

    store.startListen(BackgroundChangedListener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                background: BackgroundGlobalAPI,
            },
        },
    };

    initLayout();
}
