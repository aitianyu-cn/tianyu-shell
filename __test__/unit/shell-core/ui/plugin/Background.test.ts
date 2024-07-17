/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { Background } from "shell-core/src/ui/plugin/Background";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Background", () => {
    it("setColor", () => {
        jest.spyOn(tianyuShell.core.ui.background, "setColor");

        Background.setColor("#FFFFFF");

        expect(tianyuShell.core.ui.background.setColor).toHaveBeenCalledWith("#FFFFFF");
    });

    it("getColor", () => {
        jest.spyOn(tianyuShell.core.ui.background, "getColor").mockReturnValue("black");

        expect(Background.getColor()).toEqual("black");
    });

    it("removeColor", () => {
        jest.spyOn(tianyuShell.core.ui.background, "removeColor");

        Background.removeColor();

        expect(tianyuShell.core.ui.background.removeColor).toHaveBeenCalled();
    });

    it("setElement", () => {
        jest.spyOn(tianyuShell.core.ui.background, "setElement");

        const element = document.createElement("div");
        Background.setElement(element);

        expect(tianyuShell.core.ui.background.setElement).toHaveBeenCalledWith(element);
    });

    it("removeElement", () => {
        jest.spyOn(tianyuShell.core.ui.background, "removeElement");

        Background.removeElement();

        expect(tianyuShell.core.ui.background.removeElement).toHaveBeenCalled();
    });

    it("clear", () => {
        jest.spyOn(tianyuShell.core.ui.background, "clear");

        Background.clear();

        expect(tianyuShell.core.ui.background.clear).toHaveBeenCalled();
    });
});
