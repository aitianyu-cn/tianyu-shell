/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { onLoaded, onHashChanged, onPageResized } from "../helper/EventHelper";

export function initTianyuShellEvent(): void {
    const windowObj = window as any;
    if (!(windowObj.tianyuShell as ITianyuShell)?.core?.event) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                event: true,
            },
        };

        // register page events
        document.body.onload = onLoaded;
        window.onhashchange = onHashChanged;
        document.body.onresize = onPageResized;
    }
}
