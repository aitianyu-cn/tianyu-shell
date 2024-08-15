/** @format */

import {
    GetBackgroundCurrentHTMLElement,
    GetBackgroundHTMLElements,
} from "shell-core/src/ui/plugin/interface/selector/BackgroundSelector";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.interface.BackgroundSelector", () => {
    describe("GetBackgroundHTMLElements", () => {
        it("test for external result is undefined", () => {
            const elements = GetBackgroundHTMLElements.getter({} as any, undefined);
            expect(elements.length).toEqual(0);
        });
    });

    describe("GetBackgroundCurrentHTMLElement", () => {
        it("test for external result is undefined", () => {
            const element = GetBackgroundCurrentHTMLElement.getter({} as any, "", undefined);
            expect(element).toBeUndefined();
        });
    });
});
