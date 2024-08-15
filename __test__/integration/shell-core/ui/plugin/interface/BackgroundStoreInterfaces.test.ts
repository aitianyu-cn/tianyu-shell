/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { BackgroundInterface } from "shell-core/src/ui/plugin/interface/BackgroundInterfaceExpose";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.BackgroundStoreInterface", () => {
    const TianyuStore = createMockedStore();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.BACKGROUND_STORE_TYPE, BackgroundInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                BackgroundInterface.core.creator(getBackgroundInstanceId()),
                BackgroundInterface.control.externalCreator(getBackgroundInstanceId()),
            ]),
        );
    });

    afterEach(async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(BackgroundInterface.control.externalDestroy(getBackgroundInstanceId()));

        await destroyStore(TianyuStore);
    });

    it("change color", async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(BackgroundInterface.color.set(getBackgroundInstanceId(), "#123456"));

        const color = TianyuStore.selecteWithThrow(BackgroundInterface.color.get(getBackgroundInstanceId()));
        expect(color).toEqual("#123456");
    });

    it("remove custom color", async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(BackgroundInterface.color.remove(getBackgroundInstanceId()));

        const defaultColor = TianyuStore.selecteWithThrow(
            BackgroundInterface.color.getDefault(getBackgroundInstanceId()),
        );
        const currentColor = TianyuStore.selecteWithThrow(BackgroundInterface.color.get(getBackgroundInstanceId()));

        expect(defaultColor).toEqual(currentColor);
    });

    describe("set html elemnt", () => {
        it("external map is not created", async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(BackgroundInterface.control.externalDestroy(getBackgroundInstanceId()));

            await TianyuStore.dispatch(
                BackgroundInterface.html.set(getBackgroundInstanceId(), {
                    element: document.createElement("div"),
                    id: "test-element",
                }),
            );

            const elementId = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.currentId(getBackgroundInstanceId()),
            );
            expect(elementId).toBeNull();
        });

        it("set html element", async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                BackgroundInterface.html.set(getBackgroundInstanceId(), {
                    element: document.createElement("div"),
                    id: "test-element",
                }),
            );

            const elementId = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.currentId(getBackgroundInstanceId()),
            );
            expect(elementId).toEqual("test-element");
        });
    });

    describe("remove html element", () => {
        beforeEach(async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                BackgroundInterface.html.set(getBackgroundInstanceId(), {
                    element: document.createElement("div"),
                    id: "test-element",
                }),
            );

            const elementId = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.currentId(getBackgroundInstanceId()),
            );
            expect(elementId).toEqual("test-element");
        });

        it("element id is not provided", async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(BackgroundInterface.html.remove(getBackgroundInstanceId(), ""));

            const elementIds = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.getAllElements(getBackgroundInstanceId()),
            );
            expect(elementIds).toEqual(["test-element"]);
        });

        it("external map is not created", async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(BackgroundInterface.control.externalDestroy(getBackgroundInstanceId()));

            await TianyuStore.dispatch(BackgroundInterface.html.remove(getBackgroundInstanceId(), "123"));

            const elementId = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.currentId(getBackgroundInstanceId()),
            );
            expect(elementId).toEqual("test-element");
        });

        it("remove used html element", async () => {
            const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(BackgroundInterface.html.remove(getBackgroundInstanceId(), "test-element"));

            const elementId = TianyuStore.selecteWithThrow(
                BackgroundInterface.html.currentId(getBackgroundInstanceId()),
            );
            expect(elementId).toBeNull();
        });
    });

    it("reset html element", async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            BackgroundInterface.html.set(getBackgroundInstanceId(), {
                element: document.createElement("div"),
                id: "test-element",
            }),
        );

        expect(TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()))).toEqual(
            "test-element",
        );

        await TianyuStore.dispatch(BackgroundInterface.html.reset(getBackgroundInstanceId()));

        const elementId = TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()));
        expect(elementId).toBeNull();
    });

    it("clean html elements", async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            BackgroundInterface.html.set(getBackgroundInstanceId(), {
                element: document.createElement("div"),
                id: "test-element",
            }),
        );

        expect(TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()))).toEqual(
            "test-element",
        );

        await TianyuStore.dispatch(BackgroundInterface.html.clear(getBackgroundInstanceId()));

        const elementIds = TianyuStore.selecteWithThrow(
            BackgroundInterface.html.getAllElements(getBackgroundInstanceId()),
        );
        expect(elementIds?.length).toEqual(0);
        const elementId = TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()));
        expect(elementId).toBeNull();
    });

    it("reset all background", async () => {
        const { getBackgroundInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(BackgroundInterface.color.set(getBackgroundInstanceId(), "#123456"));
        expect(TianyuStore.selecteWithThrow(BackgroundInterface.color.get(getBackgroundInstanceId()))).toEqual(
            "#123456",
        );

        await TianyuStore.dispatch(
            BackgroundInterface.html.set(getBackgroundInstanceId(), {
                element: document.createElement("div"),
                id: "test-element",
            }),
        );
        expect(TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()))).toEqual(
            "test-element",
        );

        await TianyuStore.dispatch(BackgroundInterface.control.reset(getBackgroundInstanceId()));

        const defaultColor = TianyuStore.selecteWithThrow(
            BackgroundInterface.color.getDefault(getBackgroundInstanceId()),
        );
        const currentColor = TianyuStore.selecteWithThrow(BackgroundInterface.color.get(getBackgroundInstanceId()));
        expect(defaultColor).toEqual(currentColor);

        const elementIds = TianyuStore.selecteWithThrow(
            BackgroundInterface.html.getAllElements(getBackgroundInstanceId()),
        );
        expect(elementIds?.length).toEqual(0);
        const elementId = TianyuStore.selecteWithThrow(BackgroundInterface.html.currentId(getBackgroundInstanceId()));
        expect(elementId).toBeNull();
    });
});
