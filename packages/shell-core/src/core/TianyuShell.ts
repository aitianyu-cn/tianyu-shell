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
        await loadI18n();
    });

    initialPromise = initialPromise.then(async () => {
        const { loadingTianyuStore } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/store" */ "./initial/StoreInitial"
        );
        await loadingTianyuStore();
    });

    initialPromise = initialPromise.then(async () => {
        const { TIANYU_SHELL_INFRA_STORE_TYPE } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "./declares/Constant"
        );
        const { TianyuShellInfraInterface, TianyuShellInfraInstanceId } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "./initial/store-api/TianyushellInfraInterfaceExpose"
        );
        getStore().registerInterface(TIANYU_SHELL_INFRA_STORE_TYPE, TianyuShellInfraInterface);

        await getStore().dispatch(TianyuShellInfraInterface.core.creator(TianyuShellInfraInstanceId, config || {}));
        const { TianyuShellCoreInterface, TianyuShellCoreInstanceId } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "./plugin/store/Exports"
        );
        await getStore().dispatch(TianyuShellCoreInterface.core.creator(TianyuShellCoreInstanceId));
    });

    initialPromise = initialPromise.then(async () => {
        if (config?.runtime?.globalCache) {
            const { initTianyuShellGlobalCache } = await import(
                /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "./initial/runtime/RuntimeInitial"
            );
            initTianyuShellGlobalCache();
        }

        const { compatibilityLoader } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "./initial/runtime/CompatibilityLoader"
        );
        await compatibilityLoader();
    });

    return initialPromise;
}
