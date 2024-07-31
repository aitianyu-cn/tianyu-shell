/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { guid } from "@aitianyu.cn/types";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorGlobalAPIs } from "shell-core/src/ui/plugin/apis/MajorAPIs";
import { MajorExpose } from "shell-core/src/ui/plugin/interface/MajorInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.MajorAPIs", () => {
    describe("MajorHelperGlobalAPIs", () => {
        it("addClass", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.layer.addClass.info.fullName);
                expect(actionInstance.params).toEqual(["1", "2"]);
                done();
            });

            MajorGlobalAPIs.helper.addClass(...["1", "2"]);
        });

        it("addStyle", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.layer.addStyle.info.fullName);
                expect(actionInstance.params).toEqual(["1", "2"]);
                done();
            });

            MajorGlobalAPIs.helper.addStyle(...["1", "2"]);
        });

        it("removeClass", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.layer.removeClass.info.fullName);
                expect(actionInstance.params).toEqual("test_class");
                done();
            });

            MajorGlobalAPIs.helper.removeClass("test_class");
        });

        it("resetStyle", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.layer.resetStyling.info.fullName);
                done();
            });

            MajorGlobalAPIs.helper.resetStyle();
        });

        it("resetStyle", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.layer.reset.info.fullName);
                done();
            });

            MajorGlobalAPIs.helper.reset();
        });
    });

    describe("MajorGlobalAPIs", () => {
        it("append", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.major.append.info.fullName);
                done();
            });

            MajorGlobalAPIs.append(document.createElement("div"));
        });

        it("appendInto", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.major.appendInto.info.fullName);
                done();
            });

            MajorGlobalAPIs.appendInto("target", document.createElement("div"));
        });

        it("remove", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.major.remove.info.fullName);
                done();
            });

            MajorGlobalAPIs.remove(document.createElement("div"));
        });

        it("removeFrom", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction;
                expect(actionInstance.action).toEqual(MajorExpose.major.removeFrom.info.fullName);
                done();
            });

            MajorGlobalAPIs.removeFrom("target", document.createElement("div"));
        });

        describe("getElementById", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MajorGlobalAPIs.getElementById("test_id")).toEqual([]);
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(["1", "2", "3"]);
                expect(MajorGlobalAPIs.getElementById("test_id")).toEqual(["1", "2", "3"]);
            });
        });

        describe("getElementByClassName", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MajorGlobalAPIs.getElementByClassName("test_id")).toEqual([]);
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(["1", "2", "3"]);
                expect(MajorGlobalAPIs.getElementByClassName("test_id")).toEqual(["1", "2", "3"]);
            });
        });

        describe("getElementByTagName", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MajorGlobalAPIs.getElementByTagName("test_id")).toEqual([]);
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(["1", "2", "3"]);
                expect(MajorGlobalAPIs.getElementByTagName("test_id")).toEqual(["1", "2", "3"]);
            });
        });

        it("createElement", () => {
            const id = guid();
            const element = MajorGlobalAPIs.createElement("div", id);

            expect(element.id).toEqual(id);
            expect(element.type).toEqual("div");
        });
    });
});
