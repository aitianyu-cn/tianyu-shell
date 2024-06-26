/**@format */

import { ITianyuShell } from "shell-core";
import { Log } from "shell-core/src/core/plugin/Console";

function fnInitHtmlBasic(): void {
    const htmlPageScale = document.createElement("meta");
    htmlPageScale.name = "viewport";
    htmlPageScale.content = "width=device-width,initial-scale=1,shrink-to-fit=no";

    document.head.appendChild(htmlPageScale);
}

export async function loadingTianyuShellCore(): Promise<void> {
    try {
        const { initTianyuShellCoreUIStyling } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/core" */ "./components/StylingResolve"
        );
        const { initTianyuShellCoreUIMessage } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Message"
        );
        const { initTianyuShellCoreUIDialog } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Dialog"
        );
        const { initTianyuShellCoreUIBackground } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Background"
        );
        const { initTianyuShellCoreUIMajor } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Major"
        );
        const { staticLoader } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/resources" */ "../resources/Loader"
        );

        await initTianyuShellCoreUIStyling();
        await initTianyuShellCoreUIMessage();
        initTianyuShellCoreUIDialog();
        await initTianyuShellCoreUIBackground();
        initTianyuShellCoreUIMajor();

        staticLoader();

        fnInitHtmlBasic();
    } catch (e) {
        Log.error((e as any)?.message || "error loading tianyu shell ui core");
        return Promise.reject();
    }
}

export async function loadingTianyuStore(): Promise<void> {
    try {
        const windowObj = window as any;
        if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.store) {
            const { createStore, StoreHelper, TianyuStoreEntityInterfaceExpose, TIANYU_STORE_ENTITY_CORE } =
                await import(/*webpackChunkName: "aitianyu.cn/tianyu-store" */ "@aitianyu.cn/tianyu-store");
            const redoUndoSupportedInstanceId = StoreHelper.generateStoreInstanceId();
            const unReodoUndoInstanceId = StoreHelper.generateStoreInstanceId();
            const genericInstanceId = StoreHelper.generateStoreInstanceId();

            const tianyuStore = createStore();
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
                core: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                    ui: {
                        ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                        store: {
                            store: tianyuStore,
                            instanceId: genericInstanceId,
                            histroyInstance: redoUndoSupportedInstanceId,
                            nonHisInstance: unReodoUndoInstanceId,
                        },
                    },
                },
            };
        }
    } catch (e) {
        Log.error((e as any)?.message || "error loading tianyu shell ui core");
        return Promise.reject();
    }
}
