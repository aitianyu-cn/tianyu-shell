/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { BackgroundGlobalAPI } from "shell-core/src/ui/plugin/apis/BackgroundAPIs";
import { BackgroundInterface } from "shell-core/src/ui/plugin/interface/BackgroundInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.BackgroundAPIs", () => {
    it("setColor", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(BackgroundInterface.color.set.info.fullName);
            expect((action as IInstanceAction).params).toEqual("#aaaaaa");

            done();
        });

        BackgroundGlobalAPI.setColor("#aaaaaa");
    });

    describe("getColor", () => {
        it("missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

            expect(BackgroundGlobalAPI.getColor()).toEqual("#ffffff");
        });

        it("get color", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue("red");

            expect(BackgroundGlobalAPI.getColor()).toEqual("red");
        });
    });

    it("removeColor", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(BackgroundInterface.color.remove.info.fullName);

            done();
        });

        BackgroundGlobalAPI.removeColor();
    });

    it("setElement", (done) => {
        const element = document.createElement("div");

        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(BackgroundInterface.html.set.info.fullName);
            expect((action as IInstanceAction).params).toEqual({
                element,
                id: "test",
            });

            done();
        });

        BackgroundGlobalAPI.setElement(element, "test");
    });

    it("removeElement", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(BackgroundInterface.html.clear.info.fullName);

            done();
        });

        BackgroundGlobalAPI.removeElement();
    });

    it("clear", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(BackgroundInterface.control.reset.info.fullName);

            done();
        });

        BackgroundGlobalAPI.clear();
    });
});
