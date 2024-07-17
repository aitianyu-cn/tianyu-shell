/** @format */

import { CssHelper } from "shell-core/src/ui/resources/CssHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.resources.CssHelper", () => {
    it("setGlobalStyle", () => {
        jest.spyOn(window.document.head, "appendChild");

        const style = CssHelper.setGlobalStyle("test");

        expect(style.innerHTML).toEqual("test");
        expect(window.document.head.appendChild).toHaveBeenCalledWith(style);
    });

    it("linkGlobalStyle", () => {
        jest.spyOn(window.document.head, "appendChild");

        const style = CssHelper.linkGlobalStyle("http://localhost") as HTMLLinkElement;

        expect(style.href).toEqual("http://localhost/");
        expect(style.rel).toEqual("stylesheet");
        expect(style.type).toEqual("text/css");
        expect(window.document.head.appendChild).toHaveBeenCalledWith(style);
    });

    it("createGlobalStyle", () => {
        const style = CssHelper.createGlobalStyle("test", "test");

        expect(style.id).toEqual("tianyu_shell_ui_custom_css_test");
        expect(style.innerHTML).toEqual("test");
    });

    it("createGlobalStyleLink", () => {
        const style = CssHelper.createGlobalStyleLink("test", "http://localhost") as HTMLLinkElement;

        expect(style.id).toEqual("tianyu_shell_ui_custom_css_test");
        expect(style.href).toEqual("http://localhost/");
        expect(style.rel).toEqual("stylesheet");
        expect(style.type).toEqual("text/css");
    });

    describe("removeGlobalStyle", () => {
        it("remove given object", () => {
            const style = document.createElement("link");

            jest.spyOn(window.document, "getElementById").mockReturnValue(style);
            jest.spyOn(window.document.head, "removeChild").mockImplementation();

            CssHelper.removeGlobalStyle(style);

            expect(window.document.head.removeChild).toHaveBeenCalledWith(style);
        });

        it("remove given object", () => {
            const style = document.createElement("link");

            jest.spyOn(window.document, "getElementById").mockReturnValue(style);
            jest.spyOn(window.document.head, "removeChild").mockImplementation();

            CssHelper.removeGlobalStyle("test");

            expect(window.document.head.removeChild).toHaveBeenCalledWith(style);
        });
    });

    it("appendGlobalStyle", () => {
        const style = document.createElement("link");

        jest.spyOn(window.document.head, "appendChild").mockImplementation();

        CssHelper.appendGlobalStyle(style);

        expect(window.document.head.appendChild).toHaveBeenCalledWith(style);
    });
});
