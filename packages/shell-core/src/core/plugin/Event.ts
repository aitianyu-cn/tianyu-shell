/**@format */

import { TianyuShellGenericEventCallback } from "../declares/Declare";
import { getStore } from "../utils/Store";
import { Unsubscribe } from "@aitianyu.cn/tianyu-store";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "./store/Exports";

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
            TianyuShellCoreInterface.event.select.isLoaded(getTianyuShellCoreInstanceId()),
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
        return getStore().subscribe(
            TianyuShellCoreInterface.event.select.getHash(getTianyuShellCoreInstanceId()),
            callback,
        );
    }

    /**
     * Setup a listener when page resized
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenPageResize(callback: TianyuShellGenericEventCallback<number>): Unsubscribe {
        return getStore().subscribe(
            TianyuShellCoreInterface.event.select.getPageSize(getTianyuShellCoreInstanceId()),
            callback,
        );
    }
}
