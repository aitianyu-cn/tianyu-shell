/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ObjectHelper } from "@aitianyu.cn/types";
import { CssHelper } from "shell-core/src/ui/resources/CssHelper";
import { CssMap, IStylingState, STYLING_CSS_MAP } from "../../state/StylingState";
import {
    CreateCssMappingActionCreator,
    LifecycleCssMappingActionCreator,
    RemoveStylingCssActionCreator,
    AddStylingCssActionCreator,
} from "./StyleCSSActionCreator";

function checkURL(link: string): boolean {
    return /([a-zA-Z0-9]+(:\/\/))?[a-zA-Z0-9\_\-\.\/\?\=]+$/.test(link);
}

export const CreateCssMappingAction = CreateCssMappingActionCreator.withExternal(function (register) {
    register.add(STYLING_CSS_MAP, new Map<string, HTMLElement>());
});
export const LifecycleCssMappingAction = LifecycleCssMappingActionCreator.withExternal(function (register) {
    register.remove(STYLING_CSS_MAP);
});

export const RemoveStylingCssAction = RemoveStylingCssActionCreator.withHandler(function* (action) {
    const cssMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get<CssMap>(STYLING_CSS_MAP);
    });
    if (!cssMap) {
        return;
    }

    const styleElement = cssMap.get(action.params);
    if (styleElement) {
        cssMap.delete(action.params);
    }

    return action.params;
}).withReducer(function (state, cssKey) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    if (cssKey) {
        newState.css = newState.css.splice(newState.css.indexOf(cssKey), 1);
    }

    return newState;
});
export const AddStylingCssAction = AddStylingCssActionCreator.withHandler(function* (action) {
    yield* StoreUtils.Handler.doAction(RemoveStylingCssAction(action.instanceId, action.params.key));

    const cssMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get<CssMap>(STYLING_CSS_MAP);
    });
    if (!cssMap) {
        return;
    }

    const isURL = checkURL(action.params.link);
    const newStyle = isURL
        ? CssHelper.createGlobalStyleLink(action.params.key, action.params.link)
        : CssHelper.createGlobalStyle(action.params.key, action.params.link);

    cssMap.set(action.params.key, newStyle);

    return action.params.key;
}).withReducer(function (state, key) {
    const newState = ObjectHelper.clone(state) as IStylingState;
    if (key && !newState.css.includes(key)) {
        newState.css.push(key);
    }
    return newState;
});
