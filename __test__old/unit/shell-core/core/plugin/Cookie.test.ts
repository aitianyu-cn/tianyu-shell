/**@format */

import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";
import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/TianyuShell";

const config = require("../../../../config/env.json") as ITianyuShellInitial;
initialTianyuShell(config);

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Cookie", () => {
    const { Cookie } = require("../../../../../packages/shell-core/src/core/plugin/Cookie");

    it("test for global setting", () => {
        expect((window as any).tianyuShell?.core?.cookie).toBeDefined();
    });

    describe("set", () => {
        it("set simple cookie string", () => {
            Cookie.set("A", "AAA");

            expect(window.document.cookie.includes("A=AAA")).toBeTruthy();
        });

        it("set complex cookie string", () => {
            Cookie.set("B", "BBB", {
                domain: "localhost",
                path: "/",
                expires: new Date(Date.now() + 60 * 60 * 1000 * 1000),
                escaped: false,
            });

            expect(window.document.cookie.includes("B=BBB")).toBeTruthy();
        });
    });

    describe("get", () => {
        it("cookie can be found", () => {
            expect(window.document.cookie.includes("A=AAA")).toBeTruthy();

            const value = Cookie.get("A");

            expect(value).toEqual("AAA");
        });

        it("cookie cannot be found", () => {
            const value = Cookie.get("C", "no-C");

            expect(value).toEqual("no-C");
        });
    });

    it("remove", () => {
        expect(window.document.cookie.includes("B=BBB")).toBeTruthy();
        expect(window.document.cookie.includes("A=AAA")).toBeTruthy();

        Cookie.remove("B", "/", "localhost");

        expect(window.document.cookie.includes("B=BBB")).toBeFalsy();
        expect(window.document.cookie.includes("A=AAA")).toBeTruthy();
    });
});
