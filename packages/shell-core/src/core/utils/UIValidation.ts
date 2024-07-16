/**@format */

import { themeList as themeCompatibility } from "infra/Compatibility";
import { getStore } from "./Store";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterfaceExpose } from "./CoreInterfaceExpose";
import { Missing } from "@aitianyu.cn/tianyu-store";

export class UIValidation {
    public static validateTheme(theme?: string): string {
        const getThemes = getStore().selecte(
            TianyuShellCoreInterfaceExpose.compatibility.select.getThemes(getTianyuShellCoreInstanceId()),
        );
        const themeList = getThemes instanceof Missing ? themeCompatibility() : getThemes;
        return theme && themeList.includes(theme) ? theme : "";
    }
}
