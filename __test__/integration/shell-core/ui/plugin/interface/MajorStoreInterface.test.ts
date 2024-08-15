/** @format */

import { getStore } from "shell-core/src/core/utils/Store";
import { MajorInterface } from "shell-core/src/ui/plugin/interface/MajorInterfaceExpose";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { Major } from "shell-core/src/ui/plugin/Major";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.MajorStoreInterface", () => {
    const TianyuStore = createMockedStore();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.MAJOR_STORE_TYPE, MajorInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(MajorInterface.core.creator(getMajorInstanceId()));

        const majorLayerId = TianyuStore.selecteWithThrow(MajorInterface.layer.getId(getMajorInstanceId()));
        const majorDiv = document.createElement("div");
        majorDiv.id = majorLayerId;
        document.body.appendChild(majorDiv);
    });

    afterEach(async () => {
        await destroyStore(TianyuStore);
    });

    it("class list", async () => {
        const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(MajorInterface.layer.addClass(getMajorInstanceId(), ["c1", "c2", "c3", "c4"]));
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([
            "c1",
            "c2",
            "c3",
            "c4",
        ]);

        await TianyuStore.dispatch(MajorInterface.layer.removeClass(getMajorInstanceId(), ["c1"]));
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([
            "c2",
            "c3",
            "c4",
        ]);

        await TianyuStore.dispatch(MajorInterface.layer.removeClass(getMajorInstanceId(), "c2"));
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([
            "c3",
            "c4",
        ]);

        await TianyuStore.dispatch(MajorInterface.internal._resetClasses(getMajorInstanceId()));
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([]);
    });

    it("stylings", async () => {
        const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(
            MajorInterface.layer.addStyle(getMajorInstanceId(), [
                "c1",
                {
                    height: "123px",
                },
                "c2",
                {
                    width: "321px",
                },
            ]),
        );

        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([
            "c1",
            "c2",
        ]);
        const styling = TianyuStore.selecteWithThrow(MajorInterface.layer.getStyling(getMajorInstanceId()));
        expect(styling.width).toEqual("321px");
        expect(styling.height).toEqual("123px");

        await TianyuStore.dispatch(MajorInterface.layer.reset(getMajorInstanceId()));
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getClasses(getMajorInstanceId()))).toEqual([]);
        expect(TianyuStore.selecteWithThrow(MajorInterface.layer.getStyling(getMajorInstanceId()))).toEqual({});
    });

    it("major element", async () => {
        const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        const majorLayer = TianyuStore.selecteWithThrow(MajorInterface.internal._getMajorLayer(getMajorInstanceId()));
        expect(majorLayer.layerRoot).toBeDefined();
        if (majorLayer.layerRoot) {
            jest.spyOn(majorLayer.layerRoot, "appendChild");
            jest.spyOn(majorLayer.layerRoot, "removeChild");

            const element = Major.createElement("div", "test");

            await TianyuStore.dispatch(MajorInterface.major.append(getMajorInstanceId(), element));
            expect(majorLayer.layerRoot.appendChild).toHaveBeenCalled();

            await TianyuStore.dispatch(MajorInterface.major.remove(getMajorInstanceId(), element));
            expect(majorLayer.layerRoot.removeChild).toHaveBeenCalled();
        }
    });

    describe("remove from", () => {
        let dispatchMock: jest.MockInstance<any, any>;

        beforeEach(() => {
            dispatchMock = jest.spyOn(getStore(), "dispatch").mockImplementation();
        });

        afterEach(() => {
            dispatchMock?.mockClear();
        });

        it("element not provided", async () => {
            const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                MajorInterface.major.removeFrom(getMajorInstanceId(), {
                    element: "non-element",
                    target: "non-element",
                }),
            );

            expect(getStore().dispatch).toHaveBeenCalled();
        });

        it("target not provided", async () => {
            const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                MajorInterface.major.removeFrom(getMajorInstanceId(), {
                    element: document.createElement("div"),
                    target: "non-element",
                }),
            );

            expect(getStore().dispatch).toHaveBeenCalled();
        });

        it("remove from", async () => {
            const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            const div = document.createElement("div");
            jest.spyOn(div, "removeChild");

            await TianyuStore.dispatch(
                MajorInterface.major.removeFrom(getMajorInstanceId(), {
                    element: document.createElement("div"),
                    target: div,
                }),
            );

            expect(getStore().dispatch).not.toHaveBeenCalled();
            expect(div.removeChild).toHaveBeenCalled();
        });
    });

    describe("append into", () => {
        let dispatchMock: jest.MockInstance<any, any>;

        beforeEach(() => {
            dispatchMock = jest.spyOn(getStore(), "dispatch").mockImplementation();
        });

        afterEach(() => {
            dispatchMock?.mockClear();
        });

        it("target not provided", async () => {
            const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                MajorInterface.major.appendInto(getMajorInstanceId(), {
                    element: Major.createElement("div"),
                    target: "non-element",
                }),
            );

            expect(getStore().dispatch).toHaveBeenCalled();
        });

        it("append into", async () => {
            const { getMajorInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            const div = document.createElement("div");
            jest.spyOn(div, "appendChild");

            await TianyuStore.dispatch(
                MajorInterface.major.appendInto(getMajorInstanceId(), {
                    element: Major.createElement("div"),
                    target: div,
                }),
            );

            expect(getStore().dispatch).not.toHaveBeenCalled();
            expect(div.appendChild).toHaveBeenCalled();
        });
    });
});
