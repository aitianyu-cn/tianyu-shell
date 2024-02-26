/**@format */

import { MapOfType, Path } from "@aitianyu.cn/types";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { ITianyuShellUICssHelper, ITianyuShellCoreUIStyle } from "shell-core/src/core/declares/ui/UserInterface";
import { CssHelper } from "../../resources/CssHelper";
import { StyleHelper } from "../../resources/StyleHelper";
import { TianyuUIStyle, TianyuUIStyleDeclaration } from "../../../core/declares/ui/TianyuUIStyle";

interface IStyleMap {
    list: Map<string, IStyleMap>;
    styles: TianyuUIStyle;
}

const fnCreateStyleMap = (): IStyleMap => {
    return {
        list: new Map<string, IStyleMap>(),
        styles: new Map<string, TianyuUIStyleDeclaration>(),
    };
};
const fnProcessPath = (path?: string): string[] => {
    if (!path) {
        return [];
    }
    const trimPath = path.trim();
    if (!trimPath || trimPath === "/") {
        return [];
    }

    const pathObj = new Path(path);
    return pathObj.getDirs();
};
const fnCheckURL = (link: string): boolean => {
    return /([a-zA-Z0-9]+(:\/\/))?[a-zA-Z0-9\_\-\.\/\?\=]+$/.test(link);
};

const _styleMap: IStyleMap = fnCreateStyleMap();

const fnGetStylingMapDirectly = (pathList: string[]): { style: IStyleMap; valid: boolean } => {
    let styleMap = _styleMap;
    let mapping = true;
    for (const dir of pathList) {
        const subMap = styleMap.list.get(dir);
        if (subMap) {
            styleMap = subMap;
        } else {
            mapping = false;
            break;
        }
    }

    return {
        style: styleMap,
        valid: mapping,
    };
};

const fnGetStylingMap = (
    path?: string,
    key?: string[],
    isDepth?: boolean,
    stylings?: MapOfType<TianyuUIStyleDeclaration[]>,
): { style: IStyleMap; valid: boolean } => {
    const pathList = fnProcessPath(path);

    if (!key || !isDepth || !stylings) {
        return fnGetStylingMapDirectly(pathList);
    }

    let styleMap = _styleMap;
    let mapping = true;

    for (const dir of pathList) {
        for (const stylingName of key) {
            const innerStyling = styleMap.styles.get(stylingName);
            if (innerStyling) {
                if (!stylings[stylingName]) {
                    stylings[stylingName] = [];
                }
                stylings[stylingName].push(innerStyling);
            }
        }

        const subMap = styleMap.list.get(dir);
        if (subMap) {
            styleMap = subMap;
        } else {
            mapping = false;
            break;
        }
    }

    return {
        style: styleMap,
        valid: mapping,
    };
};

function _set(key: string, styling: TianyuUIStyleDeclaration, path?: string): boolean {
    const styleMap = fnGetStylingMap(path);

    const originStyle = styleMap.style.styles.get(key) || {};
    styleMap.style.styles.set(key, {
        ...originStyle,
        ...styling,
    });
    return true;
}
function _get(key: string | string[], path?: string, isDepth?: boolean): TianyuUIStyleDeclaration {
    // if no styling key provides, return empty styling
    if (Array.isArray(key) && key.length === 0) {
        return {};
    }

    // transform string to array
    const keys = typeof key === "string" ? [key] : key;
    // create a stylings map for depth search
    const stylings: MapOfType<TianyuUIStyleDeclaration[]> = {};
    // get styling map and get depth search stylings
    const styleMap = fnGetStylingMap(path, keys, isDepth, stylings);
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
}
function _remove(key: string, path?: string): void {
    const styleMap = fnGetStylingMap(path);
    if (!styleMap.valid) {
        return;
    }

    styleMap.style.styles.delete(key);
}

const _cssList: Map<string, HTMLElement> = new Map<string, HTMLElement>();

function _removeCss(key: string): boolean {
    const style = _cssList.get(key);
    if (style) {
        CssHelper.removeGlobalStyle(style);
        return _cssList.delete(key);
    }

    return false;
}
function _add(key: string, link: string): void {
    _removeCss(key);

    const isURL = fnCheckURL(link);
    const newStyle = isURL ? CssHelper.linkGlobalStyle(link) : CssHelper.setGlobalStyle(link);
    _cssList.set(key, newStyle);
}

const _cssStyle: ITianyuShellUICssHelper = {
    add: _add,
    remove: _removeCss,
};

const _style: ITianyuShellCoreUIStyle = {
    set: _set,
    get: _get,
    remove: _remove,
    css: _cssStyle,
};

export function initTianyuShellCoreUIStyle(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.style) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    style: _style,
                },
            },
        };
    }
}
