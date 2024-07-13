/**@format */

import { ITianyuShell, TianyuShellGenericEventCallback } from "../declares/Declare";
import { getStore } from "../utils/Store";
import { StoreUtils, Unsubscribe } from "@aitianyu.cn/tianyu-store";
import { TianyuShellCoreInstanceId, TianyuShellCoreInterface } from "./store/Exports";
import { isMobile } from "./Runtime";

function _onLoaded(): void {
    getStore().dispatchForView(
        StoreUtils.createBatchAction([TianyuShellCoreInterface.event.action.onLoaded(TianyuShellCoreInstanceId)]),
    );
}

function _onHashChanged(ev?: HashChangeEvent): void {
    const hash = (window.location.hash as string).substring(1);
    getStore().dispatch(TianyuShellCoreInterface.event.action.onHaschange(TianyuShellCoreInstanceId, hash));
}

// set a invoke shake to record timer
let _eventInvokeShake: number = -1;
function _onPageResized(ev?: UIEvent): void {
    if (_eventInvokeShake !== -1) {
        return;
    }

    // use set timeout to avoid page resizing shake
    _eventInvokeShake = window.setTimeout(() => {
        void getStore().dispatch(
            TianyuShellCoreInterface.event.action.onPageResize(
                TianyuShellCoreInstanceId,
                isMobile ? window.outerWidth : window.innerWidth,
            ),
        );

        _eventInvokeShake = -1;
    }, 50);
}

function _initTianyuShellEvent(): void {
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
        document.body.onload = _onLoaded;
        window.onhashchange = _onHashChanged;
        document.body.onresize = _onPageResized;
    }
}
_initTianyuShellEvent();

/** Tianyu Shell Event */
export class Event {
    /**
     * Setup a listener when page loaded
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenLoaded(callback: TianyuShellGenericEventCallback<boolean>): Unsubscribe {
        return getStore().subscribe(
            TianyuShellCoreInterface.event.select.isLoaded(TianyuShellCoreInstanceId),
            callback,
        );
    }

    /**
     * Setup a listener when hash changed
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenHashChanged(callback: TianyuShellGenericEventCallback<string>): Unsubscribe {
        return getStore().subscribe(TianyuShellCoreInterface.event.select.getHash(TianyuShellCoreInstanceId), callback);
    }

    /**
     * Setup a listener when page resized
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenPageResize(callback: TianyuShellGenericEventCallback<number>): Unsubscribe {
        return getStore().subscribe(
            TianyuShellCoreInterface.event.select.getPageSize(TianyuShellCoreInstanceId),
            callback,
        );
    }
}
