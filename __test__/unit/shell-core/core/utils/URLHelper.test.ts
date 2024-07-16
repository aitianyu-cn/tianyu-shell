/** @format */

import { compatibilityUrlGenerator } from "shell-core/src/core/utils/URLHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.URLHelper", () => {
    it("compatibilityUrlGenerator", () => {
        expect(compatibilityUrlGenerator("test", "")).toEqual(
            "https://resource.aitianyu.cn/resources/common/test/compatibility.json",
        );
        expect(compatibilityUrlGenerator("test", "https://localhost/proxy")).toEqual(
            "https://localhost/proxy/common/test/compatibility.json",
        );
    });
});
