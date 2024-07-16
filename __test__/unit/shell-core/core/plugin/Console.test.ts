/** @format */

import { Log, PerfCapture, PerfHelper } from "shell-core/src/core/plugin/Console";
import { ConsoleLog } from "shell-core/src/core/plugin/impl/ConsoleLogImpl";
import { PerformanceCapture, PerformanceHelper } from "shell-core/src/core/plugin/impl/PerformanceImpl";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Console", () => {
    describe("PerfCapture", () => {
        it("clean", async () => {
            jest.spyOn(PerformanceCapture, "clean").mockReturnValue(Promise.resolve());
            await PerfCapture.clean();
            expect(PerformanceCapture.clean).toHaveBeenCalled();
        });

        it("start", () => {
            jest.spyOn(PerformanceCapture, "start").mockReturnValue({ id: "123456" });
            expect(PerfCapture.start("", "")).toEqual({ id: "123456" });
        });

        it("end", () => {
            jest.spyOn(PerformanceCapture, "end").mockReturnValue();
            PerfCapture.end({ id: "" });
            expect(PerformanceCapture.end).toHaveBeenCalled();
        });

        it("saveToFile", async () => {
            jest.spyOn(PerformanceCapture, "saveToFile").mockReturnValue();
            await PerfCapture.saveToFile("");
            expect(PerformanceCapture.saveToFile).toHaveBeenCalled();
        });
    });

    describe("Log", () => {
        it("log", () => {
            jest.spyOn(ConsoleLog, "log").mockImplementation();
            Log.log("");
            expect(ConsoleLog.log).toHaveBeenCalled();
        });

        it("info", () => {
            jest.spyOn(ConsoleLog, "info").mockImplementation();
            Log.info("");
            expect(ConsoleLog.info).toHaveBeenCalled();
        });

        it("warn", () => {
            jest.spyOn(ConsoleLog, "warn").mockImplementation();
            Log.warn("");
            expect(ConsoleLog.warn).toHaveBeenCalled();
        });

        it("debug", () => {
            jest.spyOn(ConsoleLog, "debug").mockImplementation();
            Log.debug("");
            expect(ConsoleLog.debug).toHaveBeenCalled();
        });

        it("error", () => {
            jest.spyOn(ConsoleLog, "error").mockImplementation();
            Log.error("");
            expect(ConsoleLog.error).toHaveBeenCalled();
        });

        it("fatal", () => {
            jest.spyOn(ConsoleLog, "fatal").mockImplementation();
            Log.fatal("");
            expect(ConsoleLog.fatal).toHaveBeenCalled();
        });
    });

    describe("PerfHelper", () => {
        it("start", () => {
            jest.spyOn(PerformanceHelper, "start").mockReturnValue({
                id: "123",
                start: 0,
                forceLog: false,
            });
            const rec = PerfHelper.start("");
            expect(rec.id).toEqual("123");
        });

        it("end", () => {
            jest.spyOn(PerformanceHelper, "end").mockReturnValue(1000);
            expect(PerfHelper.end({ id: "123", start: 0, forceLog: false })).toEqual(1000);
        });
    });
});
