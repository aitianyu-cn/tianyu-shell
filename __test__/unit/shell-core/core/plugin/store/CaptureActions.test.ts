/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { guid, Log } from "@aitianyu.cn/types";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";
import * as CaptureHelper from "shell-core/src/core/plugin/helper/CaptureHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.store.actions.CaptureActions", () => {
    afterEach(async () => {
        await getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.clean(getTianyuShellCoreInstanceId()),
        );

        const allCaptures = getStore().selecte(
            TianyuShellCoreInterface.console.capture.internal._getAllRecords(getTianyuShellCoreInstanceId()),
        );
        expect(allCaptures instanceof Missing).toBeFalsy();
        if (!(allCaptures instanceof Missing)) {
            expect(allCaptures.length).toEqual(0);
        }
    });

    const fnStartCapture = async (unifiedId: string, classify: string, id: string, byPassSizeChecker?: boolean) => {
        await getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.start(getTianyuShellCoreInstanceId(), {
                guid: unifiedId,
                classify,
                id,
            }),
        );

        const allCaptures = getStore().selecte(
            TianyuShellCoreInterface.console.capture.internal._getAllRecords(getTianyuShellCoreInstanceId()),
        );
        expect(allCaptures instanceof Missing).toBeFalsy();
        if (!(allCaptures instanceof Missing)) {
            if (!byPassSizeChecker) {
                expect(allCaptures.length).toEqual(1);
            }
            const cap = allCaptures.find((value) => value.guid === unifiedId);
            expect(cap).toBeDefined();
            if (cap) {
                expect(cap.guid).toEqual(unifiedId);
                expect(cap.classify).toEqual(classify);
                expect(cap.id).toEqual(id);
                expect(cap.end).toEqual(-1);
            }
        }
    };

    const fnEndCapture = async (unifiedId: string, classify: string, id: string, byPassSizeChecker?: boolean) => {
        await getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.end(getTianyuShellCoreInstanceId(), unifiedId),
        );

        const allCaptures = getStore().selecte(
            TianyuShellCoreInterface.console.capture.internal._getAllRecords(getTianyuShellCoreInstanceId()),
        );
        expect(allCaptures instanceof Missing).toBeFalsy();
        if (!(allCaptures instanceof Missing)) {
            if (!byPassSizeChecker) {
                expect(allCaptures.length).toEqual(1);
            }
            const cap = allCaptures.find((value) => value.guid === unifiedId);
            expect(cap).toBeDefined();
            if (cap) {
                expect(cap.guid).toEqual(unifiedId);
                expect(cap.classify).toEqual(classify);
                expect(cap.id).toEqual(id);
                expect(cap.end).not.toEqual(-1);
                return cap.end;
            }
        }

        return -1;
    };

    describe("StartCaptureAction", () => {
        it("empty id", async () => {
            await getStore().dispatch(
                TianyuShellCoreInterface.console.capture.action.start(getTianyuShellCoreInstanceId(), {
                    guid: guid(),
                    classify: "test",
                    id: "",
                }),
            );

            const allCaptures = getStore().selecte(
                TianyuShellCoreInterface.console.capture.internal._getAllRecords(getTianyuShellCoreInstanceId()),
            );
            expect(allCaptures instanceof Missing).toBeFalsy();
            if (!(allCaptures instanceof Missing)) {
                expect(allCaptures.length).toEqual(0);
            }
        });

        it("empty classify", async () => {
            await getStore().dispatch(
                TianyuShellCoreInterface.console.capture.action.start(getTianyuShellCoreInstanceId(), {
                    guid: guid(),
                    classify: "",
                    id: "run",
                }),
            );

            const allCaptures = getStore().selecte(
                TianyuShellCoreInterface.console.capture.internal._getAllRecords(getTianyuShellCoreInstanceId()),
            );
            expect(allCaptures instanceof Missing).toBeFalsy();
            if (!(allCaptures instanceof Missing)) {
                expect(allCaptures.length).toEqual(0);
            }
        });

        it("add new", async () => {
            let fnResolve: Function = jest.fn();
            const subscribePromise = new Promise<void>((resolve) => {
                fnResolve = resolve;
            });
            const unsubscribeOperation = getStore().subscribe(
                TianyuShellCoreInterface.console.capture.select.lastCap(getTianyuShellCoreInstanceId()),
                (_, newState) => {
                    expect(newState?.type).toEqual("start");
                    fnResolve();
                },
            );

            const unifiedId = guid();
            await fnStartCapture(unifiedId, "test", "run");

            await subscribePromise;
            unsubscribeOperation();
        });
    });

    describe("EndCaptureAction", () => {
        it("not found records", async () => {
            await getStore().dispatch(
                TianyuShellCoreInterface.console.capture.action.end(getTianyuShellCoreInstanceId(), "test"),
            );
            expect(Log.log).not.toHaveBeenCalled();
        });

        it("end success", async () => {
            const unifiedId = guid();
            await fnStartCapture(unifiedId, "test", "run");

            let fnResolve: Function = jest.fn();
            const subscribePromise = new Promise<void>((resolve) => {
                fnResolve = resolve;
            });
            const unsubscribeOperation = getStore().subscribe(
                TianyuShellCoreInterface.console.capture.select.lastCap(getTianyuShellCoreInstanceId()),
                (_, newState) => {
                    expect(newState?.type).toEqual("end");
                    fnResolve();
                },
            );

            await fnEndCapture(unifiedId, "test", "run");

            await subscribePromise;
            unsubscribeOperation();

            expect(Log.log).toHaveBeenCalledTimes(2);
        });

        it("end twice should not change state", async () => {
            const unifiedId = guid();
            await fnStartCapture(unifiedId, "test", "run");

            const firstEnd = await fnEndCapture(unifiedId, "test", "run");
            const secondEnd = await fnEndCapture(unifiedId, "test", "run");
            expect(firstEnd).toEqual(secondEnd);

            expect(Log.log).toHaveBeenCalledTimes(2);
        });
    });

    it("DownloadCaptureAction", async () => {
        const unifiedIds = [guid(), guid(), guid()];
        await fnStartCapture(unifiedIds[0], "test", "run", true);
        await fnStartCapture(unifiedIds[1], "test", "run", true);
        await fnStartCapture(unifiedIds[2], "test", "run", true);

        await fnEndCapture(unifiedIds[0], "test", "run", true);
        await fnEndCapture(unifiedIds[1], "test", "run", true);

        let fnResolve: Function = jest.fn();
        const downloadPromise = new Promise<void>((resolve) => {
            fnResolve = resolve;
        });

        jest.spyOn(CaptureHelper, "download").mockImplementation((fileName, baseTime, list) => {
            expect(fileName).toEqual("test.json");
            expect(baseTime).not.toEqual(-1);

            expect(list.length).toEqual(3);
            expect(list[0].name).toEqual(CaptureHelper.captureNameGenerator("test", "run", 0));
            expect(list[0].segments.end).not.toEqual(-1);

            expect(list[1].name).toEqual(CaptureHelper.captureNameGenerator("test", "run", 1));
            expect(list[1].segments.end).not.toEqual(-1);

            expect(list[2].name).toEqual(CaptureHelper.captureNameGenerator("test", "run", 2));
            expect(list[2].segments.end).toEqual(-1);

            fnResolve();
        });

        await getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.donwload(getTianyuShellCoreInstanceId(), "test.json"),
        );

        await downloadPromise;
    });
});
