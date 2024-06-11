/** @format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { ITianyuShellCoreUIStyle, ITianyuShellUICssHelper } from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { StylingInterface } from "../interface/StylingInterfaceExpose";
import { getStylingInstanceId } from "../../tools/InstanceHelper";

const StyleCssGlobalAPIs: ITianyuShellUICssHelper = {
    add: function (key: string, link: string): void {
        void getStore().dispatch(StylingInterface.style.css.add(getStylingInstanceId(), { key, link }));
    },
    remove: function (key: string): void {
        void getStore().dispatch(StylingInterface.style.css.remove(getStylingInstanceId(), key));
    },
};

export const StyleGlobalAPIs: ITianyuShellCoreUIStyle = {
    css: StyleCssGlobalAPIs,
    set: function (key: string, styling: TianyuUIStyleDeclaration, path?: string | undefined): void {
        void getStore().dispatch(
            StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), { key, styling, path }),
        );
    },
    get: function (
        key: string | string[],
        path?: string | undefined,
        isDepth?: boolean | undefined,
    ): TianyuUIStyleDeclaration {
        return getStore().selecte(
            StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), { key, path, isDepth }),
        );
    },
    remove: function (key: string, path?: string | undefined): void {
        void getStore().dispatch(StylingInterface.style.tianyuStyle.remove(getStylingInstanceId(), { key, path }));
    },
};
