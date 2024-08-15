/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { guid } from "@aitianyu.cn/types";
import { DialogInterface } from "shell-core/src/ui/plugin/interface/DialogInterfaceExpose";
import { IDialogInstance } from "shell-core/src/ui/plugin/interface/state/DialogState";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.DialogStoreInterface", () => {
    const TianyuStore = createMockedStore();
    const basicLayerId = guid();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.DIALOG_STORE_TYPE, DialogInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                DialogInterface.core.creator(getDialogInstanceId()),
                DialogInterface.tools.externalObj.create(getDialogInstanceId()),
            ]),
        );

        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                DialogInterface.layer.add(getDialogInstanceId(), basicLayerId),
                DialogInterface.layer.switch(getDialogInstanceId(), basicLayerId),
            ]),
        );
    });

    afterEach(async () => {
        const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(DialogInterface.tools.externalObj.remove(getDialogInstanceId()));

        await destroyStore(TianyuStore);
    });

    describe("add layer", () => {
        it("layer name not provided", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(DialogInterface.layer.add(getDialogInstanceId(), ""));

            const layers = TianyuStore.selecteWithThrow(DialogInterface.layer.all(getDialogInstanceId()));
            expect(layers).toEqual([basicLayerId]);
        });

        it("layer name exists", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(DialogInterface.layer.add(getDialogInstanceId(), basicLayerId));

            const layers = TianyuStore.selecteWithThrow(DialogInterface.layer.all(getDialogInstanceId()));
            expect(layers).toEqual([basicLayerId]);
        });

        it("layer external map not exists", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(DialogInterface.tools.externalObj.remove(getDialogInstanceId()));

            await TianyuStore.dispatch(DialogInterface.layer.add(getDialogInstanceId(), "t1"));

            const layers = TianyuStore.selecteWithThrow(DialogInterface.layer.all(getDialogInstanceId()));
            expect(layers).toEqual([basicLayerId]);
        });

        it("add over 10 layers", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    DialogInterface.layer.add(getDialogInstanceId(), "t1"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t2"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t3"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t4"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t5"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t6"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t7"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t8"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t9"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t10"),
                ]),
            );

            const layers = TianyuStore.selecteWithThrow(DialogInterface.layer.all(getDialogInstanceId()));
            expect(layers).toEqual([basicLayerId, "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"]);
        });
    });

    describe("switch layer", () => {
        it("switch to current layer", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(DialogInterface.layer.switch(getDialogInstanceId(), basicLayerId));

            const currentLayer = TianyuStore.selecteWithThrow(DialogInterface.layer.current.id(getDialogInstanceId()));
            expect(currentLayer).toEqual(basicLayerId);
        });

        it("switch to unexist layer", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(DialogInterface.layer.switch(getDialogInstanceId(), "t1"));

            const currentLayer = TianyuStore.selecteWithThrow(DialogInterface.layer.current.id(getDialogInstanceId()));
            expect(currentLayer).toEqual(basicLayerId);
        });
    });

    describe("remove layer", () => {
        it("remove basic layer", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(DialogInterface.layer.remove(getDialogInstanceId(), basicLayerId));

            const exist = TianyuStore.selecteWithThrow(
                DialogInterface.layer.exist(getDialogInstanceId(), basicLayerId),
            );
            expect(exist).toBeTruthy();
        });

        it("remove current layer", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    DialogInterface.layer.add(getDialogInstanceId(), "t1"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t2"),
                    DialogInterface.layer.switch(getDialogInstanceId(), "t1"),
                ]),
            );

            await TianyuStore.dispatch(DialogInterface.layer.remove(getDialogInstanceId(), "t1"));

            expect(TianyuStore.selecteWithThrow(DialogInterface.layer.exist(getDialogInstanceId(), "t1"))).toBeFalsy();
            expect(TianyuStore.selecteWithThrow(DialogInterface.layer.current.id(getDialogInstanceId()))).toEqual("t2");
        });

        it("remove not current layer", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    DialogInterface.layer.add(getDialogInstanceId(), "t1"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t2"),
                    DialogInterface.layer.switch(getDialogInstanceId(), "t1"),
                ]),
            );

            await TianyuStore.dispatch(DialogInterface.layer.remove(getDialogInstanceId(), "t2"));

            expect(TianyuStore.selecteWithThrow(DialogInterface.layer.exist(getDialogInstanceId(), "t2"))).toBeFalsy();
            expect(TianyuStore.selecteWithThrow(DialogInterface.layer.current.id(getDialogInstanceId()))).toEqual("t1");
        });

        it("remove layer and its elements", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    DialogInterface.layer.add(getDialogInstanceId(), "t1"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t2"),
                    DialogInterface.layer.switch(getDialogInstanceId(), "t1"),
                ]),
            );
            const dialogIns: IDialogInstance = {
                id: "test-dialog",
                element: "test",
            };
            await TianyuStore.dispatch(DialogInterface.open(getDialogInstanceId(), dialogIns));
            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeTruthy();

            await TianyuStore.dispatch(DialogInterface.layer.remove(getDialogInstanceId(), "t1"));
            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeFalsy();
        });
    });

    describe("dialog", () => {
        it("external map invalid", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(DialogInterface.tools.externalObj.remove(getDialogInstanceId()));

            const dialogIns: IDialogInstance = {
                id: "test-dialog",
                element: "test",
            };
            await TianyuStore.dispatch(DialogInterface.open(getDialogInstanceId(), dialogIns));

            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeFalsy();

            await TianyuStore.dispatch(DialogInterface.close(getDialogInstanceId(), "test-dialog"));

            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeFalsy();
        });

        it("open success", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            const dialogIns: IDialogInstance = {
                id: "test-dialog",
                element: "test",
            };
            await TianyuStore.dispatch(DialogInterface.open(getDialogInstanceId(), dialogIns));
            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeTruthy();

            await TianyuStore.dispatch(DialogInterface.close(getDialogInstanceId(), "test-dialog"));
            expect(
                TianyuStore.selecteWithThrow(DialogInterface.isOpen(getDialogInstanceId(), "test-dialog")),
            ).toBeFalsy();
        });

        it("close dialog if not exist", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(DialogInterface.close(getDialogInstanceId(), "test-dialog"));
        });
    });

    describe("remove layer id", () => {
        it("external object not exist", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    DialogInterface.layer.add(getDialogInstanceId(), "t1"),
                    DialogInterface.layer.add(getDialogInstanceId(), "t2"),
                    DialogInterface.layer.switch(getDialogInstanceId(), "t1"),
                ]),
            );
            await TianyuStore.dispatch(DialogInterface.tools.externalObj.remove(getDialogInstanceId()));

            await TianyuStore.dispatch(DialogInterface.layer.internal._remove(getDialogInstanceId(), "t1"));

            expect(TianyuStore.selecteWithThrow(DialogInterface.layer.exist(getDialogInstanceId(), "t1"))).toBeTruthy();
        });

        it("layer id is not valid", async () => {
            const { getDialogInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(DialogInterface.layer.internal._remove(getDialogInstanceId(), "t1"));
        });
    });
});
