/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { getStore } from "shell-core/src/core/utils/Store";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { MessageGlobalAPIs } from "../apis/MessageAPIs";
import { initLayout } from "../handler/MessageHandler";
import { MessageInterface } from "../interface/MessageInterfaceExpose";
import { StoreType } from "../interface/StoreTypes";
import { LayerSettingListener, MessagePostListener } from "../listener/MessageListener";

export async function initTianyuShellCoreUIMessage(): Promise<void> {
    const windowObj = window as any;
    /* istanbul ignore if */
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.background) {
        return;
    }

    const store = getStore();
    const instanceId = getMessageInstanceId();

    store.registerInterface(StoreType.MESSAGE_STORE_TYPE, MessageInterface);

    await store.dispatch(
        StoreUtils.createBatchAction([
            MessageInterface.core.creator(instanceId),
            MessageInterface.control.init(instanceId),
        ]),
    );

    store.startListen(LayerSettingListener);
    store.startListen(MessagePostListener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || /* istanbul ignore next */ {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || /* istanbul ignore next */ {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || /* istanbul ignore next */ {}),
                message: MessageGlobalAPIs,
            },
        },
    };

    initLayout();
}
