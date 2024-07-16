/** @format */

import { TIANYU_SHELL_CORE_STORE_TYPE } from "shell-core/src/core/declares/Constant";
import { getTianyuShellCoreInstanceId } from "shell-core/src/core/utils/CoreInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.CoreInterfaceExpose", () => {
    describe("getTianyuShellCoreInstanceId", () => {
        it("get instance id", () => {
            const instanceId = getTianyuShellCoreInstanceId();
            expect(instanceId.storeType).toEqual(TIANYU_SHELL_CORE_STORE_TYPE);
        });
    });

    describe("TianyuShellCoreInterfaceExpose", () => {
        it("expose", () => {
            //
        });
    });
});
