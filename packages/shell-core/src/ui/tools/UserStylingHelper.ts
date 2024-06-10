/** @format */

import { TianyuShellProcessor } from "shell-core/src/core/utils/Processor";
import { TianyuShellUICustomAppliedPreious } from "../common/Declare";

export const RuntimeUIConfigure = TianyuShellProcessor.getUIConfigures();

export function formatUserThemeURL(style: string): string {
    return `${RuntimeUIConfigure.theme.themeUrl}/${style}`;
}

export function formatUserThemeId(id: string): string {
    return `${TianyuShellUICustomAppliedPreious}_${id}`;
}
