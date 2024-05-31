/** @format */

import { InstanceId, StoreHelper } from "@aitianyu.cn/tianyu-store";
import { getInstanceId } from "shell-core/src/core/utils/Store";
import { StoreType } from "../plugin/interface/StoreTypes";

export function getBackgroundInstanceId(): InstanceId {
    return StoreHelper.generateInstanceId(getInstanceId(), StoreType.BACKGROUND_STORE_TYPE, "background");
}
