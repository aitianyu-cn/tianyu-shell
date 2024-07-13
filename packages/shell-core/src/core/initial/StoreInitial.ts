/** @format */

import { Log } from "@aitianyu.cn/types";
import { TIANYU_SEHLL_STORE_FRIENDLY_NAME } from "../declares/Core";
import { ITianyuShell } from "../declares/Declare";

export async function loadingTianyuStore(): Promise<void> {
    try {
        const windowObj = window as any;
        if (!(windowObj.tianyuShell as ITianyuShell)?.runtime?.store) {
            const { createStore, StoreHelper, TianyuStoreEntityInterfaceExpose, TIANYU_STORE_ENTITY_CORE } =
                await import(/*webpackChunkName: "aitianyu.cn/tianyu-store" */ "@aitianyu.cn/tianyu-store");
            const redoUndoSupportedInstanceId = StoreHelper.generateStoreInstanceId();
            const unReodoUndoInstanceId = StoreHelper.generateStoreInstanceId();
            const genericInstanceId = StoreHelper.generateStoreInstanceId();

            const tianyuStore = createStore({ friendlyName: TIANYU_SEHLL_STORE_FRIENDLY_NAME });
            await tianyuStore.dispatch(
                TianyuStoreEntityInterfaceExpose[TIANYU_STORE_ENTITY_CORE].core.creator(genericInstanceId),
            );
            await tianyuStore.dispatch(
                TianyuStoreEntityInterfaceExpose[TIANYU_STORE_ENTITY_CORE].core.creator(redoUndoSupportedInstanceId),
            );
            await tianyuStore.dispatch(
                TianyuStoreEntityInterfaceExpose[TIANYU_STORE_ENTITY_CORE].core.creator(unReodoUndoInstanceId, {
                    redoUndo: false,
                }),
            );

            (windowObj.tianyuShell as ITianyuShell) = {
                ...(windowObj.tianyuShell || {}),
                runtime: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.runtime || {}),
                    store: {
                        store: tianyuStore,
                        instanceId: genericInstanceId,
                        histroyInstance: redoUndoSupportedInstanceId,
                        nonHisInstance: unReodoUndoInstanceId,
                    },
                },
            };
        }
    } catch (e) {
        Log.error((e as any)?.message || "error loading tianyu shell ui core");
        return Promise.reject();
    }
}
