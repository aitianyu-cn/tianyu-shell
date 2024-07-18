/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { Style } from "shell-core/src/ui/plugin/Style";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Style", () => {
    it("set", () => {
        jest.spyOn(tianyuShell.core.ui.style, "set").mockImplementation();

        const styling: TianyuUIStyleDeclaration = {};
        Style.set("a", styling, "a/b");

        expect(tianyuShell.core.ui.style.set).toHaveBeenCalledWith("a", styling, "a/b");
    });

    it("get", () => {
        const styling: TianyuUIStyleDeclaration = {
            width: "100px",
        };
        jest.spyOn(tianyuShell.core.ui.style, "get").mockReturnValue(styling);

        const result = Style.get("a", "a/b");

        expect(result).toEqual(styling);
        expect(tianyuShell.core.ui.style.get).toHaveBeenCalledWith("a", "a/b");
    });

    it("remove", () => {
        jest.spyOn(tianyuShell.core.ui.style, "remove").mockImplementation();

        Style.remove("a", "a/b");

        expect(tianyuShell.core.ui.style.remove).toHaveBeenCalledWith("a", "a/b");
    });
});
