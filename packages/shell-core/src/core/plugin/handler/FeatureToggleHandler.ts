/** @format */

import { ITianyuShell } from "../../declares/Declare";
import { FeatureToggleImpl } from "../impl/FeatureToggleImpl";

export function initTianyuShellFeatureToggle(): void {
    const windowObj = window as any;
    if (!(windowObj.tianyuShell as ITianyuShell)?.core?.featureToggle) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                featureToggle: FeatureToggleImpl,
            },
        };
    }
}
