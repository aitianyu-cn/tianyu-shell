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
        const { initTianyuShellCoreUIStyle } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/core" */ "./components/Style"
        );
        const { initTianyuShellCoreUITheme } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/core" */ "./components/Theme"
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

        initTianyuShellCoreUITheme();
        initTianyuShellCoreUIMessage();
        initTianyuShellCoreUIStyle();
        initTianyuShellCoreUIDialog();
        initTianyuShellCoreUIBackground();
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
            const { createStore, StoreHelper, TianyuStoreEntityInterfaceExpose, TIANYU_STORE_ENTITY_CORE } = await import(
                /*webpackChunkName: "aitianyu.cn/tianyu-store" */ "@aitianyu.cn/tianyu-store"
            );
            const instanceId = StoreHelper.generateStoreInstanceId();

            const tianyuStore = createStore();
            await tianyuStore.dispatch(TianyuStoreEntityInterfaceExpose[TIANYU_STORE_ENTITY_CORE].core.creator(instanceId));

            (windowObj.tianyuShell as ITianyuShell) = {
                ...(windowObj.tianyuShell || {}),
                core: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                    ui: {
                        ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                        store: {
                            store: tianyuStore,
                            instanceId,
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
