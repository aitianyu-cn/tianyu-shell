/**@format */
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { TianyuShellUIMajorPreious, TianyuShellUIMajorZIndex } from "../../common/Declare";
import { ArrayHelper, guid } from "@aitianyu.cn/types";
import { ITianyuShellCoreUIMajor, ITianyuShellCoreUIMajorHelper } from "shell-core/src/core/declares/ui/UserInterface";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { MajorTianyuUI } from "../types/MajorTianyuUI";
import { createHTMLbyTianyuUI } from "../handler/Creator";
import { TianyuUIGenerateNotSupportException, TianyuUIMajorInvalidException } from "../../common/UIException";
import { Log } from "shell-core/src/core/plugin/Console";
import * as MessageBundle from "../../resources/i18n/Message";
import { StyleHelper } from "../../resources/StyleHelper";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { StyleBase } from "../Core";

interface IMajorMap {
    layerId: string;
    classList: string[];
    styleList: string[];
}

const _majorMap: IMajorMap = {
    layerId: "",
    classList: [],
    styleList: [],
};

function _init_major_layout_base(): void {
    _majorMap.layerId = `${TianyuShellUIMajorPreious}_${guid()}`;

    const majorLayer = document.createElement("div");
    majorLayer.style.zIndex = `${TianyuShellUIMajorZIndex}`;
    majorLayer.style.position = "absolute";
    majorLayer.style.width = "100%";
    majorLayer.style.height = "100%";
    majorLayer.id = _majorMap.layerId;
    document.body.appendChild(majorLayer);
}

function _addClass(...classNames: string[]): void {
    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    for (const newClass of classNames) {
        if (!_majorMap.classList.includes(newClass)) {
            layerRoot.classList.add(newClass);
            _majorMap.classList.push(newClass);
        }
    }
}
function _addStyle(...styles: (string | TianyuUIStyleDeclaration)[]): void {
    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    const newStyleList: TianyuUIStyleDeclaration[] = [];
    for (const newStyle of styles) {
        if (typeof newStyle === "string") {
            if (!_majorMap.classList.includes(newStyle)) {
                newStyleList.push(StyleBase().get(newStyle));
                _majorMap.classList.push(newStyle);
            }
        } else {
            newStyleList.push(newStyle);
        }
    }

    const style = StyleHelper.merge(...newStyleList);
    StyleHelper.set(layerRoot, style);
}
function _removeClass(className: string): void {
    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    if (_majorMap.classList.includes(className)) {
        layerRoot.classList.remove(className);
        _majorMap.classList = _majorMap.classList.filter((value: string) => {
            return value !== className;
        });
    }
}
function _resetStyle(): void {
    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    _majorMap.styleList = [];
    layerRoot.style.cssText = "";
}

const majorHelper: ITianyuShellCoreUIMajorHelper = {
    addClass: _addClass,
    addStyle: _addStyle,
    removeClass: _removeClass,
    resetStyle: _resetStyle,
};

function __generateElement(element: HTMLElement | TianyuUI | string): HTMLElement | null {
    if (element instanceof MajorTianyuUI) {
        return createHTMLbyTianyuUI(element);
    } else if (element instanceof HTMLElement) {
        return element;
    } else if (typeof element === "string") {
        return document.getElementById(element);
    } else {
        throw new TianyuUIGenerateNotSupportException(`${element}`);
    }
}

function _append(element: HTMLElement | TianyuUI): void {
    let renderElement = __generateElement(element);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    layerRoot.appendChild(renderElement);
}
function _appendInto(id: string | HTMLElement, element: HTMLElement | TianyuUI): void {
    let renderElement = __generateElement(element);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    let rootElement = __generateElement(id);
    if (!rootElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    rootElement.appendChild(renderElement);
}
function _remove(element: HTMLElement | TianyuUI | string): void {
    let renderElement = __generateElement(element);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    const layerRoot = document.getElementById(_majorMap.layerId);
    if (!layerRoot) {
        throw new TianyuUIMajorInvalidException(_majorMap.layerId);
    }

    layerRoot.removeChild(renderElement);
}
function _removeFrom(id: string | HTMLElement, element: HTMLElement | TianyuUI | string): void {
    let renderElement = __generateElement(element);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    let rootElement = __generateElement(id);
    if (!rootElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    rootElement.removeChild(renderElement);
}
function _getElementById(elemId: string): HTMLElement[] {
    const elements = document.getElementById(elemId);

    return elements ? [elements] : [];
}
function _getElementByClassName(className: string): Element[] {
    const elements = document.getElementsByClassName(className);

    const results: Element[] = [];
    for (const element of elements) {
        results.push(element);
    }

    return results;
}
function _getElementByTagName(tagName: string): Element[] {
    const elements = document.getElementsByTagName(tagName);

    const results: Element[] = [];
    for (const element of elements) {
        results.push(element);
    }

    return results;
}
function _createElement(type: keyof HTMLElementTagNameMap, id?: string): TianyuUI {
    const uiElement = new MajorTianyuUI(type, id);
    return uiElement;
}

const _major: ITianyuShellCoreUIMajor = {
    helper: majorHelper,

    append: _append,
    appendInto: _appendInto,
    remove: _remove,
    removeFrom: _removeFrom,
    getElementById: _getElementById,
    getElementByClassName: _getElementByClassName,
    getElementByTagName: _getElementByTagName,
    createElement: _createElement,
};

export function initTianyuShellCoreUIMajor(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.major) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    major: _major,
                },
            },
        };

        _init_major_layout_base();
    }
}
