/** @format */

import { InstanceId, IStore } from "@aitianyu.cn/tianyu-store";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import * as MessageBundle from "../common/i18n/Message";

export function getStore(): IStore {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.core?.ui?.store;
    if (!store) {
        throw new Error(MessageBundle.getText("TIANYU_STORE_NOT_VALID"));
    }

    return store.store;
}

export function getInstanceId(): InstanceId {
    const store = ((window as any)?.tianyuShell as ITianyuShell)?.core?.ui?.store;
    if (!store) {
        throw new Error(MessageBundle.getText("TIANYU_STORE_NOT_VALID"));
    }

    return store.instanceId;
}
