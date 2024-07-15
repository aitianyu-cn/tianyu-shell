/**@format */

import { ILog } from "@aitianyu.cn/types";

/**A type of Tianyu Shell perf capture callback function to indicate the start and end */
export type PerfCaptureStatusType = "START" | "END";

/** Tianyu Shell perf capture recorder */
export interface ICaptureRecorder {
    /** the recorder id of capture */
    id: string;
}

/**Callback function of Tianyu Shell perf capture */
export type PerfCaptureCallback = (option: PerfCaptureStatusType, capture: string, time: number) => void;

/**Tianyu Shell Performance Capture API */
export interface IPerformanceCapture {
    /**clean all perf capture */
    clean(): Promise<void>;
    /**
     * start a perf capture recording
     *
     * @param classify capture classify (support duplicate)
     * @param id the capture id (duplicate id will be processed with end fix)
     * @param forceLog a flag to descide recording the log
     *
     * @returns return a capture recorder object
     */
    start(classify: string, id: string, forceLog?: boolean): ICaptureRecorder;
    /**
     * end a perf capture recorder
     *
     * @param recorder a recorder object
     */
    end(recorder: ICaptureRecorder): void;
    /**
     * Record current perf capture to file and download
     *
     * @param fileName the download file name
     */
    saveToFile(fileName: string): void;
}

/** Tianyu Shell Performance recorder */
export interface PerformanceRecorder {
    /** performance recording id */
    id: string;
    /** performance start time */
    start: number;
    /** a flag to log the performance */
    forceLog: boolean;
}

/**Tianyu Shell Performance API */
export interface IPerformanceHelper {
    /**
     * To start a performance recording
     *
     * @param id recording id
     * @param forceLog a flag to log the performance
     *
     * @returns return a recorder object
     */
    start(id: string, forceLog?: boolean): PerformanceRecorder;
    /**
     * To end a performance recording
     *
     * @param perf the performance recorder object
     *
     * @returns return the during time of current performance recording
     */
    end(perf: PerformanceRecorder): number;
}

/** Performance API of Tianyu Shell Core */
export interface ITianyuShellCoreConsole {
    /**Tianyu Shell Performance Capture API */
    capture: IPerformanceCapture;
    /**Tianyu Shell Performance API */
    perfHelper: IPerformanceHelper;

    /** Tianyu Shell Log Interface */
    log: ILog;
}
