/**@format */

import { MapOfString, MapOfStrings } from "@aitianyu.cn/types";
import { TianyuUI } from "../../../core/declares/ui/TianyuUI";
import { TianyuUIStyleDeclaration } from "../../../core/declares/ui/TianyuUIStyle";
import { StyleHelper } from "../../resources/StyleHelper";
import { TianyuUIEvent } from "../../../core/declares/ui/TianyuUIEvent";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { Log } from "shell-core/src/core/plugin/Console";
import * as MessageBundle from "../../resources/i18n/Message";

function _processElementStyles<key extends keyof HTMLElementTagNameMap>(
    element: HTMLElementTagNameMap[key],
    innerStyle: TianyuUIStyleDeclaration | undefined,
    styleList: string | string[] | MapOfStrings | undefined,
): void {
    const tianyuUIStyles = _handleTianyuUIStyles(styleList);
    StyleHelper.insert(tianyuUIStyles, innerStyle || {});
    for (const styleKey of Object.keys(tianyuUIStyles)) {
        if (typeof (element.style as any)[styleKey] !== "undefined") {
            try {
                (element.style as any)[styleKey] = (tianyuUIStyles as any)[styleKey];
            } catch (e) {
                Log.debug(MessageBundle.getText("TIANYU_UI_CREATOR_SYSTEM_ERROR", (e as any).message));
                // catch error to avoid function interruption
                // nothing needs to do in the exception catch
            }
        }
    }
}

function _handleTianyuUIStyles(tianyuUIStyles: string | string[] | MapOfStrings | undefined): TianyuUIStyleDeclaration {
    const styles: TianyuUIStyleDeclaration = {};
    if (tianyuUIStyles) {
        const styleArray =
            typeof tianyuUIStyles === "string"
                ? [tianyuUIStyles]
                : Array.isArray(tianyuUIStyles)
                ? tianyuUIStyles
                : undefined;
        if (styleArray) {
            const styleItem = ((window as any).tianyuShell as ITianyuShell)?.core?.ui?.style?.get(styleArray) || {};
            StyleHelper.insert(styles, styleItem);
        } else {
            for (const path of Object.keys(tianyuUIStyles)) {
                const styleItem = ((window as any).tianyuShell as ITianyuShell)?.core?.ui?.style?.get(
                    (tianyuUIStyles as MapOfStrings)[path],
                    path,
                );
                StyleHelper.insert(styles, styleItem);
            }
        }
    }
    return styles;
}

function _processElementEvent<key extends keyof HTMLElementTagNameMap>(
    element: HTMLElementTagNameMap[key],
    event: TianyuUIEvent | undefined,
): void {
    if (event) {
        for (const key of Object.keys(event)) {
            try {
                element.addEventListener(key, (event as any)[key]);
            } catch (e) {
                Log.debug(MessageBundle.getText("TIANYU_UI_CREATOR_SYSTEM_ERROR", (e as any).message));
                // catch error to avoid function interruption
                // nothing needs to do in the exception catch
            }
        }
    }
}

function _processOthers<key extends keyof HTMLElementTagNameMap>(
    element: HTMLElementTagNameMap[key],
    otherSetting: MapOfString | undefined,
): void {
    if (otherSetting) {
        for (const key of Object.keys(otherSetting)) {
            if (element.hasAttribute(key)) {
                try {
                    (element as any)[key] = otherSetting[key];
                } catch (e) {
                    Log.debug(MessageBundle.getText("TIANYU_UI_CREATOR_SYSTEM_ERROR", (e as any).message));
                    // catch error to avoid function interruption
                    // nothing needs to do in the exception catch
                }
            }
        }
    }
}

function _createHTMLElement(tianyuElem: TianyuUI): HTMLElement {
    const htmlElement = document.createElement(tianyuElem.type);
    htmlElement.id = tianyuElem.id;
    tianyuElem.innerHTML && (htmlElement.innerHTML = tianyuElem.innerHTML);
    tianyuElem.innerText && (htmlElement.innerText = tianyuElem.innerText);
    tianyuElem.outerText && (htmlElement.outerText = tianyuElem.outerText);

    _processElementStyles(htmlElement, tianyuElem.style, tianyuElem.styles);
    _processElementEvent(htmlElement, tianyuElem.event);
    htmlElement.classList.add(...(tianyuElem.classes || []));
    _processOthers(htmlElement, tianyuElem.others);

    for (const child of tianyuElem.children || []) {
        const childElement = _createHTMLElement(child);
        htmlElement.appendChild(childElement);
    }

    return htmlElement;
}

/**
 * Convert Tianyu Shell UI to be HTML native element
 *
 * @param ui Tianyu Shell UI element
 * @returns return HTML element
 */
export function createHTMLbyTianyuUI(ui: TianyuUI): HTMLElement {
    return _createHTMLElement(ui);
}
