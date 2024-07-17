/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { MajorHelper } from "shell-core/src/ui/plugin/MajorHelper";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.MajorHelper", () => {
    it("addClass", () => {
        jest.spyOn(tianyuShell.core.ui.major.helper, "addClass").mockImplementation();

        const classNames = ["a", "b", "c"];
        MajorHelper.addClass(...classNames);

        expect(tianyuShell.core.ui.major.helper.addClass).toHaveBeenCalledWith(...classNames);
    });

    it("addStyle", () => {
        jest.spyOn(tianyuShell.core.ui.major.helper, "addStyle").mockImplementation();

        const classNames = ["a", "b", "c"];
        MajorHelper.addStyle(...classNames);

        expect(tianyuShell.core.ui.major.helper.addStyle).toHaveBeenCalledWith(...classNames);
    });

    it("removeClass", () => {
        jest.spyOn(tianyuShell.core.ui.major.helper, "removeClass").mockImplementation();

        MajorHelper.removeClass("test");

        expect(tianyuShell.core.ui.major.helper.removeClass).toHaveBeenCalledWith("test");
    });

    it("removeClass", () => {
        jest.spyOn(tianyuShell.core.ui.major.helper, "resetStyle").mockImplementation();

        MajorHelper.resetStyle();

        expect(tianyuShell.core.ui.major.helper.resetStyle).toHaveBeenCalled();
    });
});
