/** @format */

import { createStore, IStore, TianyuStoreEntityInterfaceExpose } from "@aitianyu.cn/tianyu-store";
import { TIANYU_SHELL_CORE_STORE_TYPE, TIANYU_SHELL_INFRA_STORE_TYPE } from "shell-core/src/core/declares/Constant";

export function createMockedStore(): IStore {
    const mockedStore = createStore();
    return mockedStore;
}

export async function initialStore(store: IStore): Promise<void> {
    const { getNoHisSupportedIns, getHistroySupportedIns, getInstanceId } = await import(
        "shell-core/src/core/utils/Store"
    );

    await store.dispatch(
        TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.creator(getNoHisSupportedIns(), {
            redoUndo: false,
        }),
    );
    await store.dispatch(
        TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.creator(getHistroySupportedIns(), {
            redoUndo: true,
        }),
    );
    await store.dispatch(
        TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.creator(getInstanceId(), {
            redoUndo: true,
        }),
    );

    const { TianyuShellInfraInterface, getTianyuShellInfraInstanceId } = await import(
        "shell-core/src/core/initial/store-api/TianyushellInfraInterface"
    );
    const config = require("test/config/env.json");
    store.registerInterface(TIANYU_SHELL_INFRA_STORE_TYPE, TianyuShellInfraInterface);
    await store.dispatch(TianyuShellInfraInterface.core.creator(getTianyuShellInfraInstanceId(), config || {}));

    const { TianyuShellCoreInterface, getTianyuShellCoreInstanceId } = await import(
        "shell-core/src/core/plugin/store/Exports"
    );
    store.registerInterface(TIANYU_SHELL_CORE_STORE_TYPE, TianyuShellCoreInterface);
    await store.dispatch(TianyuShellCoreInterface.core.creator(getTianyuShellCoreInstanceId()));
}

export async function destroyStore(store: IStore): Promise<void> {
    const { getNoHisSupportedIns, getHistroySupportedIns, getInstanceId } = await import(
        "shell-core/src/core/utils/Store"
    );

    await store.dispatch(
        TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.destroy(getNoHisSupportedIns()),
    );
    await store.dispatch(
        TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.destroy(getHistroySupportedIns()),
    );
    await store.dispatch(TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].core.destroy(getInstanceId()));
}
