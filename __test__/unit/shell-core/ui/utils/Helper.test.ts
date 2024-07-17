/** @format */

import { TianyuShellUIHelper } from "shell-core/src/ui/utils/Helper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.utils.Helper", () => {
    describe("TianyuShellUIHelper", () => {
        it("zIndexVerification", () => {
            expect(TianyuShellUIHelper.zIndexVerification.background(10)).toBeTruthy();
            expect(TianyuShellUIHelper.zIndexVerification.background(1000)).toBeFalsy();

            expect(TianyuShellUIHelper.zIndexVerification.major(120)).toBeTruthy();
            expect(TianyuShellUIHelper.zIndexVerification.major(1200)).toBeFalsy();

            expect(TianyuShellUIHelper.zIndexVerification.message(1200)).toBeTruthy();
            expect(TianyuShellUIHelper.zIndexVerification.message(4000)).toBeFalsy();

            expect(TianyuShellUIHelper.zIndexVerification.dialog(5000)).toBeTruthy();
            expect(TianyuShellUIHelper.zIndexVerification.dialog(12000)).toBeFalsy();
        });

        it("isCoreSupportable", () => {
            const configure = require("test/config/env.json");

            expect(TianyuShellUIHelper.isCoreSupportable()).toEqual(Boolean(configure?.ui?.core?.support));
        });
    });
});
