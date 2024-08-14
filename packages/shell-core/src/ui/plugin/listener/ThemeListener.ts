/** @format */

import { ListenerFactor, Missing } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreUIThemeItem } from "shell-core/src/core/declares/ui/UserInterface";
import { StylingListenerExpose, StylingInterface } from "../interface/StylingInterfaceExpose";
import { getStylingInstanceId } from "../../tools/InstanceHelper";
import { addUserTheme, removeUserTheme, updateTianyuShellTheme } from "../handler/StylingHandler";
import { getStore } from "shell-core/src/core/utils/Store";
import { TestHook } from "infra/TestHook";

function onTianyuShellThemeChanged(
    _oldTheme: ITianyuShellCoreUIThemeItem | undefined,
    newTheme: ITianyuShellCoreUIThemeItem | undefined,
): void {
    if (!newTheme) {
        return;
    }

    updateTianyuShellTheme(newTheme.theme, newTheme.color);
}

function onUserThemeChanged(oldList: string[] | undefined, newList: string[] | undefined): void {
    const store = getStore();
    const instanceId = getStylingInstanceId();

    oldList = oldList || [];
    newList = newList || [];

    for (const theme in oldList) {
        if (!newList.includes(theme)) {
            removeUserTheme(theme);
        }
    }

    for (const theme in newList) {
        if (!oldList.includes(theme)) {
            try {
                const themeURLWithMissing = store.selecteWithThrow(
                    StylingInterface.theme.user.getURL(instanceId, theme),
                );
                if (themeURLWithMissing) {
                    addUserTheme(theme, themeURLWithMissing);
                }
            } catch {
                TestHook.debugger("theme listener - get user theme url failed");
            }
        }
    }
}

export const TianyuShellThemeChangeListener = ListenerFactor.createListener(
    StylingListenerExpose.theme.getCustom(getStylingInstanceId()),
    onTianyuShellThemeChanged,
);

export const UserThemeChangeListener = ListenerFactor.createListener(
    StylingListenerExpose.theme.user.getUsingThemes(getStylingInstanceId()),
    onUserThemeChanged,
);
