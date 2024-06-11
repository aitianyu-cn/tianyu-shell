/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import {
    ChangeTianyuShellThemeActionCreator,
    ResetTianyuShellThemeActionCreator,
} from "./StyleTianyuShellThemeActionCreator";
import { ResetCustomThemeAction } from "./StyleUserThemeAction";
import { ObjectHelper } from "@aitianyu.cn/types";
import { IStylingState } from "../../state/StylingState";
import { UIValidation } from "shell-core/src/core/utils/UIValidation";

export const ResetTianyuShellThemeAction = ResetTianyuShellThemeActionCreator.withHandler(function* (action) {
    yield* StoreUtils.Handler.doAction(ResetCustomThemeAction(action.instanceId));
}).withReducer(function (state) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    newState.theme.custom.color = newState.theme.default.color;
    newState.theme.custom.theme = newState.theme.default.theme;
    return newState;
});

export const ChangeTianyuShellThemeAction = ChangeTianyuShellThemeActionCreator.withHandler(function* (action) {
    const validTheme = UIValidation.validateTheme(action.params.theme);
    return validTheme ? { ...action.params } : undefined;
}).withReducer(function (state, theme) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    if (theme) {
        newState.theme.custom = theme;
    }
    return newState;
});
