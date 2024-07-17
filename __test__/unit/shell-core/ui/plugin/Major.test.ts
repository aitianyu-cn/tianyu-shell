/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { Major } from "shell-core/src/ui/plugin/Major";

declare const tianyuShell: ITianyuShell;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.Major", () => {
    it("append", () => {
        const elem = document.createElement("div");

        jest.spyOn(tianyuShell.core.ui.major, "append").mockImplementation();

        Major.append(elem);

        expect(tianyuShell.core.ui.major.append).toHaveBeenCalledWith(elem);
    });

    it("appendInto", () => {
        const elem = document.createElement("div");
        const elemTarget = document.createElement("div");

        jest.spyOn(tianyuShell.core.ui.major, "appendInto").mockImplementation();

        Major.appendInto(elem, elemTarget);

        expect(tianyuShell.core.ui.major.appendInto).toHaveBeenCalledWith(elem, elemTarget);
    });

    it("append", () => {
        const elem = document.createElement("div");

        jest.spyOn(tianyuShell.core.ui.major, "remove").mockImplementation();

        Major.remove(elem);

        expect(tianyuShell.core.ui.major.remove).toHaveBeenCalledWith(elem);
    });

    it("appendInto", () => {
        const elem = document.createElement("div");
        const elemTarget = document.createElement("div");

        jest.spyOn(tianyuShell.core.ui.major, "removeFrom").mockImplementation();

        Major.removeFrom(elem, elemTarget);

        expect(tianyuShell.core.ui.major.removeFrom).toHaveBeenCalledWith(elem, elemTarget);
    });

    it("getElementById", () => {
        const elems = [document.createElement("div"), document.createElement("div")];

        jest.spyOn(tianyuShell.core.ui.major, "getElementById").mockReturnValue(elems);

        expect(Major.getElementById("test")).toEqual(elems);
        expect(tianyuShell.core.ui.major.getElementById).toHaveBeenCalledWith("test");
    });

    it("getElementByClassName", () => {
        const elems = [document.createElement("div"), document.createElement("div")];

        jest.spyOn(tianyuShell.core.ui.major, "getElementByClassName").mockReturnValue(elems);

        expect(Major.getElementByClassName("test")).toEqual(elems);
        expect(tianyuShell.core.ui.major.getElementByClassName).toHaveBeenCalledWith("test");
    });

    it("getElementByTagName", () => {
        const elems = [document.createElement("div"), document.createElement("div")];

        jest.spyOn(tianyuShell.core.ui.major, "getElementByTagName").mockReturnValue(elems);

        expect(Major.getElementByTagName("test")).toEqual(elems);
        expect(tianyuShell.core.ui.major.getElementByTagName).toHaveBeenCalledWith("test");
    });

    it("createElement", () => {
        const elem = Major.createElement("div", "test");

        expect(elem.id).toEqual("test");
        expect(elem.type).toEqual("div");
    });
});
