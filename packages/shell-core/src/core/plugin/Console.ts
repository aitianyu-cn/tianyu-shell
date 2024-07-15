/**@format */

import { ILog, Log as basicLog, LogLevel, MapOfType } from "@aitianyu.cn/types";
import { FeatureToggle } from "./FeatureToggle";
import {
    ICaptureRecorder,
    PerformanceRecorder,
    IPerformanceCapture,
    IPerformanceHelper,
    ITianyuShellCoreConsole,
    PerfCaptureCallback,
} from "../declares/Console";
import { ITianyuShell } from "../declares/Declare";
import { getText } from "./i18n/Message";
import { getStore } from "../utils/Store";
import { getTianyuShellInfraInstanceId, TianyuShellInfraInterfaceExpose } from "../utils/InfraInterfaceExpose";
import { Missing } from "@aitianyu.cn/tianyu-store";

/**
 * Check for console log enable status
 *
 * @param forceLog force log anyway and by pass checking runtime setting and feature toggle
 * @returns return true indicates should print console log, otherwise false
 */
function _isConsoleEnabled(forceLog?: boolean): boolean {
    const configure = getStore().selecte(
        TianyuShellInfraInterfaceExpose.getCoreConfigure(getTianyuShellInfraInstanceId()),
    );
    // get console log setting from core configure
    const runtimeEnable = !(configure instanceof Missing) && configure.runtime.console;
    // get from feature toggle
    const featureToggleEnable = FeatureToggle.isActive("TIANYU_SHELL_CONSOLE_LOG");

    return !!forceLog || runtimeEnable || featureToggleEnable;
}

/**
 * Tianyu Shell Log Implementation
 *
 * All Tianyu Shell feature should using this Log to print console data
 * All Log function will follow console log setting
 */
const _log: ILog = {
    log(msg: string, level?: LogLevel, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.log(decodeURI(msg), level, timer);
    },
    info(msg: string, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.info(decodeURI(msg), timer);
    },
    warn(msg: string, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.warn(decodeURI(msg), timer);
    },
    debug(msg: string, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.debug(decodeURI(msg), timer);
    },
    error(msg: string, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.error(decodeURI(msg), timer);
    },
    fatal(msg: string, timer?: boolean): void {
        const isConsoleEnable = _isConsoleEnabled();
        if (!isConsoleEnable) {
            return;
        }

        basicLog.fatal(decodeURI(msg), timer);
    },
};

/** Inner capture recording data structure */
interface ICaptureRecordItem {
    classify: string;
    id: string;
    /** index of same id and classify capture */
    cid: number;
    /** start performance time */
    start: number;
    /** the end performance time */
    end: number;
    /** to force logger */
    log: boolean;
}

type ICaptureCIItem = MapOfType<number>;

/** Capture Data Segment of Capture Print */
interface ICapturePrintSegment {
    /** start performance time */
    start: number;
    /** the end performance time */
    end: number;
    /** total during time */
    during: number;
}

/** Capture Print Structure Item */
interface ICapturePrintItem {
    /**
     * capture name
     * this is calculated from classify, id and sequence index
     */
    name: string;
    /** capture data */
    segments: ICapturePrintSegment;
}

/**
 * Capture Container
 *
 * To recorder the capture data
 */
class CaptureContainer {
    /** The customized start time */
    private baseTime: number;
    /** capture recording list */
    private captureList: ICaptureRecordItem[];
    /** recorder classify and id counter */
    private captureCI: MapOfType<ICaptureCIItem>;
    /** capture async promise list */
    private capturePromises: Promise<void>[];

    /** capture transaction callback */
    private callback: PerfCaptureCallback | null;

    public constructor() {
        this.baseTime = Date.now();
        this.captureList = [];
        this.captureCI = {};
        this.capturePromises = [];

        this.callback = null;
    }

    public async clean(): Promise<void> {
        return new Promise<void>((resolve) => {
            // wait for all capture done
            Promise.all(this.capturePromises)
                .finally(() => {
                    // reset base time
                    this.baseTime = Date.now();
                    this.captureList = [];
                    this.captureCI = {};
                    this.capturePromises = [];
                })
                .finally(resolve);
        });
    }

