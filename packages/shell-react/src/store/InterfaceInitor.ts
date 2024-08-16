/** @format */

import { IStore, IterableType, ITianyuStoreInterfaceImplementation, SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { DefaultInterfaceMap } from "./InterfaceMap";
import { IDefaultInterface } from "../model/StoreInteface";
import { getStore } from "shell-core/src/core/utils/Store";
import { TIANYU_SHELL_REACT_STORE, TianyuReactInterfaceExpose } from "./BaseInterface";

/**
 * This function is used for initializing the tianyu shell react infra configuration into store.
 * The infra config is a basic interfaces for elements running. If the infra config is not initialized,
 * error will occur in runtime.
 *
 * @param store tianyu store instance
 */
export function registerInterface(store: IStore): void {
    store.registerInterface(TIANYU_SHELL_REACT_STORE, TianyuReactInterfaceExpose);
}

export function generateInterface<S extends IterableType>(storeType: string, store: IStore): IDefaultInterface<S> {
    if (!DefaultInterfaceMap[storeType]) {
        DefaultInterfaceMap[storeType] = {
            getState: SelectorFactor.makeSelector<S, S>(function (state) {
                return state;
            }),
        };

        store.registerInterface({
            [TIANYU_SHELL_REACT_STORE]: {
                [storeType]: DefaultInterfaceMap[storeType],
            },
        });
    }

    return DefaultInterfaceMap[storeType];
}

export function registerInterfaceForElement(
    store: IStore,
    storeType: string,
    interfaceImpl: ITianyuStoreInterfaceImplementation,
): void {
    store.registerInterface({
        [TIANYU_SHELL_REACT_STORE]: {
            [storeType]: interfaceImpl,
        },
    });
}
