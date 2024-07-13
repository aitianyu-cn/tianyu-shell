/**@format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreBaseConfigure } from "../declares/Core";
import { ITianyuShell } from "../declares/Declare";
import { TianyuShellInfraInterface, TianyuShellInfraInstanceId } from "../TianyushellInfraInterfaceExpose";
import { getStore } from "../utils/Store";

declare const navigator: any;

function _isMobile(): boolean {
    // to check the user agent data in Edge
    if (navigator.userAgentData?.mobile) {
        return true;
    }

    const sUserAgent = navigator.userAgent.toLowerCase();

    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    const bIsMidp = sUserAgent.match(/midp/i) == "midp";
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    }

    return false;
}

function _isIOS(): boolean {
    const sUserAgent = navigator.userAgent.toLowerCase();

    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

    return bIsIpad || bIsIphoneOs;
}

function _isMacOS(): boolean {
    const sUserAgent = navigator.userAgent.toLowerCase();

    const bIsMacOS = sUserAgent.match(/mac os x/i) == "mac os x";

    return bIsMacOS;
}

function _initTianyuShellRuntime(): void {
    const coreConf = getStore().selecte(TianyuShellInfraInterface.getCoreConfigure(TianyuShellInfraInstanceId));
    const configure = coreConf instanceof Missing ? {} : coreConf;

    // init core configure
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.configure) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                configure: {
                    ...configure,
                    isMobile: _isMobile(),
                    isIOS: _isIOS(),
                    isMac: _isMacOS(),
                },
            },
        };
    }
}

_initTianyuShellRuntime();

/** IOS Runtime flag */
export const isIOS: boolean = ((window as any).tianyuShell as ITianyuShell).core.configure.isIOS;
/** IOS Runtime flag */
export const isMobile: boolean = ((window as any).tianyuShell as ITianyuShell).core.configure.isMobile;
/** Mac OS Runtime flag */
export const isMac: boolean = ((window as any).tianyuShell as ITianyuShell).core.configure.isMac;
/** Tianyu Shell Configure */
export const Runtime: ITianyuShellCoreBaseConfigure = ((window as any).tianyuShell as ITianyuShell).core.configure;