    public addCallback(callback: PerfCaptureCallback): void {
        this.callback = callback;
    }

    public start(classify: string, id: string, forceLog?: boolean): ICaptureRecorder {
        // if classify or id is empty - throw an error
        if (!!!id || !!!classify) {
            throw new Error(getText("CONSOLE_CAPTURE_CONTAINER_START_EMPTY"));
        }

        // to init capture recording data
        // to save recording index for same classify and id
        if (!Object.keys(this.captureCI).includes(classify)) {
            this.captureCI[classify] = {};
        }

        if (!Object.keys(this.captureCI[classify]).includes(id)) {
            this.captureCI[classify][id] = 0;
        }

        // get the capture index
        const cId = this.captureCI[classify][id]++;

        // capture done callback
        let fnFinishCall = () => {};
        // create a promise for new capture
        this.capturePromises.push(
            new Promise<void>((resolve) => {
                fnFinishCall = resolve;
            }),
        );
        // create a capture recorder item
        const listItem: ICaptureRecordItem = {
            classify: classify,
            id: id,
            cid: cId,
            start: Date.now(),
            end: -1,
            log: !!forceLog,
        };

        // save the newest capture to list and get an capture index of all recorder
        const lIndex = this.captureList.push(listItem);

        // format capture message and to invoke transcation callback and log
        const cidMsg = cId === 0 ? "" : ` (${cId})`;
        const captureMsg = `${classify} - ${id}${cidMsg}`;
        if (this.callback) {
            this.callback("START", captureMsg, listItem.start);
        }

        if (listItem.log) {
            _log.debug(getText("CONSOLE_CAPTURE_CONTAINER_START", captureMsg), true);
        }

        return { index: lIndex, finish: fnFinishCall };
    }

    public end(recorder: ICaptureRecorder): void {
        // if the capture recorder is invalid, throw exception
        if (this.captureList.length < recorder.index) {
            throw new Error(getText("CONSOLE_CAPTURE_CONTAINER_END_EMPTY"));
        }

        // get capture item
        const item: ICaptureRecordItem = this.captureList[recorder.index - 1];
        // if the end time is not -1, that means the capture has ended already
        if (item.end !== -1) {
            return;
        }
        item.end = Date.now();

        // format capture message and to invoke transcation callback and log
        const cidMsg = item.cid === 0 ? "" : ` (${item.cid})`;
        const captureMsg = `${item.classify} - ${item.id}${cidMsg}`;
        if (this.callback) {
            this.callback("END", captureMsg, item.end);
        }

        if (item.log) {
            _log.debug(getText("CONSOLE_CAPTURE_CONTAINER_START", captureMsg), true);
        }

        // to end the capture recording
        recorder.finish();
    }

    public saveToFile(fileName: string): void {
        const printList: ICapturePrintItem[] = [];

        // to get all capture data and restructure
        for (const item of this.captureList) {
            const cidMsg = item.cid === 0 ? "" : ` (${item.cid})`;
            const captureName = `${item.classify} - ${item.id}${cidMsg}`;
            printList.push({
                name: captureName,
                segments: {
                    start: item.start,
                    end: item.end,
                    during: item.end - item.start,
                },
            });
        }

        // format print object to string
        const result = JSON.stringify({
            config: {
                baseTime: this.baseTime,
            },
            trace: printList,
        });
        this.downloadFile(fileName, result);
    }

    private downloadFile(fileName: string, content: string): void {
        // create a hyper link to download
        const link = document.createElement("a");
        if (typeof Blob !== "undefined") {
            // to create a temp file link
            const file = new Blob([content], { type: "text/plain" });
            // set link url
            link.href = URL.createObjectURL(file);
            // set download file name
            link.download = `${fileName}.json`;
            // to virtual click and download file
            link.click();
        }
    }
}

const _captureContainer = new CaptureContainer();

