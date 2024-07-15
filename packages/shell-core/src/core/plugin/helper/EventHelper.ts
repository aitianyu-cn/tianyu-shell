/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { getStore } from "../../utils/Store";
import { isMobile } from "../Runtime";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "../store/Exports";

export function onLoaded(): void {
    getStore().dispatchForView(
        StoreUtils.createBatchAction([TianyuShellCoreInterface.event.action.onLoaded(getTianyuShellCoreInstanceId())]),
    );
}

export function onHashChanged(ev?: HashChangeEvent): void {
    const hash = (window.location.hash as string).substring(1);
    getStore().dispatch(TianyuShellCoreInterface.event.action.onHaschange(getTianyuShellCoreInstanceId(), hash));
}

// set a invoke shake to record timer
let _eventInvokeShake: number = -1;
export function onPageResized(ev?: UIEvent): void {
    if (_eventInvokeShake !== -1) {
        return;
    }

    // use set timeout to avoid page resizing shake
    _eventInvokeShake = window.setTimeout(() => {
        void getStore().dispatch(
            TianyuShellCoreInterface.event.action.onPageResize(
                getTianyuShellCoreInstanceId(),
                isMobile() ? window.outerWidth : window.innerWidth,
            ),
        );

        _eventInvokeShake = -1;
    }, 50);
}
