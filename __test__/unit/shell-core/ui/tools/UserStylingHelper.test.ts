/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { formatUserThemeId, formatUserThemeURL } from "shell-core/src/ui/tools/UserStylingHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.tools.UserStylingHelper", () => {
    describe("formatUserThemeURL", () => {
        it("missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
            expect(formatUserThemeURL("test-url")).toEqual("/test-url");
        });

        it("success", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue({
                theme: {
                    themeUrl: "http://aitianyu.cn",
                },
            });
            expect(formatUserThemeURL("test-url")).toEqual("http://aitianyu.cn/test-url");
        });
    });

    it("formatUserThemeId", () => {
        expect(formatUserThemeId("test")).toEqual("tianyu_shell_ui-custom_test");
    });
});
