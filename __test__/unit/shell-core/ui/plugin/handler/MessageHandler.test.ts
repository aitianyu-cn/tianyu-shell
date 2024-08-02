/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
} from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { initLayout, updateMessageLayer } from "shell-core/src/ui/plugin/handler/MessageHandler";
import { MessageInterface } from "shell-core/src/ui/plugin/interface/MessageInterfaceExpose";
import { IMessageHelper } from "shell-core/src/ui/plugin/interface/state/MessageState";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.handler.MessageHandler", () => {
    describe("updateMessageLayer", () => {
        it("left & top align", () => {
            const helper: IMessageHelper = {
                align: {
                    horizontal: ITianyuShellUIHorizontalAlignment.LEFT,
                    vertical: ITianyuShellUIVerticalAlignment.TOP,
                },
                rate: {
                    horizontal: 70,
                    vertical: 70,
                },
                timestamp: 0,
                layerId: "test_layer",
            };
            const layer = document.createElement("div");

            updateMessageLayer(layer, helper);

            expect(layer.id).toEqual("test_layer");
            expect(layer.style.zIndex).toEqual("1000");

            expect(layer.style.width).toEqual("70%");
            expect(layer.style.maxHeight).toEqual("70%");

            expect(layer.style.left).toEqual("0px");
            expect(layer.style.right).toEqual("");

            expect(layer.style.top).toEqual("0px");
            expect(layer.style.bottom).toEqual("");

            expect(layer.style.alignItems).toEqual("flex-start");
        });

        it("right & bottom align", () => {
            const helper: IMessageHelper = {
                align: {
                    horizontal: ITianyuShellUIHorizontalAlignment.RIGHT,
                    vertical: ITianyuShellUIVerticalAlignment.BOTTOM,
                },
                rate: {
                    horizontal: 70,
                    vertical: 70,
                },
                timestamp: 0,
                layerId: "test_layer",
            };
            const layer = document.createElement("div");

            updateMessageLayer(layer, helper);

            expect(layer.id).toEqual("test_layer");
            expect(layer.style.zIndex).toEqual("1000");

            expect(layer.style.width).toEqual("70%");
            expect(layer.style.maxHeight).toEqual("70%");

            expect(layer.style.left).toEqual("");
            expect(layer.style.right).toEqual("0px");

            expect(layer.style.top).toEqual("");
            expect(layer.style.bottom).toEqual("0px");

            expect(layer.style.alignItems).toEqual("flex-end");
        });

        it("center align", () => {
            const helper: IMessageHelper = {
                align: {
                    horizontal: ITianyuShellUIHorizontalAlignment.CENTER,
                    vertical: ITianyuShellUIVerticalAlignment.CENTER,
                },
                rate: {
                    horizontal: 70,
                    vertical: 70,
                },
                timestamp: 0,
                layerId: "test_layer",
            };
            const layer = document.createElement("div");

            updateMessageLayer(layer, helper);

            expect(layer.id).toEqual("test_layer");
            expect(layer.style.zIndex).toEqual("1000");

            expect(layer.style.width).toEqual("70%");
            expect(layer.style.maxHeight).toEqual("70%");

            expect(layer.style.left).toEqual("15%");
            expect(layer.style.right).toEqual("15%");

            expect(layer.style.top).toEqual("15%");
            expect(layer.style.bottom).toEqual("15%");

            expect(layer.style.alignItems).toEqual("center");
        });
    });

    describe("initLayout", () => {
        it("missing", () => {
            const layerHTML = document.createElement("div");

            jest.spyOn(document, "createElement").mockReturnValue(layerHTML);
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => node);

            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

            initLayout();

            expect(layerHTML.id).toEqual("");

            expect(layerHTML.style.width).toEqual("70%");
            expect(layerHTML.style.maxHeight).toEqual("90%");

            expect(layerHTML.style.left).toEqual("15%");
            expect(layerHTML.style.right).toEqual("15%");

            expect(layerHTML.style.top).toEqual("");
            expect(layerHTML.style.bottom).toEqual("0px");

            expect(layerHTML.style.alignItems).toEqual("center");
        });

        it("get from store", () => {
            const layerHTML = document.createElement("div");

            jest.spyOn(document, "createElement").mockReturnValue(layerHTML);
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => node);

            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                if (selector.selector === MessageInterface.control.getId.info.fullName) {
                    return "test_layer";
                }
                if (selector.selector === MessageInterface.control.getHelper.info.fullName) {
                    return {
                        align: {
                            horizontal: ITianyuShellUIHorizontalAlignment.LEFT,
                            vertical: ITianyuShellUIVerticalAlignment.TOP,
                        },
                        rate: {
                            horizontal: 70,
                            vertical: 70,
                        },
                        timestamp: 0,
                        layerId: "test_layer",
                    };
                }
                return new Missing();
            });

            initLayout();

            expect(layerHTML.id).toEqual("test_layer");
            expect(layerHTML.style.zIndex).toEqual("1000");

            expect(layerHTML.style.width).toEqual("70%");
            expect(layerHTML.style.maxHeight).toEqual("70%");

            expect(layerHTML.style.left).toEqual("0px");
            expect(layerHTML.style.right).toEqual("");

            expect(layerHTML.style.top).toEqual("0px");
            expect(layerHTML.style.bottom).toEqual("");

            expect(layerHTML.style.alignItems).toEqual("flex-start");
        });
    });
});
