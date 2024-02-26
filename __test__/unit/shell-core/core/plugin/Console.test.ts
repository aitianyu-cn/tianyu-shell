/**@format */

import { Log as BaseLog, MapOfBoolean } from "@aitianyu.cn/types";
import { ITianyuShellCoreBaseConfigure } from "../../../../../packages/shell-core/src/core/declares/Core";
import { TianyuShellProcessor } from "../../../../../packages/shell-core/src/core/utils/Processor";
import { PerfCaptureStatusType } from "../../../../../packages/shell-core/src/core/declares/Console";
import { ITianyuShell } from "../../../../../packages/shell-core/src/core/declares/Declare";
import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";
import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/tianyuShell";

const { Blob } = require("blob-polyfill");

const config = require("../../../../config/env.json") as ITianyuShellInitial;
initialTianyuShell(config);

global.Blob = Blob;

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Console", () => {
    const { FeatureToggle } = require("../../../../../packages/shell-core/src/core/plugin/FeatureToggle");
    const { Log, PerfCapture, PerfHelper, _console } = require("../../../../../packages/shell-core/src/core/plugin/Console");

    const coreConfigure: ITianyuShellCoreBaseConfigure = {
        environment: "development",
        version: "0.0.0",
        runtime: {
            console: true,
        },
    };
    const features: MapOfBoolean = {
        TIANYU_SHELL_CONSOLE_LOG: true,
    };

    beforeAll(() => {
        jest.setTimeout(5000);
    });

    beforeEach(() => {
        jest.spyOn(BaseLog, "log");
        jest.spyOn(BaseLog, "info");
        jest.spyOn(BaseLog, "warn");
        jest.spyOn(BaseLog, "debug");
        jest.spyOn(BaseLog, "error");
        jest.spyOn(BaseLog, "fatal");

        jest.spyOn(TianyuShellProcessor, "getCoreConfigure").mockReturnValue(coreConfigure);
        jest.spyOn(FeatureToggle, "isActive").mockImplementation((feature) => {
            return !!features[feature as any];
        });

        coreConfigure.runtime.console = true;
        features["TIANYU_SHELL_CONSOLE_LOG"] = true;
    });

    it("test for global setting", () => {
        expect(((window as any).tianyuShell as ITianyuShell).core.console).toBeDefined();
    });

    describe("Log", () => {
        describe("test console enable", () => {
            it("core config is off and feature toggle is off", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.log("test");

                expect(BaseLog.log).not.toHaveBeenCalled();
            });

            it("core config is off and feature toggle is on", () => {
                coreConfigure.runtime.console = false;

                Log.log("test");

                expect(BaseLog.log).toHaveBeenCalledWith("test", undefined, undefined);
            });

            it("core config is on and feature toggle is off", () => {
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.log("test");

                expect(BaseLog.log).toHaveBeenCalledWith("test", undefined, undefined);
            });

            it("test for window tianyuShell object", () => {
                const tianyuShell = (window as any).tianyuShell;
                expect(tianyuShell).toBeDefined();
                expect(tianyuShell.core.console).toBeDefined();
                expect(tianyuShell.core.console.capture).toBe(_console.capture);
                expect(tianyuShell.core.console.perfHelper).toBe(_console.perfHelper);
                expect(tianyuShell.core.console.log).toBe(_console.log);
            });
        });

        describe("info", () => {
            it("enable log", () => {
                Log.info("test");

                expect(BaseLog.info).toHaveBeenCalledWith("test", undefined);
            });

            it("disable log", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.info("test");

                expect(BaseLog.info).not.toHaveBeenCalled();
            });
        });

        describe("warn", () => {
            it("enable log", () => {
                Log.warn("test");

                expect(BaseLog.warn).toHaveBeenCalledWith("test", undefined);
            });

            it("disable log", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.warn("test");

                expect(BaseLog.warn).not.toHaveBeenCalled();
            });
        });

        describe("debug", () => {
            it("enable log", () => {
                Log.debug("test");

                expect(BaseLog.debug).toHaveBeenCalledWith("test", undefined);
            });

            it("disable log", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.debug("test");

                expect(BaseLog.debug).not.toHaveBeenCalled();
            });
        });

        describe("error", () => {
            it("enable log", () => {
                Log.error("test");

                expect(BaseLog.error).toHaveBeenCalledWith("test", undefined);
            });

            it("disable log", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.error("test");

                expect(BaseLog.error).not.toHaveBeenCalled();
            });
        });

        describe("fatal", () => {
            it("enable log", () => {
                Log.fatal("test");

                expect(BaseLog.fatal).toHaveBeenCalledWith("test", undefined);
            });

            it("disable log", () => {
                coreConfigure.runtime.console = false;
                features["TIANYU_SHELL_CONSOLE_LOG"] = false;

                Log.fatal("test");

                expect(BaseLog.fatal).not.toHaveBeenCalled();
            });
        });
    });

    describe("PerfCapture", () => {
        const fnCallback = (option: PerfCaptureStatusType, capture: string, time: number) => {
            //
        };

        beforeAll(() => {
            PerfCapture.addCallback(fnCallback);
        });

        beforeEach((done) => {
            PerfCapture.clean().finally(done);
        });

        describe("start", () => {
            it("no id or classify should throw error", () => {
                expect(() => {
                    PerfCapture.start("", "id");
                }).toThrow(Error("Performace Capture cannot handle when the id or classification is empty or null"));

                expect(() => {
                    PerfCapture.start("class", "");
                }).toThrow(Error("Performace Capture cannot handle when the id or classification is empty or null"));
            });

            it("success start", () => {
                const recorder = PerfCapture.start("test", "test", true);

                expect(BaseLog.debug).toHaveBeenCalled();
                expect(recorder.index).toEqual(1);
                recorder.finish();
            });
        });

        describe("end", () => {
            it("invalid capture", () => {
                expect(() => {
                    PerfCapture.end({
                        index: 1,
                        finish: () => {},
                    });
                }).toThrow(Error("Cannot find the specified recorder, the recorder is not addressable."));
            });

            it("end success", (done) => {
                const recorder = PerfCapture.start("test", "test", true);

                expect(BaseLog.debug).toHaveBeenCalled();
                expect(recorder.index).toEqual(1);

                const promiseFinish = recorder.finish;
                recorder.finish = () => {
                    expect(BaseLog.debug).toHaveBeenCalledTimes(2);
                    promiseFinish();
                    done();
                };

                PerfCapture.end(recorder);
            });
        });

        it("download File", (done) => {
            jest.spyOn(global.HTMLElement.prototype, "click").mockImplementation(() => {});

            const recorder1 = PerfCapture.start("first", "first", true);
            const recorder2 = PerfCapture.start("second", "second", true);
            const recorder3 = PerfCapture.start("first", "first", true);
            const recorder4 = PerfCapture.start("first", "first", true);

            const aPromises: Promise<void>[] = [];

            aPromises.push(
                new Promise<void>((resolve) => {
                    setTimeout(() => {
                        PerfCapture.end(recorder1);
                        resolve();
                    }, 1500);
                }),
            );
            aPromises.push(
                new Promise<void>((resolve) => {
                    setTimeout(() => {
                        PerfCapture.end(recorder2);
                        resolve();
                    }, 1000);
                }),
            );
            aPromises.push(
                new Promise<void>((resolve) => {
                    setTimeout(() => {
                        PerfCapture.end(recorder3);
                        resolve();
                    }, 1100);
                }),
            );
            aPromises.push(
                new Promise<void>((resolve) => {
                    setTimeout(() => {
                        PerfCapture.end(recorder4);
                        resolve();
                    }, 1000);
                }),
            );

            Promise.all(aPromises).finally(() => {
                global.URL.createObjectURL = (obj: Blob) => {
                    obj.text().then((value: string) => {
                        try {
                            const perfResult = JSON.parse(value);
                            expect(perfResult.config.baseTime).toBeDefined();
                            expect(perfResult.config.baseTime).not.toEqual(0);

                            expect(Array.isArray(perfResult.trace)).toBeTruthy();
                            expect(perfResult.trace.length).toEqual(4);

                            expect(perfResult.trace[0].name).toEqual("first - first");
                            expect(perfResult.trace[1].name).toEqual("second - second");
                            expect(perfResult.trace[2].name).toEqual("first - first (1)");
                            expect(perfResult.trace[3].name).toEqual("first - first (2)");

                            done();
                        } catch (e) {
                            done.fail(e as any);
                        }
                    });
                    return "test_link";
                };

                PerfCapture.saveToFile("file");
            });
        });
    });

    it("PerfHelper", (done) => {
        const perfRecorder = PerfHelper.start("test", true);

        expect(BaseLog.debug).toHaveBeenCalled();

        setTimeout(() => {
            const during = PerfHelper.end(perfRecorder);
            expect(during).toBeGreaterThan(0);
            expect(BaseLog.debug).toHaveBeenCalledTimes(2);
            done();
        }, 1000);
    });
});
