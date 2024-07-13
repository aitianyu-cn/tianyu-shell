/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";

export const SetDocumentLoadedAction = ActionFactor.makeActionCreator<ITianyuShellCoreState>().withReducer(function (
    state,
) {
    return StoreUtils.State.getNewState(state, ["event", "loadState"], true);
});

export const ChangeUrlHashAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string>().withReducer(
    function (state, hash) {
        return StoreUtils.State.getNewState(state, ["event", "urlHash"], hash);
    },
);

export const PageResizeAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, number>().withReducer(function (
    state,
    size,
) {
    return StoreUtils.State.getNewState(state, ["event", "pageResize"], size);
});
