/**@format */

import { initTianyuShellGlobalCache } from "../../../../../packages/shell-core/src/core/utils/RuntimeInitial";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.utils.RuntimeInital", () => {
    beforeEach(() => {
        if (!!(window as any).tianyuShell) {
            delete (window as any)["tianyuShell"];
        }
    });

    it("initTianyuShellGlobalCache", () => {
        expect((window as any).tianyuShell).not.toBeDefined();

        initTianyuShellGlobalCache();

        const tianyuShell = (window as any).tianyuShell;
        expect(tianyuShell).toBeDefined();
        expect(tianyuShell?.runtime?.cache?.watchDog).toBeDefined();
        expect(tianyuShell?.runtime?.cache?.storage).toBeDefined();
    });
});
