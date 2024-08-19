/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { getStore } from "shell-core/src/core/utils/Store";
import { StyleGlobalAPIs } from "shell-core/src/ui/plugin/apis/StyleAPIs";
import { StylingInterface } from "shell-core/src/ui/plugin/interface/StylingInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.StyleAPIs", () => {
    describe("StyleCssGlobalAPIs", () => {
        it("add", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(StylingInterface.style.css.add.info.fullName);
                expect((action as IInstanceAction<any>).params).toEqual({
                    key: "test",
                    link: "link",
                });

                done();
            });

            StyleGlobalAPIs.css.add("test", "link");
        });

        it("remove", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    StylingInterface.style.css.remove.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual("test");

                done();
            });

            StyleGlobalAPIs.css.remove("test");
        });
    });

    describe("StyleGlobalAPIs", () => {
        it("set", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    StylingInterface.style.tianyuStyle.set.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual({
                    key: "test",
                    styling: {},
                    path: "path",
                });

                done();
            });

            StyleGlobalAPIs.set("test", {}, "path");
        });

        describe("get", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

                const style = StyleGlobalAPIs.get("test", "path");

                expect(style).toEqual({});
            });

            it("missing", () => {
                const styling: TianyuUIStyleDeclaration = {
                    width: "1000px",
                };
                jest.spyOn(getStore(), "selecte").mockReturnValue(styling);

                const style = StyleGlobalAPIs.get("test", "path");

                expect(style).toEqual(styling);
            });
        });

        it("remove", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    StylingInterface.style.tianyuStyle.remove.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual({
                    key: "test",
                    path: "path",
                });

                done();
            });

            StyleGlobalAPIs.remove("test", "path");
        });
    });
});
