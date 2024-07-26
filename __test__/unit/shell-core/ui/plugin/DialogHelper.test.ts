/** @format */

import { guid } from "@aitianyu.cn/types";
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { DialogHelper } from "shell-core/src/ui/plugin/DialogHelper";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.DialogHelper", () => {
    it("count", () => {
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "count").mockReturnValue(2);

        expect(DialogHelper.count()).toEqual(2);
    });

    it("create", async () => {
        const id = guid();
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "create").mockReturnValue(Promise.resolve(id));

        const createdId = await DialogHelper.create();
        expect(createdId).toEqual(id);
    });

    it("layers", () => {
        const ids = [guid(), guid(), guid()];
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "layers").mockReturnValue(ids);

        expect(DialogHelper.layers()).toEqual(ids);
    });

    it("switch", () => {
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "switch").mockImplementation();

        const id = guid();
        DialogHelper.switch(id);

        expect(tianyuShell.core.ui.dialog.layer.switch).toHaveBeenCalledWith(id);
    });

    it("remove", () => {
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "remove").mockImplementation();

        const id = guid();
        DialogHelper.remove(id);

        expect(tianyuShell.core.ui.dialog.layer.remove).toHaveBeenCalledWith(id);
    });

    it("current", () => {
        const id = guid();
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "current").mockReturnValue(id);

        expect(DialogHelper.current()).toEqual(id);
    });

    it("count", () => {
        jest.spyOn(tianyuShell.core.ui.dialog.layer, "index").mockReturnValue(2);

        expect(DialogHelper.index()).toEqual(2);
    });
});
