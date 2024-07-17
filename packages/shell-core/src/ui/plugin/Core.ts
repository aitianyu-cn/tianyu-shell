/**@format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { RuntimeNotSupportException } from "shell-core/src/core/declares/Exception";
import {
    ITianyuShellCoreUITheme,
    ITianyuShellCoreUIMessage,
    ITianyuShellCoreUIStyle,
    ITianyuShellCoreUIDialog,
    ITianyuShellCoreUIBackground,
    ITianyuShellCoreUIMajor,
} from "shell-core/src/core/declares/ui/UserInterface";
import * as MessageBundle from "../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";
import { loadingTianyuShellUICore } from "./CoreResolve";
import { getStore } from "shell-core/src/core/utils/Store";
import {
    getTianyuShellInfraInstanceId,
    TianyuShellInfraInterfaceExpose,
} from "shell-core/src/core/utils/InfraInterfaceExpose";

let loadingPromise: Promise<void> | undefined = undefined;

const _runtimeUIConfigure = getStore().selecteWithThrow(
    TianyuShellInfraInterfaceExpose.getUIConfigures(getTianyuShellInfraInstanceId()),
);
if (!_runtimeUIConfigure.core.support) {
    throw new RuntimeNotSupportException(MessageBundle.getText("TIANYU_UI_RUNTIME_NOT_SUPPORT"));
} else {
    loadingPromise = loadingTianyuShellUICore().catch(() => {
        // this is an error handling when the promise.reject is not handled in outside
        Log.error(MessageBundle.getText("TIANYU_UI_CORE_LOADING_FAILED"));
    });
}

/**
 * Get a Tianyu Shell UI Core loading status
 *
 * @returns return a promise to wait for tianyu shell UI core loading
 */
export async function waitUILoading(): Promise<void> {
    if (!loadingPromise) {
        return Promise.resolve();
    } else {
        return loadingPromise;
    }
}

export function ThemeBase(): ITianyuShellCoreUITheme {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.theme;
}
export function MessageBase(): ITianyuShellCoreUIMessage {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.message;
}
export function StyleBase(): ITianyuShellCoreUIStyle {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.style;
}
export function DialogBase(): ITianyuShellCoreUIDialog {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.dialog;
}
export function BackgroundBase(): ITianyuShellCoreUIBackground {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.background;
}
export function MajorBase(): ITianyuShellCoreUIMajor {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.major;
}
