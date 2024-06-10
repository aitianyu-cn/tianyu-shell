/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { getStylingMap } from "shell-core/src/ui/tools/TianyuStylingHelper";
import { IStyleMap, STYLING_STYLE_MAP } from "../../state/StylingState";
import {
    CreateTianyuStyleMapActionCreator,
    LifecycleTianyuStyleMapActionCreator,
    SetTianyuStylingActionCreator,
    RemoveTianyuStylingActionCreator,
} from "./StyleTianyuStyleActionCreator";

export const CreateTianyuStyleMapAction = CreateTianyuStyleMapActionCreator.withExternal(function (register) {
    register.add(STYLING_STYLE_MAP, {
        list: new Map<string, IStyleMap>(),
        styles: new Map<string, TianyuUIStyleDeclaration>(),
    });
});
export const LifecycleTianyuStyleMapAction = LifecycleTianyuStyleMapActionCreator.withExternal(function (register) {
    register.remove(STYLING_STYLE_MAP);
});

export const SetTianyuStylingAction = SetTianyuStylingActionCreator.withHandler(function* (action) {
    const tianyuStyleMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(STYLING_STYLE_MAP) as IStyleMap | undefined;
    });
    if (!tianyuStyleMap) {
        return;
    }

    const styleMap = getStylingMap(tianyuStyleMap, action.params.path);
    const originStyle = styleMap.style.styles.get(action.params.key) || {};
    styleMap.style.styles.set(action.params.key, {
        ...originStyle,
        ...action.params.styling,
    });
});
export const RemoveTianyuStylingAction = RemoveTianyuStylingActionCreator.withHandler(function* (action) {
    const tianyuStyleMap = yield* StoreUtils.Handler.doReadExternal(function (register) {
        return register.get(STYLING_STYLE_MAP) as IStyleMap | undefined;
    });
    if (!tianyuStyleMap) {
        return;
    }

    const styleMap = getStylingMap(tianyuStyleMap, action.params.path);
    if (!styleMap.valid) {
        return;
    }

    styleMap.style.styles.delete(action.params.key);
});
