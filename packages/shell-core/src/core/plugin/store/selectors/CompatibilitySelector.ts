/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";

export const GetThemeList = SelectorFactor.makeSelector<ITianyuShellCoreState, string[]>(function (state) {
    return state.compatibility.theme.concat();
});
