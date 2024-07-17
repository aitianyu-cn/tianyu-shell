/** @format */

import { StylingURLHandler, ThemeURLHandler } from "shell-core/src/ui/resources/URLHandler";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.resources.URLHandler", () => {
    describe("ThemeURLHandler", () => {
        it("getURL", () => {
            expect(ThemeURLHandler.getURL("test", "dark")).toEqual(
                "https://resource.aitianyu.cn/resources/common/theme/dark/test.css",
            );
        });
    });

    describe("StylingURLHandler", () => {
        it("staticURL", () => {
            const style = StylingURLHandler.staticURL("test") as HTMLLinkElement;

            expect(style.id).toEqual("tianyu_shell_ui_static_test");
            expect(style.href).toEqual("https://resource.aitianyu.cn/resources/tianyu-shell/static/test.css");
            expect(style.rel).toEqual("stylesheet");
            expect(style.type).toEqual("text/css");
        });
    });
});
