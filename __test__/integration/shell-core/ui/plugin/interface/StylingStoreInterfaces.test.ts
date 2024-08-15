/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { updateTianyuShellTheme } from "shell-core/src/ui/plugin/handler/StylingHandler";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { StylingInterface } from "shell-core/src/ui/plugin/interface/StylingInterfaceExpose";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.StylingStoreInterface", () => {
    const TianyuStore = createMockedStore();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.STYLING_STORE_TYPE, StylingInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                StylingInterface.core.creator(getStylingInstanceId(), {
                    default: {
                        theme: "default",
                        color: "light",
                    },
                    custom: {
                        theme: "custom",
                        color: "light",
                    },
                }),
                StylingInterface.control.create.tianyuStyleMap(getStylingInstanceId()),
                StylingInterface.control.create.cssMap(getStylingInstanceId()),
            ]),
        );

        updateTianyuShellTheme("custom", "light");
    });

    afterEach(async () => {
        const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                StylingInterface.control.lifecycle.tianyuStyleMap(getStylingInstanceId()),
                StylingInterface.control.lifecycle.cssMap(getStylingInstanceId()),
            ]),
        );

        await destroyStore(TianyuStore);
    });

    it("", () => {});
});
