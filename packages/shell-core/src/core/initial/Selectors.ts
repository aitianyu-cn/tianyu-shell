/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { getBoolean } from "@aitianyu.cn/types";
import { ITianyuShellInitial } from "../ITianyuShellInitial";
import { ITianyuShellUIConfigure } from "../declares/ui/UserInterface";
import { translateThemeColorToId } from "shell-core/src/ui/utils/ThemeTranslator";
import { UIValidation } from "../utils/UIValidation";
import {
    Default_UI_Configure_ThemeURL,
    Default_UI_Configure_DefaultTheme,
    Default_UI_Configure_DefaultThemeColor,
    Default_UI_Configure_DefaultBackgroundColor,
    Default_Core_Environment,
    Default_Core_Runtime_Console,
    Default_Core_Version,
} from "./Constant";
import {
    ITianyuShellCookieConfigure,
    ITianyuShellCoreBaseConfigure,
    ITianyuShellPluginSetting,
    ITianyuShellRuntimeSetting,
    ITianyuShellRuntimeSupport,
} from "../declares/Core";

export const getUIConfigures = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellUIConfigure>(function (
    state,
) {
    const colorDef = state.ui?.theme?.DefaultColor || 1;
    const configure: ITianyuShellUIConfigure = {
        theme: {
            themeUrl: state.ui?.theme?.ThemeURL || Default_UI_Configure_ThemeURL,
            defaultTheme:
                UIValidation.validateTheme(state.ui?.theme?.DefaultTheme) || Default_UI_Configure_DefaultTheme,
            defaultThemeColor:
                typeof colorDef === "string"
                    ? translateThemeColorToId(colorDef)
                    : Number.isNaN(colorDef) || colorDef < 0 || colorDef > 1
                    ? Default_UI_Configure_DefaultThemeColor
                    : colorDef,
            domain: state.ui?.theme?.domain,
            path: state.ui?.theme?.path,
        },
        core: {
            support: getBoolean(state.ui?.core?.support),
            background: state.ui?.background?.color || Default_UI_Configure_DefaultBackgroundColor,
        },
    };

    if (configure.theme.themeUrl.endsWith("/")) {
        configure.theme.themeUrl = configure.theme.themeUrl.substring(0, configure.theme.themeUrl.length - 1);
    }

    return configure;
});

export const getLanguageConfigures = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellCookieConfigure>(
    function (state) {
        return {
            domain: state.core?.language?.domain,
            path: state.core?.language?.path,
        };
    },
);

export const getCoreConfigure = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellCoreBaseConfigure>(
    function (state) {
        const environment = (state.core?.environment || "").toLowerCase();
        return {
            version: state.core?.version || Default_Core_Version,
            environment:
                environment === "production"
                    ? "production"
                    : environment === "development"
                    ? "development"
                    : Default_Core_Environment,
            runtime: {
                console: state.core?.runtime?.console ? true : Default_Core_Runtime_Console,
            },
        };
    },
);

export const getPluginSetting = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellPluginSetting>(function (
    state,
) {
    return {
        globalize: getBoolean(state.core?.plugin?.globalize),
    };
});

export const getRuntimeSetting = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellRuntimeSetting>(function (
    state,
) {
    return {
        enableCache: getBoolean(state.runtime?.globalCache),
        enableStorage: getBoolean(state.runtime?.globalStorage),
    };
});

export const getRuntimeSupport = SelectorFactor.makeSelector<ITianyuShellInitial, ITianyuShellRuntimeSupport>(function (
    state,
) {
    return {
        router: getBoolean(state.runtime?.support?.router),
    };
});
