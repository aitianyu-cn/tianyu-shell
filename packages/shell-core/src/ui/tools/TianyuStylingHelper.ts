/** @format */

import { Path, MapOfType } from "@aitianyu.cn/types";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { IStyleMap } from "../plugin/interface/state/StylingState";

export function getStylingMapDirectly(
    tianyuStyleMap: IStyleMap,
    pathList: string[],
): { style: IStyleMap; valid: boolean } {
    let styleMap = tianyuStyleMap;
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
}

export function processPath(path?: string): string[] {
    if (!path) {
        return [];
    }
    const trimPath = path.trim();
    if (!trimPath || trimPath === "/") {
        return [];
    }

    const pathObj = new Path(path);
    return pathObj.getDirs();
}

export function getStylingMap(
    tianyuStyleMap: IStyleMap,
    path?: string,
    key?: string[],
    isDepth?: boolean,
    stylings?: MapOfType<TianyuUIStyleDeclaration[]>,
): { style: IStyleMap; valid: boolean } {
    const pathList = processPath(path);

    if (!key || !isDepth || !stylings) {
        return getStylingMapDirectly(tianyuStyleMap, pathList);
    }

    let styleMap = tianyuStyleMap;
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
}
