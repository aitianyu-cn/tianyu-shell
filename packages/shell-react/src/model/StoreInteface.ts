/** @format */

import { IterableType, ITianyuStoreInterfaceImplementation, SelectorProvider } from "@aitianyu.cn/tianyu-store";

export interface IDefaultInterface<S extends IterableType> extends ITianyuStoreInterfaceImplementation {
    getState: SelectorProvider<S, S>;
}
