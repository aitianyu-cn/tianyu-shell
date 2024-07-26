/**@format */

import { Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { getStore } from "shell-core/src/core/utils/Store";
import { getDialogInstanceId } from "../../tools/InstanceHelper";
import { DialogGlobalAPIs } from "../apis/DialogAPIs";
import { initDialogLayout } from "../handler/DialogHandler";
import { DialogInterface } from "../interface/DialogInterfaceExpose";
import { StoreType } from "../interface/StoreTypes";
import * as MessageBundle from "../../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";

export async function initTianyuShellCoreUIDialog(): Promise<void> {
    const windowObj = window as any;
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.dialog) {
        return;
    }

    const store = getStore();
    const instanceId = getDialogInstanceId();

    store.registerInterface(StoreType.DIALOG_STORE_TYPE, DialogInterface);

    await store.dispatch(
        StoreUtils.createBatchAction([
            DialogInterface.core.creator(instanceId),
            DialogInterface.tools.externalObj.create(instanceId),
        ]),
    );

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                dialog: DialogGlobalAPIs,
            },
        },
    };

    const baseLayerId = await initDialogLayout();
    const layerInited = store.selecte(DialogInterface.layer.exist(instanceId, baseLayerId));
    if (layerInited instanceof Missing || !layerInited) {
        Log.error(MessageBundle.getText("TIANYU_UI_DIALOG_INIT_FAILED"));
    }
}
