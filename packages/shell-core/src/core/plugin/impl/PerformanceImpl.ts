/** @format */

import { guid } from "@aitianyu.cn/types";
import { IPerformanceCapture, ICaptureRecorder, IPerformanceHelper, PerformanceRecorder } from "../../declares/Console";
import { getStore } from "../../utils/Store";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "../store/Exports";
import { getText } from "../i18n/Message";
import { ConsoleLog } from "./ConsoleLogImpl";

export const PerformanceCapture: IPerformanceCapture = {
    clean: async function (): Promise<void> {
        return getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.clean(getTianyuShellCoreInstanceId()),
        );
    },
    start: function (classify: string, id: string, forceLog?: boolean): ICaptureRecorder {
        const captureId = guid();
        getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.start(getTianyuShellCoreInstanceId(), {
                guid: captureId,
                classify,
                id,
                forceLog,
            }),
        );
        return {
            id: captureId,
        };
    },
    end: function (recorder: ICaptureRecorder): void {
        getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.end(getTianyuShellCoreInstanceId(), recorder.id),
        );
    },
    saveToFile: function (fileName: string): void {
        getStore().dispatch(
            TianyuShellCoreInterface.console.capture.action.donwload(getTianyuShellCoreInstanceId(), fileName),
        );
    },
};

export const PerformanceHelper: IPerformanceHelper = {
    start: function (id: string, forceLog?: boolean): PerformanceRecorder {
        // create a new recorder
        const _perf: PerformanceRecorder = {
            id: id,
            start: Date.now(),
            forceLog: !!forceLog,
        };

        if (forceLog) {
            ConsoleLog.debug(getText("CONSOLE_PERF_HELPER_START", [id, _perf.start]), true);
        }

        return _perf;
    },
    end: function (perf: PerformanceRecorder): number {
        // get end time and calculate during
        const end = Date.now();
        const during = end - perf.start;

        // format perf time message
        if (perf.forceLog) {
            let time = during / 1000;

            const millisecond = time % 1000;
            time = (time - millisecond) / 1000;

            const second = time % 60;
            time = (time - second) / 60;

            const minutes = time % 60;
            time = (time - minutes) / 60;

            const hour = time;

            ConsoleLog.debug(
                getText("CONSOLE_PERF_HELPER_END", [perf.id, perf.start, end, hour, minutes, second, millisecond]),
            );
        }

        return during;
    },
};
