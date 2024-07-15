/**@format */

import { CallbackAction } from "@aitianyu.cn/types";
import { ITianyuShellInitial } from "./ITianyuShellInitial";
import { internationalLoader } from "./initial/loader/I18nLoader";
import { storeCoreLoader } from "./initial/loader/StoreInitial";
import { storeAPILoader } from "./initial/loader/StoreAPILoader";
import { handlerLoader } from "./initial/loader/HandlerLoader";
import { globalFeatureLoader } from "./initial/loader/GlobalFeatureLoader";
import { shellEnvHandler } from "./initial/ShellEnvHandler";

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
    shellEnvHandler();

    let initialPromise = Promise.resolve();
    initialPromise = initialPromise.then(async () => internationalLoader());
    initialPromise = initialPromise.then(async () => storeCoreLoader());
    initialPromise = initialPromise.then(async () => storeAPILoader(config || {}));
    initialPromise = initialPromise.then(async () => handlerLoader(config || {}));
    initialPromise = initialPromise.then(async () => globalFeatureLoader(config || {}));

    return initialPromise;
}
