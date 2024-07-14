/** @format */

import {
    TianyuShellInfraInterfaceExpose,
    getTianyuShellInfraInstanceId,
} from "shell-core/src/core/utils/InfraInterfaceExpose";
import { getStore } from "shell-core/src/core/utils/Store";
import { TianyuShellUICustomAppliedPreious } from "../common/Declare";
import { Missing } from "@aitianyu.cn/tianyu-store";

export function formatUserThemeURL(style: string): string {
    const configure = getStore().selecte(
        TianyuShellInfraInterfaceExpose.getUIConfigures(getTianyuShellInfraInstanceId()),
    );

    return `${configure instanceof Missing ? "" : configure.theme.themeUrl}/${style}`;
}

export function formatUserThemeId(id: string): string {
    return `${TianyuShellUICustomAppliedPreious}_${id}`;
}
