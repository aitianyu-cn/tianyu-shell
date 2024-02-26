/**@format */

import { themeList as themeCompatibility } from "infra/Compatibility";

export class UIValidation {
    public static validateTheme(theme?: string): string {
        const themeList: string[] = themeCompatibility();
        return theme && themeList.includes(theme) ? theme : "";
    }
}
