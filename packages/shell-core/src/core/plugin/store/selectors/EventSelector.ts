/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";

export const GetDocumentLoaded = SelectorFactor.makeSelector<ITianyuShellCoreState, boolean>(function (state) {
    return state.event.loadState;
});

export const GetUrlHash = SelectorFactor.makeSelector<ITianyuShellCoreState, string>(function (state) {
    return state.event.urlHash;
});

export const GetPageSize = SelectorFactor.makeSelector<ITianyuShellCoreState, number>(function (state) {
    return state.event.pageResize;
});
