/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { IMajorState } from "../state/MajorState";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { MajorTianyuUI } from "../../types/MajorTianyuUI";

export const GetMajorLayerId = SelectorFactor.makeSelector<IMajorState, string>(function (state) {
    return state.layerId;
});

export const GetMajorClassList = SelectorFactor.makeSelector<IMajorState, string[]>(function (state) {
    return state.classList;
});

export const GetMajorStylings = SelectorFactor.makeSelector<IMajorState, TianyuUIStyleDeclaration>(function (state) {
    return state.styleList;
});

export const _GetMajorLayer = SelectorFactor.makeSelector<
    IMajorState,
    {
        layerId: string;
        layerRoot: HTMLElement | null;
    }
>(function (state) {
    const layerRoot = document.getElementById(state.layerId);
    return {
        layerId: state.layerId,
        layerRoot,
    };
});

export const _GetMajorClassInfo = SelectorFactor.makeMixingSelector(
    _GetMajorLayer,
    GetMajorClassList,
    function (layer, classNames) {
        return {
            layer,
            classNames,
        };
    },
);

export const _GetMajorStylingInfo = SelectorFactor.makeMixingSelector(
    _GetMajorLayer,
    GetMajorStylings,
    function (layer, stylings) {
        return {
            layer,
            stylings,
        };
    },
);
export const GetElementById = SelectorFactor.makeConstantSelector<HTMLElement[], string>(function (_, elementId) {
    const elements = document.getElementById(elementId);
    return elements ? [elements] : [];
});

export const GetElementByClassName = SelectorFactor.makeConstantSelector<Element[], string>(function (_, elementId) {
    const elements = document.getElementsByClassName(elementId);
    const results: Element[] = [];
    for (const element of elements) {
        results.push(element);
    }
    return results;
});

export const GetElementByTagName = SelectorFactor.makeConstantSelector<Element[], string>(function (_, elementId) {
    const elements = document.getElementsByTagName(elementId);
    const results: Element[] = [];
    for (const element of elements) {
        results.push(element);
    }
    return results;
});

export const GetNewElement = SelectorFactor.makeConstantSelector<
    TianyuUI,
    {
        type: keyof HTMLElementTagNameMap;
        id?: string;
    }
>(function (_, data) {
    const uiElement = new MajorTianyuUI(data.type, data.id);
    return uiElement;
});
