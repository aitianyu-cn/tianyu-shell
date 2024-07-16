/** @format */

import { guid } from "@aitianyu.cn/types";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.store.actions.EventActions", () => {
    it("SetDocumentLoadedAction", async () => {
        await getStore().dispatch(TianyuShellCoreInterface.event.action.onLoaded(getTianyuShellCoreInstanceId()));
        expect(
            getStore().selecteWithThrow(TianyuShellCoreInterface.event.select.isLoaded(getTianyuShellCoreInstanceId())),
        ).toBeTruthy();
    });

    it("ChangeUrlHashAction", async () => {
        const newHash = guid();
        await getStore().dispatch(
            TianyuShellCoreInterface.event.action.onHaschange(getTianyuShellCoreInstanceId(), newHash),
        );
        expect(
            getStore().selecteWithThrow(TianyuShellCoreInterface.event.select.getHash(getTianyuShellCoreInstanceId())),
        ).toEqual(newHash);
    });

    it("PageResizeAction", async () => {
        await getStore().dispatch(
            TianyuShellCoreInterface.event.action.onPageResize(getTianyuShellCoreInstanceId(), 1000),
        );
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.event.select.getPageSize(getTianyuShellCoreInstanceId()),
            ),
        ).toEqual(1000);

        await getStore().dispatch(
            TianyuShellCoreInterface.event.action.onPageResize(getTianyuShellCoreInstanceId(), 2000),
        );
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.event.select.getPageSize(getTianyuShellCoreInstanceId()),
            ),
        ).toEqual(2000);
    });
});
