/** @format */

import { InstanceId, StoreHelper } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { getHistroySupportedIns, getNoHisSupportedIns } from "shell-core/src/core/utils/Store";
import { StoreType } from "../plugin/interface/StoreTypes";

const InstanceMap: MapOfType<InstanceId> = {};

export function getBackgroundInstanceId(): InstanceId {
    if (!InstanceMap[StoreType.BACKGROUND_STORE_TYPE]) {
        InstanceMap[StoreType.BACKGROUND_STORE_TYPE] = StoreHelper.generateInstanceId(
            getHistroySupportedIns(),
            StoreType.BACKGROUND_STORE_TYPE,
            "background",
        );
    }
    return InstanceMap[StoreType.BACKGROUND_STORE_TYPE];
}

export function getMessageInstanceId(): InstanceId {
    if (!InstanceMap[StoreType.MESSAGE_STORE_TYPE]) {
        InstanceMap[StoreType.MESSAGE_STORE_TYPE] = StoreHelper.generateInstanceId(
            getNoHisSupportedIns(),
            StoreType.MESSAGE_STORE_TYPE,
            "message",
        );
    }
    return InstanceMap[StoreType.MESSAGE_STORE_TYPE];
}

export function getStylingInstanceId(): InstanceId {
    if (!InstanceMap[StoreType.STYLING_STORE_TYPE]) {
        InstanceMap[StoreType.STYLING_STORE_TYPE] = StoreHelper.generateInstanceId(
            getHistroySupportedIns(),
            StoreType.STYLING_STORE_TYPE,
            "styling",
        );
    }
    return InstanceMap[StoreType.STYLING_STORE_TYPE];
}

export function getDialogInstanceId(): InstanceId {
    if (!InstanceMap[StoreType.DIALOG_STORE_TYPE]) {
        InstanceMap[StoreType.DIALOG_STORE_TYPE] = StoreHelper.generateInstanceId(
            getHistroySupportedIns(),
            StoreType.DIALOG_STORE_TYPE,
            "dialog",
        );
    }
    return InstanceMap[StoreType.DIALOG_STORE_TYPE];
}
