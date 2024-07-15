/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { CookieImpl } from "../impl/CookieImpl";

export function initTianyuShellCookie(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.cookie) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                cookie: CookieImpl,
            },
        };
    }
}
