/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { Dialog } from "shell-core/src/ui/plugin/Dialog";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Dialog", () => {
    it("open", () => {
        jest.spyOn(tianyuShell.core.ui.dialog, "open").mockImplementation();

        Dialog.open("");

        expect(tianyuShell.core.ui.dialog.open).toHaveBeenCalled();
    });

    it("close", () => {
        jest.spyOn(tianyuShell.core.ui.dialog, "close").mockImplementation();

        Dialog.close("");

        expect(tianyuShell.core.ui.dialog.close).toHaveBeenCalled();
    });

    it("open", () => {
        jest.spyOn(tianyuShell.core.ui.dialog, "isOpen").mockReturnValue(true);

        expect(Dialog.isOpen("")).toBeTruthy();
    });
});
