/** @format */

import { Cookie } from "shell-core/src/core/plugin/Cookie";
import { getStore } from "shell-core/src/core/utils/Store";
import { UIValidation } from "shell-core/src/core/utils/UIValidation";
import {
    TianyuShellUIThemeCustomCookieColor,
    TianyuShellUIThemeCustomCookieTheme,
} from "shell-core/src/ui/common/Declare";
import {
    addUserTheme,
    getCustomThemeFromCookie,
    getDefaultThemeFromConfigure,
    removeUserTheme,
    saveCustomThemeInCookie,
    updateTianyuShellTheme,
} from "shell-core/src/ui/plugin/handler/StylingHandler";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.handler.StylingHandler", () => {
    describe("removeUserTheme", () => {
        it("not have element", () => {
            jest.spyOn(document, "getElementById").mockReturnValue(null);
            jest.spyOn(document.head, "removeChild");

            const result = removeUserTheme("test");
            expect(result).toBeFalsy();
            expect(document.head.removeChild).not.toHaveBeenCalled();
        });

        it("not have element", () => {
            const html = document.createElement("style");
            jest.spyOn(document, "getElementById").mockReturnValue(html);
            jest.spyOn(document.head, "removeChild").mockImplementation((node) => node);

            const result = removeUserTheme("test");
            expect(result).toBeTruthy();
            expect(document.head.removeChild).toHaveBeenCalled();
        });
    });

    describe("addUserTheme", () => {
        it("-", () => {
            jest.spyOn(document.head, "appendChild").mockImplementation((node) => node);
            addUserTheme("id", "url");
            expect(document.head.appendChild).toHaveBeenCalled();
        });
    });

    describe("getDefaultThemeFromConfigure", () => {
        it("dark", () => {
            jest.spyOn(getStore(), "selecteWithThrow").mockReturnValue({
                theme: {
                    defaultTheme: "color",
                    defaultThemeColor: 0,
                },
            });

            const theme = getDefaultThemeFromConfigure();

            expect(theme.color).toEqual("dark");
            expect(theme.theme).toEqual("color");
        });

        it("light", () => {
            jest.spyOn(getStore(), "selecteWithThrow").mockReturnValue({
                theme: {
                    defaultTheme: "color",
                    defaultThemeColor: 1,
                },
            });

            const theme = getDefaultThemeFromConfigure();

            expect(theme.color).toEqual("light");
            expect(theme.theme).toEqual("color");
        });
    });

    describe("getCustomThemeFromCookie", () => {
        it("dark", () => {
            jest.spyOn(Cookie, "get").mockImplementation((key) => {
                if (key === TianyuShellUIThemeCustomCookieTheme) {
                    return "custom";
                }
                if (key === TianyuShellUIThemeCustomCookieColor) {
                    return "dark";
                }
                return key;
            });
            jest.spyOn(UIValidation, "validateTheme").mockImplementation((theme) => theme || "");

            const theme = getCustomThemeFromCookie();

            expect(theme.color).toEqual("dark");
            expect(theme.theme).toEqual("custom");
        });

        it("light", () => {
            jest.spyOn(Cookie, "get").mockImplementation((key) => {
                if (key === TianyuShellUIThemeCustomCookieTheme) {
                    return "custom";
                }
                if (key === TianyuShellUIThemeCustomCookieColor) {
                    return "light";
                }
                return key;
            });
            jest.spyOn(UIValidation, "validateTheme").mockImplementation((theme) => theme || "");

            const theme = getCustomThemeFromCookie();

            expect(theme.color).toEqual("light");
            expect(theme.theme).toEqual("custom");
        });

        it("no custom theme", () => {
            jest.spyOn(Cookie, "get").mockImplementation((key) => {
                if (key === TianyuShellUIThemeCustomCookieTheme) {
                    return "custom";
                }
                if (key === TianyuShellUIThemeCustomCookieColor) {
                    return "light";
                }
                return key;
            });
            jest.spyOn(UIValidation, "validateTheme").mockImplementation(() => "");
            jest.spyOn(getStore(), "selecteWithThrow").mockReturnValue({
                theme: {
                    defaultTheme: "default",
                    defaultThemeColor: 1,
                },
            });

            const theme = getCustomThemeFromCookie();

            expect(theme.color).toEqual("light");
            expect(theme.theme).toEqual("default");
        });
    });

    describe("saveCustomThemeInCookie", () => {
        it("-", () => {
            jest.spyOn(getStore(), "selecteWithThrow").mockReturnValue({
                theme: {
                    domain: "123",
                    path: "123",
                },
            });
            jest.spyOn(Cookie, "set").mockImplementation();

            saveCustomThemeInCookie("test", "dark");

            expect(Cookie.set).toHaveBeenCalledTimes(2);
        });
    });

    describe("updateTianyuShellTheme", () => {
        it("create new", () => {
            jest.spyOn(document.head, "appendChild").mockImplementation();
            jest.spyOn(document.head, "replaceChild").mockImplementation();
            jest.spyOn(document, "getElementById").mockReturnValue(null);

            updateTianyuShellTheme("test", "light");

            expect(document.head.appendChild).toHaveBeenCalled();
            expect(document.head.replaceChild).not.toHaveBeenCalled();
        });

        it("replace", () => {
            const html = document.createElement("style");
            jest.spyOn(document.head, "appendChild").mockImplementation();
            jest.spyOn(document.head, "replaceChild").mockImplementation();
            jest.spyOn(document, "getElementById").mockReturnValue(html);

            updateTianyuShellTheme("test", "light");

            expect(document.head.appendChild).not.toHaveBeenCalled();
            expect(document.head.replaceChild).toHaveBeenCalled();
        });
    });
});
