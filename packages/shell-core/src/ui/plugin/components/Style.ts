/**@format */

import { MapOfType, Path } from "@aitianyu.cn/types";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { ITianyuShellUICssHelper, ITianyuShellCoreUIStyle } from "shell-core/src/core/declares/ui/UserInterface";
import { CssHelper } from "../../resources/CssHelper";
import { StyleHelper } from "../../resources/StyleHelper";
import { TianyuUIStyle, TianyuUIStyleDeclaration } from "../../../core/declares/ui/TianyuUIStyle";

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
