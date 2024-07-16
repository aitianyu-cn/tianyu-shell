/** @format */

import { Cookie } from "shell-core/src/core/plugin/Cookie";
import { CookieImpl } from "shell-core/src/core/plugin/impl/CookieImpl";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Cookie", () => {
    it("set", () => {
        jest.spyOn(CookieImpl, "set").mockImplementation();
        Cookie.set("", "");
        expect(CookieImpl.set).toHaveBeenCalled();
    });

    it("get", () => {
        jest.spyOn(CookieImpl, "get").mockImplementation();
        Cookie.get("", "");
        expect(CookieImpl.get).toHaveBeenCalled();
    });

    it("remove", () => {
        jest.spyOn(CookieImpl, "remove").mockImplementation();
        Cookie.remove("");
        expect(CookieImpl.remove).toHaveBeenCalled();
    });
});