const _capture: IPerformanceCapture = {
    clean: async function (): Promise<void> {
        return _captureContainer.clean();
    },
    addCallback: function (callback: PerfCaptureCallback): void {
        _captureContainer.addCallback(callback);
    },
    start: function (classify: string, id: string, forceLog?: boolean): ICaptureRecorder {
        return _captureContainer.start(classify, id, forceLog);
    },
    end: function (recorder: ICaptureRecorder): void {
        _captureContainer.end(recorder);
    },
    saveToFile: function (fileName: string): void {
        _captureContainer.saveToFile(fileName);
    },
};

const _perfHelper: IPerformanceHelper = {
    start: function (id: string, forceLog?: boolean): PerformanceRecorder {
        // create a new recorder
        const _perf: PerformanceRecorder = {
            id: id,
            start: Date.now(),
            forceLog: !!forceLog,
        };

        if (forceLog) {
            _log.debug(getText("CONSOLE_PERF_HELPER_START", [id, _perf.start]), true);
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

            _log.debug(
                getText("CONSOLE_PERF_HELPER_END", [perf.id, perf.start, end, hour, minutes, second, millisecond]),
            );
        }

        return during;
    },
};

export const _console: ITianyuShellCoreConsole = {
    capture: _capture,
    perfHelper: _perfHelper,

    log: _log,
};

function _initTianyuShellPerformance(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.console) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                console: _console,
            },
        };
    }
}

const _pluginSetting = getStore().selecte(
    TianyuShellInfraInterfaceExpose.getPluginSetting(getTianyuShellInfraInstanceId()),
);
const globalize = !(_pluginSetting instanceof Missing) && _pluginSetting.globalize;

globalize && _initTianyuShellPerformance();

/** Tianyu Shell Performance Capture */
export class PerfCapture {
    /**
     * Wait for all performance capture doen and clean all perf capture
     *
     * @returns return an async Promise
     */
    public static async clean(): Promise<void> {
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.capture.clean()
            : _capture.clean();
    }

    /**
     * add a callback function to perf capture
     *
     * @param callback callback function
     */
    public static addCallback(callback: PerfCaptureCallback): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.capture.addCallback(callback)
            : _capture.addCallback(callback);
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
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.capture.start(classify, id, forceLog)
            : _capture.start(classify, id, forceLog);
    }

    /**
     * end a perf capture recorder
     *
     * @param recorder a recorder object
     */
    public static end(recorder: ICaptureRecorder): void {
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.capture.end(recorder)
            : _capture.end(recorder);
    }

    /**
     * Record current perf capture to file and download
     *
     * @param fileName the download file name
     */
    public static saveToFile(fileName: string): void {
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.capture.saveToFile(fileName)
            : _capture.saveToFile(fileName);
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
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.log(msg, level, timer)
            : _log.log(msg, level, timer);
    }
    /**
     * Write a console info log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static info(msg: string, timer?: boolean): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.info(msg, timer)
            : _log.info(msg, timer);
    }
    /**
     * Write a console warning log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static warn(msg: string, timer?: boolean): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.warn(msg, timer)
            : _log.warn(msg, timer);
    }
    /**
     * Write a console debug log
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static debug(msg: string, timer?: boolean): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.debug(msg, timer)
            : _log.debug(msg, timer);
    }
    /**
     * Write a console error message
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static error(msg: string, timer?: boolean): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.error(msg, timer)
            : _log.error(msg, timer);
    }
    /**
     * Write a console fatal message
     * @param msg the message body
     * @param timer a boolean value indicates whether needs to add a timestamp for the log
     */
    public static fatal(msg: string, timer?: boolean): void {
        globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.log.fatal(msg, timer)
            : _log.fatal(msg, timer);
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
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.perfHelper.start(id, forceLog)
            : _perfHelper.start(id, forceLog);
    }
    /**
     * To end a performance recording
     *
     * @param perf the performance recorder object
     *
     * @returns return the during time of current performance recording
     */
    public static end(perf: PerformanceRecorder): number {
        return globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.console.perfHelper.end(perf)
            : _perfHelper.end(perf);
    }
}
