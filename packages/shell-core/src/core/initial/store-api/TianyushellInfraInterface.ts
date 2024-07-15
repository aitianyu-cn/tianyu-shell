/** @format */

import { InstanceId, ITianyuStoreInterface, StoreHelper, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { CreateTianyuShellInfraAction, DestroyTianyuShellInfraAction } from "./CreateAction";
import {
    getCompatibilityConfig,
    getCoreConfigure,
    getLanguageConfigures,
    getPluginSetting,
    getRuntimeSetting,
    getRuntimeSupport,
    getUIConfigures,
} from "./Selectors";
import { ITianyuShellInitial } from "../../ITianyuShellInitial";
import { TIANYU_SHELL_INFRA_STORE_TYPE } from "../../declares/Constant";
import { getNoHisSupportedIns, getStore } from "../../utils/Store";

export function getTianyuShellInfraInstanceId(): InstanceId {
    return StoreHelper.generateInstanceId(getNoHisSupportedIns(), TIANYU_SHELL_INFRA_STORE_TYPE, "tianyu-shell-infra");
}

export const TianyuShellInfraInterface = {
    core: {
        creator: CreateTianyuShellInfraAction,
        destroy: DestroyTianyuShellInfraAction,
    },

    getUIConfigures,
    getLanguageConfigures,
    getCoreConfigure,
    getPluginSetting,
    getRuntimeSetting,
    getRuntimeSupport,
    getCompatibilityConfig,
};

TianyuShellInfraInterface as ITianyuStoreInterface<ITianyuShellInitial>;

StoreUtils.registerExpose(TianyuShellInfraInterface, TIANYU_SHELL_INFRA_STORE_TYPE);
