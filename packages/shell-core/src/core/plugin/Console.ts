/**@format */

import { LogLevel } from "@aitianyu.cn/types";
import { ICaptureRecorder, PerformanceRecorder } from "../declares/Console";
import { PerformanceCapture, PerformanceHelper } from "./impl/PerformanceImpl";
import { ConsoleLog } from "./impl/ConsoleLogImpl";

/** Tianyu Shell Performance Capture */
export class PerfCapture {
    /**
     * Wait for all performance capture doen and clean all perf capture
     *
     * @returns return an async Promise
     */
    public static async clean(): Promise<void> {
        return PerformanceCapture.clean();
    }

    /**
     * start a perf capture recording
     *
     * @param classify capture classify (support duplicate)
     * @param id the capture id (duplicate id will be processed with end fix)
     * @param forceLog a flag to descide recording the log
     *
     * @returns return a capture recorder object
     */
    public static start(classify: string, id: string, forceLog?: boolean): ICaptureRecorder {
        return PerformanceCapture.start(classify, id, forceLog);
    }

    /**
     * end a perf capture recorder
     *
     * @param recorder a recorder object
     */
    public static end(recorder: ICaptureRecorder): void {
        return PerformanceCapture.end(recorder);
    }

    /**
     * Record current perf capture to file and download
     *
     * @param fileName the download file name
     */
    public static saveToFile(fileName: string): void {
        return PerformanceCapture.saveToFile(fileName);
    }
}

/** Tianyu Shell Log */
export class Log {
    /**
     * Write a console log with specified log level
     *
     * @param msg the message body
     * @param level the console log level, if not be specified, to print as default log
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static log(msg: string, level?: LogLevel, timer?: boolean): void {
        ConsoleLog.log(msg, level, timer);
    }
    /**
     * Write a console info log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static info(msg: string, timer?: boolean): void {
        ConsoleLog.info(msg, timer);
    }
    /**
     * Write a console warning log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static warn(msg: string, timer?: boolean): void {
        ConsoleLog.warn(msg, timer);
    }
    /**
     * Write a console debug log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static debug(msg: string, timer?: boolean): void {
        ConsoleLog.debug(msg, timer);
    }
    /**
     * Write a console error message
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static error(msg: string, timer?: boolean): void {
        ConsoleLog.error(msg, timer);
    }
    /**
     * Write a console fatal message
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static fatal(msg: string, timer?: boolean): void {
        ConsoleLog.fatal(msg, timer);
    }
}

/** Tianyu Shell Performance Helper */
export class PerfHelper {
    /**
     * To start a performance recording
     *
     * @param id recording id
     * @param forceLog a flag to log the performance
     *
     * @returns return a recorder object
     */
    public static start(id: string, forceLog?: boolean): PerformanceRecorder {
        return PerformanceHelper.start(id, forceLog);
    }
    /**
     * To end a performance recording
     *
     * @param perf the performance recorder object
     *
     * @returns return the during time of current performance recording
     */
    public static end(perf: PerformanceRecorder): number {
        return PerformanceHelper.end(perf);
    }
}
