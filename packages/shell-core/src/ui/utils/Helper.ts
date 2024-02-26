/**@format */

import {
    TianyuShellUIMajorZIndex,
    TianyuShellUIMessageZIndex,
    TianyuShellUIDialogZIndex,
    TianyuShellUIZIndexMaximum,
} from "../common/Declare";
import { IZIndexVerification } from "../common/Interface";
import { TianyuShellProcessor } from "shell-core/src/core/utils/Processor";

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
        return TianyuShellProcessor.getUIConfigures().core.support;
    }
}
