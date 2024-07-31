/** @format */

import { IBatchAction } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorGlobalAPIs } from "shell-core/src/ui/plugin/apis/MajorAPIs";
import {
    generateDialogElement,
    generateDialogLayerBase,
    initDialogLayout,
} from "shell-core/src/ui/plugin/handler/DialogHandler";
import { DialogExpose } from "shell-core/src/ui/plugin/interface/DialogInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.handler.DialogHandler", () => {
    describe("generateDialogLayerBase", () => {
        it("-", () => {
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
                const div = node as HTMLDivElement;
                expect(div.id).toEqual("123456789");
                expect(div.style.zIndex).toEqual("2200");
                return node;
            });

            generateDialogLayerBase("123456789", 2);
        });
    });

    describe("generateDialogElement", () => {
        it("string type", () => {
            const element = generateDialogElement({
                id: "test_id",
                element: "test element",
            });

            expect(element.id).toEqual("test_id");
        });

        it("tianyu ui type", () => {
            const element = generateDialogElement({
                id: "test_id",
                element: MajorGlobalAPIs.createElement("div", "test_id"),
            });

            expect(element.id).toEqual("test_id");
        });
    });

    describe("initDialogLayout", () => {
        it("-", async () => {
            let layerId = "";
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (actions) => {
                const batchActions = actions as IBatchAction;
                expect(batchActions.actions.length).toEqual(2);
                expect(batchActions.actions[0].action).toEqual(DialogExpose.layer.add.info.fullName);
                expect(batchActions.actions[1].action).toEqual(DialogExpose.layer.switch.info.fullName);
                layerId = batchActions.actions[0].params;
            });

            expect(await initDialogLayout()).toEqual(layerId);
        });
    });
});
