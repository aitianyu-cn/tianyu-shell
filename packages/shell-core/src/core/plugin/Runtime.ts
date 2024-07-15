/**@format */

import { ITianyuShell } from "../declares/Declare";

/** IOS Runtime flag */
export function isIOS(): boolean {
    return ((window as any).tianyuShell as ITianyuShell).core.configure?.isIOS;
}
/** IOS Runtime flag */
export function isMobile(): boolean {
    return ((window as any).tianyuShell as ITianyuShell).core.configure?.isMobile;
}
/** Mac OS Runtime flag */
export function isMac(): boolean {
    return ((window as any).tianyuShell as ITianyuShell).core.configure?.isMac;
}
