/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { BackgroundListenerExpose } from "shell-core/src/ui/plugin/interface/BackgroundInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.listener.BackgroundListener", () => {
    describe("BackgroundChangedListener", () => {
        it("no layer id", async () => {
            const { BackgroundChangedListener } = await import("shell-core/src/ui/plugin/listener/BackgroundListener");

            jest.spyOn(document, "getElementById");
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

            BackgroundChangedListener.listener(undefined, undefined);

            expect(document.getElementById).not.toHaveBeenCalled();
        });

        it("no layer", async () => {
            const { BackgroundChangedListener } = await import("shell-core/src/ui/plugin/listener/BackgroundListener");

            jest.spyOn(document, "getElementById");
            jest.spyOn(getStore(), "selecte").mockReturnValue("test layer");

            BackgroundChangedListener.listener(undefined, undefined);

            expect(document.getElementById).toHaveBeenCalled();
        });

        it("remove old element & append new & set new color", async () => {
            const { BackgroundChangedListener } = await import("shell-core/src/ui/plugin/listener/BackgroundListener");

            const layer = document.createElement("div");
            const oldElement = document.createElement("div");
            const newElement = document.createElement("div");

            jest.spyOn(document, "getElementById").mockReturnValue(layer);
            jest.spyOn(layer, "removeChild").mockImplementation((node) => node);
            jest.spyOn(layer, "appendChild").mockImplementation((node) => node);
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                if (selector.selector === BackgroundListenerExpose.control.getId.info.fullName) {
                    return "test-layer";
                }
                if (selector.selector === BackgroundListenerExpose.html.current.info.fullName) {
                    if (selector.params === "old") {
                        return oldElement;
                    }
                    if (selector.params === "new") {
                        return newElement;
                    }
                }
                return new Missing();
            });

            BackgroundChangedListener.listener(
                {
                    color: "red",
                    elementId: "old",
                },
                {
                    color: "blue",
                    elementId: "new",
                },
            );

            expect(layer.removeChild).toHaveBeenCalledWith(oldElement);
            expect(layer.appendChild).toHaveBeenCalledWith(newElement);
            expect(layer.style.background).toEqual("blue");
        });

        it("new is undefined", async () => {
            const { BackgroundChangedListener } = await import("shell-core/src/ui/plugin/listener/BackgroundListener");

            const layer = document.createElement("div");

            jest.spyOn(document, "getElementById").mockReturnValue(layer);

            BackgroundChangedListener.listener(
                {
                    color: "red",
                    elementId: null,
                },
                undefined,
            );

            expect(layer.style.background).toEqual("rgb(255, 255, 255)");
        });
    });
});
