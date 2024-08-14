/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { expectDebugger } from "test/env/TestHookExpection";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.listener.ThemeListener", () => {
    describe("TianyuShellThemeChangeListener", () => {
        beforeEach(() => {
            jest.spyOn(document, "getElementById").mockReturnValue(null);
            jest.spyOn(document.head, "replaceChild").mockImplementation();
            jest.spyOn(document.head, "appendChild").mockImplementation();
        });

        it("new theme is undefined", async () => {
            const { TianyuShellThemeChangeListener } = await import("shell-core/src/ui/plugin/listener/ThemeListener");

            TianyuShellThemeChangeListener.listener(undefined, undefined);

            expect(document.head.appendChild).not.toHaveBeenCalled();
        });

        it("new theme", async () => {
            const { TianyuShellThemeChangeListener } = await import("shell-core/src/ui/plugin/listener/ThemeListener");

            TianyuShellThemeChangeListener.listener(undefined, {
                color: "light",
                theme: "test",
            });

            expect(document.head.appendChild).toHaveBeenCalled();
        });
    });

    describe("UserThemeChangeListener", () => {
        it("no styling list", async () => {
            const { UserThemeChangeListener } = await import("shell-core/src/ui/plugin/listener/ThemeListener");

            jest.spyOn(document.head, "removeChild").mockImplementation();
            jest.spyOn(document.head, "appendChild").mockImplementation();

            UserThemeChangeListener.listener(undefined, undefined);

            expect(document.head.removeChild).not.toHaveBeenCalled();
            expect(document.head.appendChild).not.toHaveBeenCalled();
        });

        it("remove user theme & add new", async () => {
            const { UserThemeChangeListener } = await import("shell-core/src/ui/plugin/listener/ThemeListener");

            const tempElement = document.createElement("div");
            const oldList: string[] = ["1", "2"];
            const newList: string[] = ["2", "3", "4", "5"];

            jest.spyOn(document, "getElementById").mockReturnValue(tempElement);
            jest.spyOn(document.head, "removeChild").mockImplementation();
            jest.spyOn(document.head, "appendChild").mockImplementation();
            jest.spyOn(getStore(), "selecteWithThrow").mockImplementation((selector) => {
                if (selector.params === "3") {
                    return "123";
                }
                if (selector.params === "4") {
                    return "";
                }
                throw new Error();
            });

            UserThemeChangeListener.listener(oldList, newList);

            expect(document.head.appendChild).toHaveBeenCalled();
            expectDebugger().toHaveBeenCalledWith("theme listener - get user theme url failed");
        });
    });
});
