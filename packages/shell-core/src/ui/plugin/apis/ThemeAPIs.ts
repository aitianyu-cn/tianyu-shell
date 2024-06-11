/** @format */

import {
    ITianyuShellCoreUITheme,
    ITianyuShellCoreUIThemeCustom,
    ITianyuShellCoreUIThemeItem,
    TianyuShellUIThemeColor,
} from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { StylingInterface } from "../interface/StylingInterfaceExpose";
import { getStylingInstanceId } from "../../tools/InstanceHelper";
import { Missing } from "@aitianyu.cn/tianyu-store";
import { getDefaultThemeFromConfigure, saveCustomThemeInCookie } from "../handler/StylingHandler";

class ThemeUserAPI implements ITianyuShellCoreUIThemeCustom {
    get(): string[] {
        const usingThemeWithMissing = getStore().selecte(
            StylingInterface.theme.user.getUsingThemes(getStylingInstanceId()),
        );
        return usingThemeWithMissing instanceof Missing ? [] : usingThemeWithMissing;
    }
    contains(id: string): boolean {
        const containsThemeWithMissing = getStore().selecte(
            StylingInterface.theme.user.isUsing(getStylingInstanceId(), id),
        );
        return containsThemeWithMissing instanceof Missing ? false : containsThemeWithMissing;
    }
    remove(id: string): void {
        void getStore().dispatch(StylingInterface.theme.user.remove(getStylingInstanceId(), id));
    }
    reset(): void {
        void getStore().dispatch(StylingInterface.theme.user.reset(getStylingInstanceId()));
    }
}

class ThemeAPI implements ITianyuShellCoreUITheme {
    private userAPIImpl: ITianyuShellCoreUIThemeCustom;

    public constructor() {
        this.userAPIImpl = new ThemeUserAPI();
    }

    get default(): ITianyuShellCoreUIThemeItem {
        const defaultThemeWithMissing = getStore().selecte(StylingInterface.theme.getDefault(getStylingInstanceId()));
        return defaultThemeWithMissing instanceof Missing ? getDefaultThemeFromConfigure() : defaultThemeWithMissing;
    }
    get custom(): ITianyuShellCoreUIThemeItem | null {
        const customThemeWithMissing = getStore().selecte(StylingInterface.theme.getCustom(getStylingInstanceId()));
        return customThemeWithMissing instanceof Missing ? null : customThemeWithMissing;
    }
    get user(): ITianyuShellCoreUIThemeCustom {
        return this.userAPIImpl;
    }
    change(theme: string, color: TianyuShellUIThemeColor, save?: boolean | undefined): void {
        void getStore()
            .dispatch(StylingInterface.theme.change(getStylingInstanceId(), { theme, color }))
            .then(() => {
                if (save) {
                    saveCustomThemeInCookie(theme, color);
                }
            });
    }
    reset(): void {
        void getStore().dispatch(StylingInterface.theme.reset(getStylingInstanceId()));
    }
}

export const ThemeGlobalAPIs: ITianyuShellCoreUITheme = new ThemeAPI();
