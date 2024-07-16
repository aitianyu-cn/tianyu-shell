/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { ConsoleLog } from "../impl/ConsoleLogImpl";
import { PerformanceCapture, PerformanceHelper } from "../impl/PerformanceImpl";

export function initTianyuShellConsole(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.console) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || /* istanbul ignore next */ {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || /* istanbul ignore next */ {}),
                console: {
                    capture: PerformanceCapture,
                    perfHelper: PerformanceHelper,

                    log: ConsoleLog,
                },
            },
        };
    }
}
