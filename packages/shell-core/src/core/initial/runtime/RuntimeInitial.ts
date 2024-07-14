/**@format */

import { AutomaticStorage } from "../../common/AutomaticStorage";
import { ITianyuShell } from "../../declares/Declare";
import { ITianyuShellGlobalCache } from "../../declares/IStorage";

export function initTianyuShellGlobalCache(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.runtime?.cache) {
        const storage = new AutomaticStorage();
        const globalStorage: ITianyuShellGlobalCache = {
            watchDog: storage,
            storage: storage,
        };

        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            runtime: {
                ...((windowObj.tianyuShell as ITianyuShell)?.runtime || {}),
                cache: globalStorage,
            },
        };
    }
}
