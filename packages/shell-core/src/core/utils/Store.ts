/** @format */

import { InstanceId, IStore } from "@aitianyu.cn/tianyu-store";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";

export function getStore(): IStore {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
    if (!store) {
        throw new Error("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");
    }

    return store.store;
}

export function getInstanceId(): InstanceId {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
    if (!store) {
        throw new Error("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");
    }

    return store.instanceId;
}

export function getHistroySupportedIns(): InstanceId {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
    if (!store) {
        throw new Error("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");
    }

    return store.histroyInstance;
}

export function getNoHisSupportedIns(): InstanceId {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
    if (!store) {
        throw new Error("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");
    }

    return store.nonHisInstance;
}
