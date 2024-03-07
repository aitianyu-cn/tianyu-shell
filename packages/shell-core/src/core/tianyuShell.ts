/**@format */

import { CallbackAction } from "@aitianyu.cn/types";
import { ITianyuShellInitial } from "./ITianyuShellInitial";

/**
 * Initial Tianyu Shell runtime from configuration.
 *
 * @param config tianyu shell initial configuration.
 * @param callback the callback function when the tianyu shell is initial done.
 */
export function initialTianyuShell(config?: ITianyuShellInitial, callback?: CallbackAction): void {
    // to check the initialization is done to avoid initial agian
    if ((window as any).tianyuShell?.env?.initial) {
        callback?.();
        return;
    }

    (window as any).tianyuShell = {
        ...(window as any).tianyuShell,
        env: {
            ...((window as any).tianyuShell?.env || {}),
            config: {
                ...((window as any).tianyuShell?.env?.config || {}),
                ...config,
                initial: true,
            },
        },
    };

    // to initialize common utils
    const initializePromise = new Promise<void>((resolve) => {
        if (config?.runtime?.globalCache) {
            require.ensure(
                [],
                async () => {
                    try {
                        const { initTianyuShellGlobalCache } = require("./utils/RuntimeInitial");
                        const { compatibilityLoader } = require("./utils/CompatibilityLoader");

                        await compatibilityLoader();
                        initTianyuShellGlobalCache();
                    } finally {
                        resolve();
                    }
                },
                "tianyu-shell/runtime",
            );
        } else {
            resolve();
        }
    });

    initializePromise.finally(() => {
        callback?.();
    });
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

    (window as any).tianyuShell = {
        ...(window as any).tianyuShell,
        env: {
            ...((window as any).tianyuShell?.env || {}),
            config: {
                ...((window as any).tianyuShell?.env?.config || {}),
                ...config,
            },
            initial: true,
        },
    };

    // to initialize common utils
    const initializePromise = new Promise<void>((resolve) => {
        if (config?.runtime?.globalCache) {
            require.ensure(
                [],
                async () => {
                    try {
                        const { initTianyuShellGlobalCache } = require("./utils/RuntimeInitial");
                        const { compatibilityLoader } = require("./utils/CompatibilityLoader");

                        await compatibilityLoader();
                        initTianyuShellGlobalCache();
                    } finally {
                        resolve();
                    }
                },
                "tianyu-shell/runtime",
            );
        } else {
            resolve();
        }
    }).catch(() => {
        return Promise.resolve();
    });

    return initializePromise;
}
