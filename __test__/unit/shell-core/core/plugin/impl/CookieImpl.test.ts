/** @format */

import { CookieImpl } from "shell-core/src/core/plugin/impl/CookieImpl";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.impl.CookieImpl", () => {
    it("set", () => {
        CookieImpl.set("TEST", "123");
        expect(CookieImpl.get("TEST")).toEqual("123");
    });

    describe("remove", () => {
        it("remove not exist", () => {
            expect(() => {
                CookieImpl.remove("TEST_NOT_EXIST");
            }).not.toThrow();
        });

        it("remove TEST", () => {
            CookieImpl.set("TEST", "123");
            expect(CookieImpl.get("TEST")).toEqual("123");

            CookieImpl.remove("TEST");
            expect(CookieImpl.get("TEST")).toEqual("");
        });
    });
});
