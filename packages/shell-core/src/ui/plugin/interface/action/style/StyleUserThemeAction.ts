/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ObjectHelper } from "@aitianyu.cn/types";
import { formatUserThemeURL } from "shell-core/src/ui/tools/UserStylingHelper";
import { addUserTheme, getUserThemeElement, removeUserTheme } from "../../../handler/StylingHandler";
import { ContainsUsingCustomThemeSelector } from "../../selector/StyleThemeSelector";
import { IStylingState } from "../../state/StylingState";
import {
    AddNewCustomThemeActionCreator,
    UpdateCustomThemeActionCreator,
    DeleteCustomThemeActionCreator,
} from "./StyleUserThemeActionCreator";

export const AddNewCustomThemeAction = AddNewCustomThemeActionCreator.withReducer(function (state, styling) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    if (!newState.theme.user.custom[styling.themeId]) {
        newState.theme.user.custom[styling.themeId] = formatUserThemeURL(styling.styling);
    }
    return newState;
});

export const UpdateCustomThemeAction = UpdateCustomThemeActionCreator.withHandler(function* (action) {
    const themeFormatedURL = formatUserThemeURL(action.params.styling);

    const isUsing = yield* StoreUtils.Handler.doSelector(
        ContainsUsingCustomThemeSelector(action.instanceId, action.params.themeId),
    );

    if (isUsing) {
        const oldElement = getUserThemeElement(action.params.themeId);
        if (oldElement) {
            addUserTheme(action.params.themeId, themeFormatedURL, oldElement);
        } else {
            yield* StoreUtils.Handler.doAction(DeleteCustomThemeAction(action.instanceId, action.params.themeId));
        }
    }

    return {
        id: action.params.themeId,
        url: themeFormatedURL,
    };
}).withReducer(function (state, theme) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    newState.theme.user.custom[theme.id] = theme.url;
    return newState;
});

export const DeleteCustomThemeAction = DeleteCustomThemeActionCreator.withHandler(function* (action) {
    removeUserTheme(action.params);
    return action.params;
}).withReducer(function (state, usingTheme) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    newState.theme.user.using = newState.theme.user.using.splice(newState.theme.user.using.indexOf(usingTheme), 1);
    return newState;
});
