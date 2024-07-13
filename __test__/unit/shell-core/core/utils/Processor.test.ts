/**@format */

import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/TianyuShell";
import { TianyuShellProcessor } from "../../../../../packages/shell-core/src/core/utils/Processor";
import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.utils.Processor", () => {
    const config = require("../../../../config/env.json") as ITianyuShellInitial;

    beforeEach(() => {
        initialTianyuShell(config);
    });

    describe("TianyuShellProcessor", () => {
        it("getUIConfigures", () => {
            const uiConfigure = TianyuShellProcessor.getUIConfigures();
            const themeUrl: string = config.ui?.theme?.ThemeURL || "";
            expect(uiConfigure.theme.defaultTheme).toEqual(config.ui?.theme?.DefaultTheme);
            expect(uiConfigure.theme.defaultThemeColor).toEqual(config.ui?.theme?.DefaultColor);
            expect(uiConfigure.theme.themeUrl).toEqual(themeUrl.substring(0, themeUrl.length - 1));
            expect(uiConfigure.core.support).toEqual(config.ui?.core?.support);
        });
        it("getCoreConfigure", () => {
            const coreConfigure = TianyuShellProcessor.getCoreConfigure();
            expect(coreConfigure.environment).toEqual(config.core?.environment);
            expect(coreConfigure.runtime.console).toEqual(config.core?.runtime?.console);
            expect(coreConfigure.version).toEqual(config.core?.version);
        });
        it("getPluginSetting", () => {
            const pluginSetting = TianyuShellProcessor.getPluginSetting();
            expect(pluginSetting.globalize).toEqual(config.core?.plugin?.globalize);
        });
        it("getRuntimeSetting", () => {
            const runtimeSetting = TianyuShellProcessor.getRuntimeSetting();
            expect(runtimeSetting.enableCache).toEqual(config.runtime?.globalCache);
            expect(runtimeSetting.enableStorage).toEqual(config.runtime?.globalStorage);
        });
        it("getRuntimeSupport", () => {
            const runtimeSupport = TianyuShellProcessor.getRuntimeSupport();
            expect(runtimeSupport.router).toEqual(config.runtime?.support?.router);
        });
    });
});
