/** @format */

import { InstanceId, ITianyuStoreInterface, SelectorFactor, StoreHelper, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { CreateTianyuShellInfraAction, DestroyTianyuShellInfraAction } from "./initial/CreateAction";
import {
    getCoreConfigure,
    getLanguageConfigures,
    getPluginSetting,
    getRuntimeSetting,
    getRuntimeSupport,
    getUIConfigures,
} from "./initial/Selectors";
import { ITianyuShellInitial } from "./ITianyuShellInitial";
import { getNoHisSupportedIns } from "./utils/Store";
import { ITianyuShellUIConfigure } from "./declares/ui/UserInterface";
import {
    ITianyuShellCookieConfigure,
    ITianyuShellCoreBaseConfigure,
    ITianyuShellPluginSetting,
    ITianyuShellRuntimeSetting,
    ITianyuShellRuntimeSupport,
} from "./declares/Core";

export const TIANYU_SHELL_INFRA_STORE_TYPE = "tianyu-shell-infra";

export function getTianyuShellInfraInstanceId(): InstanceId {
    return StoreHelper.generateInstanceId(getNoHisSupportedIns(), TIANYU_SHELL_INFRA_STORE_TYPE, "tianyu-shell-infra");
}

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
};

export const TianyuShellInfraInterfaceExpose = {
    getUIConfigures: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellUIConfigure>(),
    getLanguageConfigures: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellCookieConfigure>(),
    getCoreConfigure: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellCoreBaseConfigure>(),
    getPluginSetting: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellPluginSetting>(),
    getRuntimeSetting: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellRuntimeSetting>(),
    getRuntimeSupport: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellRuntimeSupport>(),
};

TianyuShellInfraInterface as ITianyuStoreInterface<ITianyuShellInitial>;
StoreUtils.registerExpose(TianyuShellInfraInterface, TIANYU_SHELL_INFRA_STORE_TYPE);
StoreUtils.registerExpose(TianyuShellInfraInterfaceExpose, TIANYU_SHELL_INFRA_STORE_TYPE);
