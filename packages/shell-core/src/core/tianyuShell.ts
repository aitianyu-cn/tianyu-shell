/**@format */

import { CallbackAction } from "@aitianyu.cn/types";
import { ITianyuShellInitial } from "./ITianyuShellInitial";
import { getStore } from "./utils/Store";

/**
 * Initial Tianyu Shell runtime from configuration.
 *
 * @param config tianyu shell initial configuration.
 * @param callback the callback function when the tianyu shell is initial done.
 */
export function initialTianyuShell(config?: ITianyuShellInitial, callback?: CallbackAction): void {
    initialTianyuShellAsync(config).finally(callback);
}

/**
 * Initial Tianyu Shell runtime from configuration.
 *
 * @param config tianyu shell initial configuration.
 * @param callback the callback function when the tianyu shell is initial done.
 */
export async function initialTianyuShellAsync(config?: ITianyuShellInitial): Promise<void> {
    // to check the initialization is done to avoid initial agian
    if ((window as any).tianyuShell?.env?.initial) {
        return Promise.resolve();
    }

    // to save tianyu-shell env
    (window as any).tianyuShell = {
        ...(window as any).tianyuShell,
        env: {
            ...((window as any).tianyuShell?.env || {}),
            initial: true,
        },
    };

    let initialPromise = Promise.resolve();

    initialPromise = initialPromise.then(async () => {
        const { loadI18n } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/loader" */ "infra/resource/MessageLoader"
        );
        const { loadingTianyuStore } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/loader" */ "./initial/StoreInitial"
        );
        await loadI18n();
        await loadingTianyuStore();

        const { TianyuShellInfraInterface, TianyuShellInfraInstanceId, TIANYU_SHELL_INFRA_STORE_TYPE } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/infra" */ "./TianyushellInfraInterfaceExpose"
        );
        getStore().registerInterface(TIANYU_SHELL_INFRA_STORE_TYPE, TianyuShellInfraInterface);
        await getStore().dispatch(TianyuShellInfraInterface.core.creator(TianyuShellInfraInstanceId, config || {}));
    });

    initialPromise = initialPromise.then(async () => {
        const { TianyuShellCoreInterface, TianyuShellCoreInstanceId } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "./plugin/store/Exports"
        );
        await getStore().dispatch(TianyuShellCoreInterface.core.creator(TianyuShellCoreInstanceId));
    });

    if (config?.runtime?.globalCache) {
        initialPromise = initialPromise.then(async () => {
            const { initTianyuShellGlobalCache } = await import(
                /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "./initial/RuntimeInitial"
            );
            initTianyuShellGlobalCache();
        });
    }

    initialPromise = initialPromise.then(async () => {
        const { compatibilityLoader } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "./initial/CompatibilityLoader"
        );
        await compatibilityLoader();
    });

    return initialPromise;
}
