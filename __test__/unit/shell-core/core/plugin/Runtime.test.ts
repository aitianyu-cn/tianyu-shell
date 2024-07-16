/** @format */

import { isIOS, isMobile, isMac } from "shell-core/src/core/plugin/Runtime";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Runtime", () => {
    it("isIOS", () => {
        expect(isIOS()).toEqual((window as any).tianyuShell?.core?.configure?.isIOS);
    });

    it("isMobile", () => {
        expect(isMobile()).toEqual((window as any).tianyuShell?.core?.configure?.isMobile);
    });

    it("isMac", () => {
        expect(isMac()).toEqual((window as any).tianyuShell?.core?.configure?.isMac);
    });
});
