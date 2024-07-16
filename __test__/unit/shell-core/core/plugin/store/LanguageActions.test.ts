/** @format */

import { AreaCode } from "@aitianyu.cn/types";
import { Cookie } from "shell-core/src/core/plugin/Cookie";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.store.actions.LanguageActions", () => {
    beforeEach(() => {
        jest.spyOn(Cookie, "set").mockImplementation();
    });

    describe("SetLanguageAction", () => {
        it("set unsupported language", async () => {
            await getStore().dispatch(
                TianyuShellCoreInterface.language.action.set(getTianyuShellCoreInstanceId(), AreaCode.af_ZA),
            );

            expect(Cookie.set).not.toHaveBeenCalled();
        });

        it("set supported language", async () => {
            await getStore().dispatch(
                TianyuShellCoreInterface.language.action.set(getTianyuShellCoreInstanceId(), AreaCode.en_US),
            );

            expect(Cookie.set).toHaveBeenCalled();
        });
    });
});
