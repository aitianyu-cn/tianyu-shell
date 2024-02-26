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
import { TianyuShellProcessor } from "shell-core/src/core/utils/Processor";
import * as MessageBundle from "../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";

const _runtimeUIConfigure = TianyuShellProcessor.getUIConfigures();

const fnInitHtmlBasic = (): void => {
    const htmlPageScale = document.createElement("meta");
    htmlPageScale.name = "viewport";
    htmlPageScale.content = "width=device-width,initial-scale=1,shrink-to-fit=no";

    document.head.appendChild(htmlPageScale);
};

let loadingPromise: Promise<void> | undefined = undefined;

if (!_runtimeUIConfigure.core.support) {
    throw new RuntimeNotSupportException(MessageBundle.getText("TIANYU_UI_RUNTIME_NOT_SUPPORT"));
} else {
    loadingPromise = new Promise<void>((resolve, reject) => {
        require.ensure(
            [],
            () => {
                const { initTianyuShellCoreUIStyle } = require("./components/Style");
                const { initTianyuShellCoreUITheme } = require("./components/Theme");
                const { initTianyuShellCoreUIMessage } = require("./components/Message");
                const { initTianyuShellCoreUIDialog } = require("./components/Dialog");
                const { initTianyuShellCoreUIBackground } = require("./components/Background");
                const { initTianyuShellCoreUIMajor } = require("./components/Major");
                const { staticLoader } = require("../resources/Loader");

                try {
                    initTianyuShellCoreUITheme();
                    initTianyuShellCoreUIMessage();
                    initTianyuShellCoreUIStyle();
                    initTianyuShellCoreUIDialog();
                    initTianyuShellCoreUIBackground();
                    initTianyuShellCoreUIMajor();

                    staticLoader();

                    fnInitHtmlBasic();

                    resolve();
                } catch (e) {
                    Log.error((e as any)?.message || "error loading tianyu shell ui core");
                    reject;
                }
            },
            "tianyu-shell/ui/core",
        );
    }).catch(() => {
        // this is an error handling when the promise.reject is not handled in outside
        Log.error(MessageBundle.getText("TIANYU_UI_CORE_LOADING_FAILED"));
    });
}

/**
 * Get a Tianyu Shell UI Core loading status
 *
 * @returns return a promise to wait for tianyu shell UI core loading
 */
export async function waitLoading(): Promise<void> {
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
