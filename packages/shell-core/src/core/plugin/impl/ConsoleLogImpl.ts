/** @format */

import { ILog, LogLevel } from "@aitianyu.cn/types";
import { getStore } from "../../utils/Store";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "../store/Exports";

/**
 * Tianyu Shell Log Implementation
 *
 * All Tianyu Shell feature should using this Log to print console data
 * All Log function will follow console log setting
 */
export const ConsoleLog: ILog = {
    log(msg: string, level?: LogLevel, timer?: boolean): void {
        getStore().dispatch(
            TianyuShellCoreInterface.console.log(getTianyuShellCoreInstanceId(), {
                message: msg,
                level,
                timer,
            }),
        );
    },
    info(msg: string, timer?: boolean): void {
        ConsoleLog.log(decodeURI(msg), LogLevel.INFO, timer);
    },
    warn(msg: string, timer?: boolean): void {
        ConsoleLog.log(decodeURI(msg), LogLevel.WARNING, timer);
    },
    debug(msg: string, timer?: boolean): void {
        ConsoleLog.log(decodeURI(msg), LogLevel.DEBUG, timer);
    },
    error(msg: string, timer?: boolean): void {
        ConsoleLog.log(decodeURI(msg), LogLevel.ERROR, timer);
    },
    fatal(msg: string, timer?: boolean): void {
        ConsoleLog.log(decodeURI(msg), LogLevel.FATAL, timer);
    },
};
