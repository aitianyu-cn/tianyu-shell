/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { IBackgroundInfo, IBackgroundState } from "../state/BackgroundState";

export const GetBackgroundColorSelector = SelectorFactor.makeSelector<IBackgroundState, string>(function (
    state,
): string {
    return state.color;
});

export const GetBackgroundDefaultColorSelector = SelectorFactor.makeSelector<IBackgroundState, string>(function (
    state,
): string {
    return state.defaultColor;
});

export const GetBackgroundLayerIdSelector = SelectorFactor.makeSelector<IBackgroundState, string>(function (
    state,
): string {
    return state.layerId;
});

export const GetBackgroundInfoSelector = SelectorFactor.makeSelector<IBackgroundState, IBackgroundInfo>(function (
    state,
): IBackgroundInfo {
    return { color: state.color, elementId: state.elementId };
});

export const GetBackgroundHTMLElements = SelectorFactor.makeSelector<IBackgroundState, string[], string[]>(
    function (_state, externalResult) {
        return externalResult || [];
    },
    function (register) {
        const map = register.get("BACKGROUND_ELEMENT_MAP") as Map<string, HTMLElement> | undefined;
        const result: string[] = [];

        if (map) {
            for (const pair of map) {
                result.push(pair[0]);
            }
        }

        return result;
    },
);

export const GetBackgroundCurrentHTMLElementId = SelectorFactor.makeSelector<IBackgroundState, string | null>(function (
    state,
) {
    return state.elementId;
});

export const GetBackgroundCurrentHTMLElement = SelectorFactor.makeParameterSelector<
    IBackgroundState,
    string,
    HTMLElement | undefined,
    Map<string, HTMLElement> | undefined
>(
    function (state, id, map) {
        return id ? map?.get(id) : undefined;
    },
    function (register): Map<string, HTMLElement> | undefined {
        const map = register.get("BACKGROUND_ELEMENT_MAP") as Map<string, HTMLElement> | undefined;
        return map;
    },
);
