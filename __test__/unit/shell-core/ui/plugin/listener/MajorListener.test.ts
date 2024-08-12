/** @format */

import { expectDebugger } from "test/env/TestHookExpection";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.listener.MajorListener", () => {
    describe("MajorClassesChangedListener", () => {
        it("new layer is not provided", async () => {
            const { MajorClassesChangedListener } = await import("shell-core/src/ui/plugin/listener/MajorListener");

            MajorClassesChangedListener.listener(undefined, {
                layer: {
                    layerId: "test-layer-id",
                    layerRoot: null,
                },
                classNames: [],
            });

            expectDebugger().toHaveBeenCalled();
        });

        it("change new layer", async () => {
            const { MajorClassesChangedListener } = await import("shell-core/src/ui/plugin/listener/MajorListener");

            const div = document.createElement("div");

            jest.spyOn(div.classList, "remove");
            jest.spyOn(div.classList, "add");

            MajorClassesChangedListener.listener(undefined, {
                layer: {
                    layerId: "test-layer-id",
                    layerRoot: div,
                },
                classNames: [],
            });

            expectDebugger().not.toHaveBeenCalled();
            expect(div.classList.remove).toHaveBeenCalled();
            expect(div.classList.add).toHaveBeenCalled();
        });
    });

    describe("MajorStylingChangedListener", () => {
        it("new layer is not provided", async () => {
            const { MajorStylingChangedListener } = await import("shell-core/src/ui/plugin/listener/MajorListener");

            MajorStylingChangedListener.listener(undefined, {
                layer: {
                    layerId: "test-layer-id",
                    layerRoot: null,
                },
                stylings: {},
            });

            expectDebugger().toHaveBeenCalled();
        });

        it("has layer", async () => {
            const { MajorStylingChangedListener } = await import("shell-core/src/ui/plugin/listener/MajorListener");

            const div = document.createElement("div");
            div.style.height = "100px";
            expect(div.style.cssText).not.toEqual("");

            MajorStylingChangedListener.listener(undefined, {
                layer: {
                    layerId: "test-layer-id",
                    layerRoot: div,
                },
                stylings: {},
            });

            expectDebugger().not.toHaveBeenCalled();
            expect(div.style.cssText).toEqual("");
        });
    });
});
