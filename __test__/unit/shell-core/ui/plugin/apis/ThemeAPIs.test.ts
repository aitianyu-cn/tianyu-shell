/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { ThemeGlobalAPIs } from "shell-core/src/ui/plugin/apis/ThemeAPIs";
import { StylingInterface } from "shell-core/src/ui/plugin/interface/StylingInterfaceExpose";
import * as StylingHandler from "shell-core/src/ui/plugin/handler/StylingHandler";
import { translateThemeColor } from "shell-core/src/ui/utils/ThemeTranslator";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.ThemeAPIs", () => {
    describe("ThemeUserAPI", () => {
        describe("get", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

                expect(ThemeGlobalAPIs.user.get()).toEqual([]);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(["a", "b"]);

                expect(ThemeGlobalAPIs.user.get()).toEqual(["a", "b"]);
            });
        });

        describe("contains", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

                expect(ThemeGlobalAPIs.user.contains("")).toEqual(false);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(true);

                expect(ThemeGlobalAPIs.user.contains("test")).toEqual(true);
            });
        });

        it("remove", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(StylingInterface.theme.user.remove.info.fullName);
                expect((action as IInstanceAction).params).toEqual("test");

                done();
            });

            ThemeGlobalAPIs.user.remove("test");
        });

        it("reset", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(StylingInterface.theme.user.reset.info.fullName);

                done();
            });

            ThemeGlobalAPIs.user.reset();
        });
    });

    describe("ThemeGlobalAPIs", () => {
        describe("default", () => {
            const env = require("test/config/env.json");

            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValueOnce(new Missing());

                const def = ThemeGlobalAPIs.default;

                expect(def.theme).toEqual(env.ui.theme.DefaultTheme);
                expect(def.color).toEqual(translateThemeColor(env.ui.theme.DefaultColor));
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue({
                    theme: "red",
                    color: "light",
                });

                const def = ThemeGlobalAPIs.default;

                expect(def.theme).toEqual("red");
                expect(def.color).toEqual("light");
            });
        });

        describe("custom", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValueOnce(new Missing());

                const def = ThemeGlobalAPIs.custom;

                expect(def).toBeNull();
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue({
                    theme: "red",
                    color: "light",
                });

                const def = ThemeGlobalAPIs.custom;

                expect(def?.theme).toEqual("red");
                expect(def?.color).toEqual("light");
            });
        });

        it("change", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(StylingInterface.theme.change.info.fullName);
                expect((action as IInstanceAction).params).toEqual({
                    theme: "test",
                    color: "dark",
                });
            });
            jest.spyOn(StylingHandler, "saveCustomThemeInCookie").mockImplementation(() => {
                done();
            });

            ThemeGlobalAPIs.change("test", "dark", true);
        });

        it("reset", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(StylingInterface.theme.reset.info.fullName);

                done();
            });

            ThemeGlobalAPIs.reset();
        });
    });
});
