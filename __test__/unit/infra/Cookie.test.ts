/** @format */

import { getCookie } from "infra/Cookie";

describe("aitianyu-cn.node-module.tianyu-shell.infra.Cookie", () => {
    beforeEach(() => {
        document.cookie =
            document.cookie.replace(/(?:(?:^|.*;\s*)[^;]*=([^;]*).*$)|^.*$/, "$1") +
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });

    describe("getCookie", () => {
        beforeEach(() => {
            document.cookie = "test_cookie=123456";
        });

        it("get cookie", () => {
            expect(getCookie("test_cookie")).toEqual("123456");
            expect(getCookie("test_cookie2", "000000")).toEqual("000000");
        });
    });
});
