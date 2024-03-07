/**@format */

import { themeList as themeCompatibility } from "infra/Compatibility";
import { ITianyuShell } from "../declares/Declare";

export class UIValidation {
    public static validateTheme(theme?: string): string {
        const themeList: string[] = ((window as any).tianyuShell as ITianyuShell)?.runtime?.sync?.theme || themeCompatibility();
        return theme && themeList.includes(theme) ? theme : "";
    }
}
