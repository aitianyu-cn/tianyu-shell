/** @format */

import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import {
    getBackgroundInstanceId,
    getMessageInstanceId,
    getStylingInstanceId,
} from "shell-core/src/ui/tools/InstanceHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.tools.InstanceHelper", () => {
    it("getBackgroundInstanceId", () => {
        const instance = getBackgroundInstanceId();
        expect(instance.storeType).toEqual(StoreType.BACKGROUND_STORE_TYPE);
    });

    it("getMessageInstanceId", () => {
        const instance = getMessageInstanceId();
        expect(instance.storeType).toEqual(StoreType.MESSAGE_STORE_TYPE);
    });

    it("getStylingInstanceId", () => {
        const instance = getStylingInstanceId();
        expect(instance.storeType).toEqual(StoreType.STYLING_STORE_TYPE);
    });
});
