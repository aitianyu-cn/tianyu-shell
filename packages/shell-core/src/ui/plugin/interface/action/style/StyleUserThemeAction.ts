/** @format */

import { ObjectHelper } from "@aitianyu.cn/types";
import { formatUserThemeURL } from "shell-core/src/ui/tools/UserStylingHelper";
import { IStylingState } from "../../state/StylingState";
import {
    AddNewCustomThemeActionCreator,
    DeleteCustomThemeActionCreator,
    ResetCustomThemeActionCreator,
} from "./StyleUserThemeActionCreator";

export const AddNewCustomThemeAction = AddNewCustomThemeActionCreator.withReducer(function (state, styling) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    if (!newState.theme.user.custom[styling.themeId]) {
        newState.theme.user.custom[styling.themeId] = formatUserThemeURL(styling.styling);
        newState.theme.user.using.push(styling.themeId);
    }
    return newState;
});

export const DeleteCustomThemeAction = DeleteCustomThemeActionCreator.withReducer(function (state, usingTheme) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    // remove from using list
    newState.theme.user.using.splice(newState.theme.user.using.indexOf(usingTheme), 1);
    // remove custom from map
    if (newState.theme.user.custom[usingTheme]) {
        delete newState.theme.user.custom[usingTheme];
    }
    return newState;
});

export const ResetCustomThemeAction = ResetCustomThemeActionCreator.withReducer(function (state) {
    const newState = ObjectHelper.clone(state);
    newState.theme.user.custom = {};
    newState.theme.user.using = [];
    return newState;
});
