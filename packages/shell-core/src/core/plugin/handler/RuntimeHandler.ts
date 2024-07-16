/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { getIsMacOS, getIsMobile, getIsIOS } from "../helper/RuntimeHelper";

export function initTianyuShellRuntime(): void {
    // init core configure
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.configure) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || /* istanbul ignore next */ {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || /* istanbul ignore next */ {}),
                configure: {
                    isMobile: getIsMobile(),
                    isIOS: getIsIOS(),
                    isMac: getIsMacOS(),
                },
            },
        };
    }
}
