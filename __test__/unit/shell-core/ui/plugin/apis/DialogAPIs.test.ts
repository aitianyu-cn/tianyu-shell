/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { DialogGlobalAPIs } from "shell-core/src/ui/plugin/apis/DialogAPIs";
import { DialogExpose } from "shell-core/src/ui/plugin/interface/DialogInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.DialogAPIs", () => {
    describe("DialogLayerGlobalAPI", () => {
        describe("count", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(DialogGlobalAPIs.layer.count()).toEqual(0);
            });

            it("get current value", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(5);
                expect(DialogGlobalAPIs.layer.count()).toEqual(5);
            });
        });

        describe("create", () => {
            it("create success", async () => {
                let layerId = "";
                jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                    const actionInstance = action as IInstanceAction<any>;
                    expect(actionInstance.action).toEqual(DialogExpose.layer.add.info.fullName);
                    layerId = actionInstance.params;
                });

                jest.spyOn(getStore(), "selecte").mockReturnValue(true);

                const createdLayer = await DialogGlobalAPIs.layer.create();
                expect(createdLayer).toEqual(layerId);
            });

            it("create failed with missing", async () => {
                jest.spyOn(getStore(), "dispatch").mockReturnValue(Promise.resolve());
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

                const createdLayer = await DialogGlobalAPIs.layer.create();
                expect(createdLayer).toBeNull();
            });

            it("create failed with empty value", async () => {
                jest.spyOn(getStore(), "dispatch").mockReturnValue(Promise.resolve());
                jest.spyOn(getStore(), "selecte").mockReturnValue(false);

                const createdLayer = await DialogGlobalAPIs.layer.create();
                expect(createdLayer).toBeNull();
            });
        });

        describe("layers", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(DialogGlobalAPIs.layer.layers()).toEqual([]);
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(["1", "2", "3"]);
                expect(DialogGlobalAPIs.layer.layers()).toEqual(["1", "2", "3"]);
            });
        });

        it("switch", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction<any>;
                expect(actionInstance.action).toEqual(DialogExpose.layer.switch.info.fullName);
                expect(actionInstance.params).toEqual("test_layer_id");
                done();
            });

            DialogGlobalAPIs.layer.switch("test_layer_id");
        });

        it("remove", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction<any>;
                expect(actionInstance.action).toEqual(DialogExpose.layer.remove.info.fullName);
                expect(actionInstance.params).toEqual("test_layer_id");
                done();
            });

            DialogGlobalAPIs.layer.remove("test_layer_id");
        });

        describe("current", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(DialogGlobalAPIs.layer.current()).toEqual("");
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue("test_layer_id");
                expect(DialogGlobalAPIs.layer.current()).toEqual("test_layer_id");
            });
        });

        describe("index", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(DialogGlobalAPIs.layer.index()).toEqual(0);
            });

            it("get current value", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(5);
                expect(DialogGlobalAPIs.layer.index()).toEqual(5);
            });
        });
    });

    describe("DialogGlobalAPIs", () => {
        it("open", async () => {
            let generatedDialogId = "test_dialog_id";
            let fnResolve = () => {};
            const dispatchPromise = new Promise<void>((resolve) => {
                fnResolve = resolve;
            });
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction<any>;
                generatedDialogId = actionInstance.params.id;
                expect(actionInstance.action).toEqual(DialogExpose.open.info.fullName);
                expect(actionInstance.params.element).toEqual("test_dialog_element");
                fnResolve();
            });

            const dialogId = DialogGlobalAPIs.open("test_dialog_element");
            expect(dialogId).toEqual(generatedDialogId);

            await dispatchPromise;
        });

        it("close", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                const actionInstance = action as IInstanceAction<any>;
                expect(actionInstance.action).toEqual(DialogExpose.close.info.fullName);
                expect(actionInstance.params).toEqual("test_dialog_id");
                done();
            });

            DialogGlobalAPIs.close("test_dialog_id");
        });

        describe("isOpen", () => {
            it("get missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(DialogGlobalAPIs.isOpen("test_dialog_id")).toBeFalsy();
            });

            it("get success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(true);
                expect(DialogGlobalAPIs.isOpen("test_dialog_id")).toBeTruthy();
            });

            it("no provided id", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(true);
                expect(DialogGlobalAPIs.isOpen()).toBeTruthy();
            });
        });
    });
});
