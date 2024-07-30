/** @format */

import { Log } from "shell-core/src/core/plugin/Console";
import { renderHTML } from "shell-core/src/ui/utils/DomHelper";
import * as HTMLCreatorHandler from "shell-core/src/ui/plugin/handler/Creator";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.utils.DomHelper", () => {
    describe("renderHTML", () => {
        it("provids parent name and parent not exist", () => {
            jest.spyOn(Log, "error").mockImplementation();

            renderHTML("this is a unknown html id", {
                id: "",
                type: "div",
                style: {},
            });

            expect(Log.error).toHaveBeenCalled();
        });

        it("provids parent and set success", () => {
            jest.spyOn(Log, "error").mockImplementation();
            jest.spyOn(HTMLCreatorHandler, "createHTMLbyTianyuUI").mockReturnValue(document.createElement("div"));

            const parent = document.createElement("div");
            jest.spyOn(parent, "appendChild").mockImplementation();

            renderHTML(parent, {
                id: "",
                type: "div",
                style: {},
            });

            expect(Log.error).not.toHaveBeenCalled();
            expect(parent.appendChild).toHaveBeenCalled();
        });
    });
});
