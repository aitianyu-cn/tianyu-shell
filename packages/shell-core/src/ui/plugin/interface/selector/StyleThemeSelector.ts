/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { ObjectHelper } from "@aitianyu.cn/types";
import { IStylingState } from "../state/StylingState";

export const GetAllCustomThemesSelector = SelectorFactor.makeSelector<IStylingState, string[]>(function (state) {
    return Object.keys(state.theme.user.custom);
});

export const GetUsingCustomThemesSelector = SelectorFactor.makeSelector<IStylingState, string[]>(function (state) {
    return ObjectHelper.clone(state.theme.user.using);
});

export const GetCustomThemeURLSelector = SelectorFactor.makeParameterSelector<IStylingState, string, string>(function (
    state,
    themeId,
) {
    return state.theme.user.custom[themeId] || "";
});

export const ContainsUsingCustomThemeSelector = SelectorFactor.makeParameterSelector<IStylingState, string, boolean>(
    function (state, themeId) {
        return state.theme.user.using.includes(themeId);
    },
);
