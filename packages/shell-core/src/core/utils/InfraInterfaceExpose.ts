/** @format */

import { SelectorFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellCompatibilityConfig,
    ITianyuShellCookieConfigure,
    ITianyuShellCoreBaseConfigure,
    ITianyuShellPluginSetting,
    ITianyuShellRuntimeSetting,
    ITianyuShellRuntimeSupport,
} from "../declares/Core";
import { ITianyuShellUIConfigure } from "../declares/ui/UserInterface";
import { ITianyuShellInitial } from "../ITianyuShellInitial";
import { TIANYU_SHELL_INFRA_STORE_TYPE } from "../declares/Constant";

export { getTianyuShellInfraInstanceId } from "shell-core/src/core/initial/store-api/TianyushellInfraInterface";

export const TianyuShellInfraInterfaceExpose = {
    getUIConfigures: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellUIConfigure>(),
    getLanguageConfigures: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellCookieConfigure>(),
    getCoreConfigure: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellCoreBaseConfigure>(),
    getPluginSetting: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellPluginSetting>(),
    getRuntimeSetting: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellRuntimeSetting>(),
    getRuntimeSupport: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellRuntimeSupport>(),
    getCompatibilityConfig: SelectorFactor.makeVirtualSelector<ITianyuShellInitial, ITianyuShellCompatibilityConfig>(),
};

StoreUtils.registerExpose(TianyuShellInfraInterfaceExpose, TIANYU_SHELL_INFRA_STORE_TYPE);
