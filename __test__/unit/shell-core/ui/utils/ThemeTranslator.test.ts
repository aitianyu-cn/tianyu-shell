/** @format */

import { translateThemeColor, translateThemeColorToId } from "shell-core/src/ui/utils/ThemeTranslator";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.utils.ThemeTranslator", () => {
    describe("translateThemeColor", () => {
        it("test for light", () => {
            expect(translateThemeColor(1)).toEqual("light");
        });

        it("test for dark", () => {
            expect(translateThemeColor(0)).toEqual("dark");
        });
    });

    describe("translateThemeColorToId", () => {
        it("test for light", () => {
            expect(translateThemeColorToId("LigHT")).toEqual(1);
        });

        it("test for dark", () => {
            expect(translateThemeColorToId("")).toEqual(0);
        });
    });
});
