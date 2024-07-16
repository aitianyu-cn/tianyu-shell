/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { CookieImpl } from "../impl/CookieImpl";

export function initTianyuShellCookie(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.cookie) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || /* istanbul ignore next */ {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || /* istanbul ignore next */ {}),
                cookie: CookieImpl,
            },
        };
    }
}
