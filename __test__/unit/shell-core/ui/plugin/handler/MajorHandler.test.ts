/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorGlobalAPIs } from "shell-core/src/ui/plugin/apis/MajorAPIs";
import { generateMajorElement, initMajorLayout } from "shell-core/src/ui/plugin/handler/MajorHandler";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.handler.MajorHandler", () => {
    describe("generateMajorElement", () => {
        it("not supported type", () => {
            expect(() => {
                generateMajorElement([] as any);
            }).toThrow();
        });

        it("string type", () => {
            const div = document.createElement("div");
            div.id = "test_id";
            div.innerText = "test_text";

            jest.spyOn(document, "getElementById").mockReturnValue(div);

            const element = generateMajorElement("test_id");
            expect(element).toEqual(div);
        });

        it("html element", () => {
            const div = document.createElement("div");
            div.id = "test_id";
            div.innerText = "test_text";

            const element = generateMajorElement(div);
            expect(element).toEqual(div);
        });

        it("tianyu ui and create new", () => {
            const tianyuUI = MajorGlobalAPIs.createElement("div", "test_id");

            const element = generateMajorElement(tianyuUI);
            expect(element).not.toBeNull();
            expect(element?.id).toEqual("test_id");
        });

        it("tianyu ui and not create new", () => {
            const div = document.createElement("div");
            div.id = "test_id";
            div.innerText = "test_text";

            const tianyuUI = MajorGlobalAPIs.createElement("div", "test_id");

            jest.spyOn(document, "getElementById").mockReturnValue(div);

            const element = generateMajorElement(tianyuUI, true);
            expect(element).not.toBeNull();
            expect(element?.id).toEqual("test_id");
            expect(element?.innerText).toEqual("test_text");
        });
    });

    describe("initMajorLayout", () => {
        it("get layer id missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
                const div = node as HTMLElement;
                expect(div.id).toEqual("");
                return node;
            });

            initMajorLayout();
        });

        it("get layer id missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue("test_layer_id");
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
                const div = node as HTMLElement;
                expect(div.id).toEqual("test_layer_id");
                return node;
            });

            initMajorLayout();
        });
    });
});
