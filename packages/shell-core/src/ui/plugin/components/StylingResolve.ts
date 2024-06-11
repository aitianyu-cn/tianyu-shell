/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { ITianyuShell } from "../../../core/declares/Declare";
import { getStylingInstanceId } from "../../tools/InstanceHelper";
import { ThemeGlobalAPIs } from "../apis/ThemeAPIs";
import { StylingInterface } from "../interface/StylingInterfaceExpose";
import { StoreType } from "../interface/StoreTypes";
import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import {
    getCustomThemeFromCookie,
    getDefaultThemeFromConfigure,
    updateTianyuShellTheme,
} from "../handler/StylingHandler";
import { StyleCssChangedListener } from "../listener/StyleCssListener";
import { TianyuShellThemeChangeListener, UserThemeChangeListener } from "../listener/ThemeListener";
import { StyleGlobalAPIs } from "../apis/StyleAPIs";

export async function initTianyuShellCoreUIStyling(): Promise<void> {
    const windowObj = window as any;
    if (!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.background) {
        return;
    }

    const store = getStore();
    const instanceId = getStylingInstanceId();

    store.registerInterface(StoreType.STYLING_STORE_TYPE, StylingInterface);

    const customTheme = getCustomThemeFromCookie();
    await store.dispatch(
        StoreUtils.createBatchAction([
            StylingInterface.core.creator(instanceId, {
                default: getDefaultThemeFromConfigure(),
                custom: customTheme,
            }),
            StylingInterface.control.create.tianyuStyleMap(instanceId),
            StylingInterface.control.create.cssMap(instanceId),
        ]),
    );

    store.startListen(StyleCssChangedListener);
    store.startListen(TianyuShellThemeChangeListener);
    store.startListen(UserThemeChangeListener);

    (windowObj.tianyuShell as ITianyuShell) = {
        ...(windowObj.tianyuShell || {}),
        core: {
            ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
            ui: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                theme: ThemeGlobalAPIs,
                style: StyleGlobalAPIs,
            },
        },
    };

    updateTianyuShellTheme(customTheme.theme, customTheme.color);
}
