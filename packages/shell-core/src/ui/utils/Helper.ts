/**@format */

import { getStore } from "shell-core/src/core/utils/Store";
import {
    TianyuShellUIMajorZIndex,
    TianyuShellUIMessageZIndex,
    TianyuShellUIDialogZIndex,
    TianyuShellUIZIndexMaximum,
} from "../common/Declare";
import { IZIndexVerification } from "../common/Interface";
import {
    getTianyuShellInfraInstanceId,
    TianyuShellInfraInterfaceExpose,
} from "shell-core/src/core/TianyushellInfraInterfaceExpose";
import { Missing } from "@aitianyu.cn/tianyu-store";

const _ZIndexVerification: IZIndexVerification = {
    background: (index: number) => {
        return index < TianyuShellUIMajorZIndex;
    },
    major: (index: number) => {
        return index < TianyuShellUIMessageZIndex;
    },
    message: (index: number) => {
        return index < TianyuShellUIDialogZIndex;
    },
    dialog: (index: number) => {
        return index < TianyuShellUIZIndexMaximum;
    },
};

/** Tianyu Shell UI Helper */
export class TianyuShellUIHelper {
    /** Z-Index Verification API */
    public static zIndexVerification: IZIndexVerification = _ZIndexVerification;

    /**
     * Check tianyu shell ui core is supported or not
     *
     * @returns return true if the core supportable is true, otherwise false
     */
    public static isCoreSupportable(): boolean {
        const configure = getStore().selecte(
            TianyuShellInfraInterfaceExpose.getUIConfigures(getTianyuShellInfraInstanceId()),
        );
        return !(configure instanceof Missing) && configure.core.support;
    }
}
