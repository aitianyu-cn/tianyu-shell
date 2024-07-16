/** @format */

import { TIANYU_SHELL_INFRA_STORE_TYPE } from "shell-core/src/core/declares/Constant";
import { getTianyuShellInfraInstanceId } from "shell-core/src/core/utils/InfraInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.InfraInterfaceExpose", () => {
    describe("getTianyuShellInfraInstanceId", () => {
        it("get instance id", () => {
            const instanceId = getTianyuShellInfraInstanceId();
            expect(instanceId.storeType).toEqual(TIANYU_SHELL_INFRA_STORE_TYPE);
        });
    });

    describe("TianyuShellInfraInterfaceExpose", () => {
        it("expose", () => {
            //
        });
    });
});
