/**@format */

import { CallbackAction } from "@aitianyu.cn/types";
import { ITianyuShellInitial } from "./ITianyuShellInitial";
import { internationalLoader } from "./initial/loader/I18nLoader";
import { storeCoreLoader } from "./initial/loader/StoreInitial";
import { storeAPILoader } from "./initial/loader/StoreAPILoader";
import { handlerLoader } from "./initial/loader/HandlerLoader";
import { globalFeatureLoader } from "./initial/loader/GlobalFeatureLoader";
import { shellEnvHandler } from "./initial/ShellEnvHandler";
import { loadingTianyuShellUICore } from "../ui/plugin/CoreResolve";

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
    if (!(window as any).tianyuShell?.env?.initial) {
        shellEnvHandler();

        await internationalLoader();
        await storeCoreLoader();
        await storeAPILoader(config || {});
        await handlerLoader(config || {});
        await globalFeatureLoader(config || {});

        if (config?.ui?.core?.support) {
            await loadingTianyuShellUICore();
        }
    }
}
