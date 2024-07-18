/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import { Message } from "shell-core/src/ui/plugin/Message";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Message", () => {
    it("post", () => {
        jest.spyOn(tianyuShell.core.ui.message, "post").mockImplementation();

        Message.post(TianyuShellUIMessageType.INFO, "", "", "", []);

        expect(tianyuShell.core.ui.message.post).toHaveBeenCalled();
    });

    it("close", () => {
        jest.spyOn(tianyuShell.core.ui.message, "close").mockImplementation();

        Message.close("test");

        expect(tianyuShell.core.ui.message.close).toHaveBeenCalledWith("test");
    });

    it("isOpen", () => {
        jest.spyOn(tianyuShell.core.ui.message, "isOpen").mockReturnValue(true);

        expect(Message.isOpen("test")).toBeTruthy();
        expect(tianyuShell.core.ui.message.isOpen).toHaveBeenCalledWith("test");
    });

    it("count", () => {
        jest.spyOn(tianyuShell.core.ui.message, "count").mockReturnValue(3);

        expect(Message.count()).toEqual(3);
        expect(tianyuShell.core.ui.message.count).toHaveBeenCalled();
    });
});
