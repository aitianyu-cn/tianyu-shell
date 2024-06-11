/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { MapOfType, ObjectHelper } from "@aitianyu.cn/types";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { StyleHelper } from "shell-core/src/ui/resources/StyleHelper";
import { getStylingMap } from "shell-core/src/ui/tools/TianyuStylingHelper";
import { CssMap, IStyleMap, IStylingState, STYLING_CSS_MAP, STYLING_STYLE_MAP } from "../state/StylingState";

export const GetTianyuUIStyleSelector = SelectorFactor.makeParameterSelector<
    IStylingState,
    {
        key: string | string[];
        path?: string;
        isDepth?: boolean;
    },
    TianyuUIStyleDeclaration,
    IStyleMap
>(
    function (_state, params, tianyuStyleMap) {
        if (!tianyuStyleMap) {
            return {};
        }

        if (Array.isArray(params.key) && params.key.length === 0) {
            return {};
        }

        // transform string to array
        const keys = typeof params.key === "string" ? [params.key] : params.key;
        // create a stylings map for depth search
        const stylings: MapOfType<TianyuUIStyleDeclaration[]> = {};
        // get styling map and get depth search stylings
        const styleMap = getStylingMap(tianyuStyleMap, params.path, keys, params.isDepth, stylings);
        // if styling map is not found, return empty styling
        if (!styleMap.valid) {
            return {};
        }

        // create a styling list for result
        const styleList: TianyuUIStyleDeclaration[] = [];
        for (const styleKey of keys) {
            // get styling from target path
            const style = styleMap.style.styles.get(styleKey);
            if (style) {
                // get depth styling list
                const mergeList = stylings[styleKey] || [];
                // merge depth stylings and target styling
                // the merge is target first.
                // styling in the target will overwrite the depth styling result
                styleList.push(StyleHelper.merge(...mergeList, style));
            }
        }

        return StyleHelper.merge(...styleList);
    },
    function (register) {
        return register.get(STYLING_STYLE_MAP) as IStyleMap;
    },
);

export const GetStyleCssElementSelector = SelectorFactor.makeParameterSelector<
    IStylingState,
    string,
    HTMLElement | undefined,
    CssMap | undefined
>(
    function (_state, key, map) {
        if (!map) {
            return undefined;
        }

        return map.get(key);
    },
    function (register) {
        return register.get<CssMap>(STYLING_CSS_MAP);
    },
);

export const GetStyleCssListSelector = SelectorFactor.makeSelector<IStylingState, string[]>(function (state) {
    return ObjectHelper.clone(state.css);
});
