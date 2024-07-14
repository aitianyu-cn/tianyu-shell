/** @format */

import { InstanceId, ITianyuStoreInterface, SelectorFactor, StoreHelper, StoreUtils } from "@aitianyu.cn/tianyu-store";
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
import { getNoHisSupportedIns } from "../../utils/Store";
import { getTianyuShellInfraInstanceId } from "../../utils/InfraInterfaceExpose";
import { TIANYU_SHELL_INFRA_STORE_TYPE } from "../../declares/Constant";

export const TianyuShellInfraInstanceId = getTianyuShellInfraInstanceId();

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
