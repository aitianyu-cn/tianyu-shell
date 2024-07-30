/**@format */
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { getMajorInstanceId } from "../../tools/InstanceHelper";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorGlobalAPIs } from "../apis/MajorAPIs";
import { initMajorLayout } from "../handler/MajorHandler";
import { StoreType } from "../interface/StoreTypes";
import { MajorInterface } from "../interface/MajorInterfaceExpose";
import { MajorClassesChangedListener, MajorStylingChangedListener } from "../listener/MajorListener";

export async function initTianyuShellCoreUIMajor(): Promise<void> {
    const windowObj = window as any;
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.major) {
        return;
    }

    const store = getStore();
    const instanceId = getMajorInstanceId();

    store.registerInterface(StoreType.MAJOR_STORE_TYPE, MajorInterface);

    await store.dispatch(MajorInterface.core.creator(instanceId));

    store.startListen(MajorClassesChangedListener);
    store.startListen(MajorStylingChangedListener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                major: MajorGlobalAPIs,
            },
        },
    };

    initMajorLayout();
}
