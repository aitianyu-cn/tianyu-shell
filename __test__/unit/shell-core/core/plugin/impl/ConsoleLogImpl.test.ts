/** @format */

import { IInstanceAction } from "@aitianyu.cn/tianyu-store";
import { LogLevel } from "@aitianyu.cn/types";
import { ConsoleLog } from "shell-core/src/core/plugin/impl/ConsoleLogImpl";
import { TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.impl.ConsoleLogImpl", () => {
    describe("ConsoleLog", () => {
        it("log", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    TianyuShellCoreInterface.console.log.info.fullName,
                );
                done();
            });

            ConsoleLog.log("");
        });

        it("info", () => {
            jest.spyOn(ConsoleLog, "log");
            ConsoleLog.info("test", true);
            expect(ConsoleLog.log).toHaveBeenCalledWith("test", LogLevel.INFO, true);
        });

        it("warn", () => {
            jest.spyOn(ConsoleLog, "log");
            ConsoleLog.warn("test", true);
            expect(ConsoleLog.log).toHaveBeenCalledWith("test", LogLevel.WARNING, true);
        });

        it("debug", () => {
            jest.spyOn(ConsoleLog, "log");
            ConsoleLog.debug("test", true);
            expect(ConsoleLog.log).toHaveBeenCalledWith("test", LogLevel.DEBUG, true);
        });

        it("error", () => {
            jest.spyOn(ConsoleLog, "log");
            ConsoleLog.error("test", true);
            expect(ConsoleLog.log).toHaveBeenCalledWith("test", LogLevel.ERROR, true);
        });

        it("fatal", () => {
            jest.spyOn(ConsoleLog, "log");
            ConsoleLog.fatal("test", true);
            expect(ConsoleLog.log).toHaveBeenCalledWith("test", LogLevel.FATAL, true);
        });
    });
});
