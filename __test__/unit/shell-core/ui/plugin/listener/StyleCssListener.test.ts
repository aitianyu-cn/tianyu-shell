/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { expectDebugger } from "test/env/TestHookExpection";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.listener.StyleCssListener", () => {
    describe("StyleCssChangedListener", () => {
        it("remove old & add new", async () => {
            const { StyleCssChangedListener } = await import("shell-core/src/ui/plugin/listener/StyleCssListener");

            const oldList: string[] = ["1", "2"];
            const newList: string[] = ["2", "3", "4", "5"];

            const cssDiv = document.createElement("div");

            jest.spyOn(document.head, "appendChild");
            jest.spyOn(getStore(), "selecteWithThrow").mockImplementation((selector) => {
                if (selector.params === "3") {
                    return cssDiv;
                }
                if (selector.params === "4") {
                    return undefined;
                }
                throw new Error();
            });

            StyleCssChangedListener.listener(oldList, newList);

            expect(document.head.appendChild).toHaveBeenCalledWith(cssDiv);
            expectDebugger().toHaveBeenCalledWith("style css listener - get style element failed");
        });

        it("empty css lists", async () => {
            const { StyleCssChangedListener } = await import("shell-core/src/ui/plugin/listener/StyleCssListener");

            jest.spyOn(document.head, "appendChild");

            StyleCssChangedListener.listener(undefined, undefined);

            expect(document.head.appendChild).not.toHaveBeenCalled();
        });
    });
});
