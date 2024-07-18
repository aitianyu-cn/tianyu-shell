/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { Theme } from "shell-core/src/ui/plugin/Theme";
import { translateThemeColor } from "shell-core/src/ui/utils/ThemeTranslator";
import * as UICoreImport from "shell-core/src/ui/plugin/Core";
import { ITheme } from "shell-core/src/ui/common/Interface";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Theme", () => {
    const envConfig = require("test/config/env.json");

    it("getDefault", () => {
        const theme = Theme.getDefault();

        expect(theme.theme).toEqual(envConfig.ui.theme.DefaultTheme);
        expect(theme.color).toEqual(translateThemeColor(envConfig.ui.theme.DefaultColor));
    });

    describe("getCustome", () => {
        it("has custom theme", () => {
            const oThemeBase = {
                custom: {
                    theme: "tianyu-red",
                    color: "light",
                },
            };
            jest.spyOn(UICoreImport, "ThemeBase").mockReturnValue(oThemeBase as any);

            const theme = Theme.getCustome();

            expect(!!theme).toBeTruthy();
            expect(theme?.theme).toEqual("tianyu-red");
            expect(theme?.color).toEqual("light");
        });

        it("not custom theme", () => {
            const oThemeBase = {
                custom: undefined,
            };
            jest.spyOn(UICoreImport, "ThemeBase").mockReturnValue(oThemeBase as any);

            const theme = Theme.getCustome();

            expect(theme).toBeNull();
        });
    });

    it("change", () => {
        jest.spyOn(tianyuShell.core.ui.theme, "change").mockImplementation();

        const theme: ITheme = {
            theme: "red",
            color: "dark",
        };
        Theme.change(theme, true);

        expect(tianyuShell.core.ui.theme.change).toHaveBeenCalledWith("red", "dark", true);
    });

    it("reset", () => {
        jest.spyOn(tianyuShell.core.ui.theme, "reset").mockImplementation();

        Theme.reset();

        expect(tianyuShell.core.ui.theme.reset).toHaveBeenCalled();
    });
});
