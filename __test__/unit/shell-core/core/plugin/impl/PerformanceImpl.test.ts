/** @format */

import { IInstanceAction } from "@aitianyu.cn/tianyu-store";
import { ConsoleLog } from "shell-core/src/core/plugin/impl/ConsoleLogImpl";
import { PerformanceCapture, PerformanceHelper } from "shell-core/src/core/plugin/impl/PerformanceImpl";
import { TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.impl.PerformanceImpl", () => {
    describe("PerformanceCapture", () => {
        it("clean", async () => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    TianyuShellCoreInterface.console.capture.action.clean.info.fullName,
                );
            });

            await PerformanceCapture.clean();
        });

        it("start", (done) => {
            let fnResolve: Function = jest.fn();
            const oPromise = new Promise<void>((resolve) => {
                fnResolve = resolve;
            });
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    TianyuShellCoreInterface.console.capture.action.start.info.fullName,
                );
                expect((action as IInstanceAction<any>).params.classify).toEqual("test");
                expect((action as IInstanceAction<any>).params.id).toEqual("t");

                fnResolve();
            });

            const id = PerformanceCapture.start("test", "t");
            expect(id.id).toBeDefined();

            oPromise.finally(done);
        });

        it("end", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    TianyuShellCoreInterface.console.capture.action.end.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual("123");

                done();
            });

            PerformanceCapture.end({ id: "123" });
        });

        it("saveToFile", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    TianyuShellCoreInterface.console.capture.action.donwload.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual("123");

                done();
            });

            PerformanceCapture.saveToFile("123");
        });
    });

    describe("PerformanceHelper", () => {
        it("start", () => {
            jest.spyOn(ConsoleLog, "debug").mockImplementation();

            const recorder = PerformanceHelper.start("test", true);
            expect(recorder.id).toEqual("test");
            expect(recorder.forceLog).toBeTruthy();
            expect(recorder.start !== -1).toBeTruthy();
            expect(ConsoleLog.debug).toHaveBeenCalled();
        });

        it("end", () => {
            jest.spyOn(ConsoleLog, "debug").mockImplementation();

            const during = PerformanceHelper.end({ id: "", start: 100, forceLog: true });
            expect(during !== -1).toBeTruthy();
            expect(ConsoleLog.debug).toHaveBeenCalled();
        });
    });
});
