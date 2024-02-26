/**@format */

import { getBoolean } from "@aitianyu.cn/types";
import {
    CoreEnvironment,
    ITianyuShellCoreBaseConfigure,
    ITianyuShellPluginSetting,
    ITianyuShellRuntimeSetting,
    ITianyuShellRuntimeSupport,
} from "../declares/Core";
import { ITianyuShellUIConfigure } from "../declares/ui/UserInterface";
import { ITianyuShellInitial } from "../ITianyuShellInitial";
import { translateThemeColorToId } from "shell-core/src/ui/utils/ThemeTranslator";
import { UIValidation } from "./UIValidation";

const Default_UI_Configure_ThemeURL: string = "/static/theme";
const Default_UI_Configure_DefaultTheme: string = "tianyu-default";
const Default_UI_Configure_DefaultThemeColor: number = 1;
const Default_UI_Configure_DefaultBackgroundColor: string = "#FFFFFF";

const Default_Core_Version: string = "0.0.0.0";
const Default_Core_Environment: CoreEnvironment = "development";
const Default_Core_Runtime_Console: boolean = false;

export class TianyuShellProcessor {
    /**
     * Get tianyu shell UI configure
     *
     * @returns return config
     */
    public static getUIConfigures(): ITianyuShellUIConfigure {
        const colorDef = ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.ui?.theme?.DefaultColor || 1;
        const configure: ITianyuShellUIConfigure = {
            theme: {
                themeUrl:
                    ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.ui?.theme?.ThemeURL ||
                    Default_UI_Configure_ThemeURL,
                defaultTheme:
                    UIValidation.validateTheme(
                        ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.ui?.theme?.DefaultTheme,
                    ) || Default_UI_Configure_DefaultTheme,
                defaultThemeColor:
                    typeof colorDef === "string"
                        ? translateThemeColorToId(colorDef)
                        : Number.isNaN(colorDef) || colorDef < 0 || colorDef > 1
                        ? Default_UI_Configure_DefaultThemeColor
                        : colorDef,
            },
            core: {
                support: getBoolean(((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.ui?.core?.support),
                background:
                    ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.ui?.background?.color ||
                    Default_UI_Configure_DefaultBackgroundColor,
            },
        };

        if (configure.theme.themeUrl.endsWith("/")) {
            configure.theme.themeUrl = configure.theme.themeUrl.substring(0, configure.theme.themeUrl.length - 1);
        }

        return configure;
    }

    /**
     * Get tianyu shell Core part configure
     *
     * @returns return config
     */
    public static getCoreConfigure(): ITianyuShellCoreBaseConfigure {
        const environment = (
            ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.core?.environment || ""
        ).toLowerCase();
        return {
            version: ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.core?.version || Default_Core_Version,
            environment:
                environment === "production"
                    ? "production"
                    : environment === "development"
                    ? "development"
                    : Default_Core_Environment,
            runtime: {
                console: ((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.core?.runtime?.console
                    ? true
                    : Default_Core_Runtime_Console,
            },
        };
    }

    /**
     * Get tianyu shell plugin configure
     *
     * @returns return config
     */
    public static getPluginSetting(): ITianyuShellPluginSetting {
        return {
            globalize: getBoolean(((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.core?.plugin?.globalize),
        };
    }

    /**
     * Get tianyu shell runtime setting
     *
     * @returns return setting
     */
    public static getRuntimeSetting(): ITianyuShellRuntimeSetting {
        return {
            enableCache: getBoolean(((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.runtime?.globalCache),
            enableStorage: getBoolean(((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.runtime?.globalStorage),
        };
    }

    /**
     * Get tianyu shell runtime supported feature
     *
     * @returns return support list
     */
    public static getRuntimeSupport(): ITianyuShellRuntimeSupport {
        return {
            router: getBoolean(((window as any).tianyuShell?.env?.config as ITianyuShellInitial)?.runtime?.support?.router),
        };
    }
}
