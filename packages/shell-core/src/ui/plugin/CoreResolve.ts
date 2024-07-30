/**@format */

import { Log } from "shell-core/src/core/plugin/Console";

function fnInitHtmlBasic(): void {
    const htmlPageScale = document.createElement("meta");
    htmlPageScale.name = "viewport";
    htmlPageScale.content = "width=device-width,initial-scale=1,shrink-to-fit=no";

    document.head.appendChild(htmlPageScale);
}

export async function loadingTianyuShellUICore(): Promise<void> {
    try {
        const { initTianyuShellCoreUIStyling } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/core" */ "./components/StylingResolve"
        );
        const { initTianyuShellCoreUIMessage } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Message"
        );
        const { initTianyuShellCoreUIDialog } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Dialog"
        );
        const { initTianyuShellCoreUIBackground } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Background"
        );
        const { initTianyuShellCoreUIMajor } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/shell" */ "./components/Major"
        );
        const { staticLoader } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/ui/resources" */ "../resources/Loader"
        );

        await initTianyuShellCoreUIStyling();
        await initTianyuShellCoreUIMessage();
        await initTianyuShellCoreUIDialog();
        await initTianyuShellCoreUIBackground();
        await initTianyuShellCoreUIMajor();

        staticLoader();

        fnInitHtmlBasic();
    } catch (e) /* istanbul ignore next */ {
        Log.error((e as any)?.message || "error loading tianyu shell ui core");
        return Promise.reject();
    }
}
