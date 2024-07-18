/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { CustomizedTheme } from "shell-core/src/ui/plugin/UserTheme";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.UserTheme", () => {
    it("get", () => {
        jest.spyOn(tianyuShell.core.ui.theme.user, "get").mockReturnValue(["a", "b"]);

        expect(CustomizedTheme.get()).toEqual(["a", "b"]);
        expect(tianyuShell.core.ui.theme.user.get).toHaveBeenCalled();
    });

    it("contains", () => {
        jest.spyOn(tianyuShell.core.ui.theme.user, "contains").mockReturnValue(true);

        expect(CustomizedTheme.contains("test")).toEqual(true);
        expect(tianyuShell.core.ui.theme.user.contains).toHaveBeenCalledWith("test");
    });

    it("remove", () => {
        jest.spyOn(tianyuShell.core.ui.theme.user, "remove").mockImplementation();

        CustomizedTheme.remove("test");

        expect(tianyuShell.core.ui.theme.user.remove).toHaveBeenCalledWith("test");
    });

    it("reset", () => {
        jest.spyOn(tianyuShell.core.ui.theme.user, "reset").mockImplementation();

        CustomizedTheme.reset();

        expect(tianyuShell.core.ui.theme.user.reset).toHaveBeenCalled();
    });
});
