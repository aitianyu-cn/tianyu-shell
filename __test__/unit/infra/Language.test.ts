/** @format */

import { getLanguage } from "infra/Language";

describe("aitianyu-cn.node-module.tianyu-shell.infra.Language", () => {
    describe("getLanguage", () => {
        it("get from cookie", () => {
            document.cookie = "LANGUAGE=zh_cn;";

            expect(getLanguage()).toEqual("zh_cn");
        });

        it("get from default", () => {
            document.cookie = "LANGUAGE=zh_cn;expires=Thu, 01 Jan 1970 00:00:00 GMT";

            expect(getLanguage()).toEqual(navigator.language.replace("-", "_"));
        });
    });
});
