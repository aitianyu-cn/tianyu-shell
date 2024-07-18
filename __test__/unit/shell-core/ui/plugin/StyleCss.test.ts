/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { StyleCss } from "shell-core/src/ui/plugin/StyleCss";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.StyleCss", () => {
    it("add", () => {
        jest.spyOn(tianyuShell.core.ui.style.css, "add").mockImplementation();

        StyleCss.add("test", "link");

        expect(tianyuShell.core.ui.style.css.add).toHaveBeenCalledWith("test", "link");
    });

    it("remove", () => {
        jest.spyOn(tianyuShell.core.ui.style.css, "remove").mockImplementation();

        StyleCss.remove("test");

        expect(tianyuShell.core.ui.style.css.remove).toHaveBeenCalledWith("test");
    });
});
