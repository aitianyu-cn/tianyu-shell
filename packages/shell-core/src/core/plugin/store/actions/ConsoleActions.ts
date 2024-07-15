/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { Log, LogLevel } from "@aitianyu.cn/types";
import { getCoreConfigure } from "shell-core/src/core/initial/store-api/Selectors";
import { IsFeatureToggleActive } from "../selectors/FeatureToggleSelector";
import { getTianyuShellInfraInstanceId } from "shell-core/src/core/initial/store-api/TianyushellInfraInterface";

export const ConsoleLogAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        message: string;
        level?: LogLevel;
        timer?: boolean;
        forceLog?: boolean;
    }
>().withHandler(function* (action) {
    const config = yield* StoreUtils.Handler.doSelector(getCoreConfigure(getTianyuShellInfraInstanceId()));
    const featureState = yield* StoreUtils.Handler.doSelector(
        IsFeatureToggleActive(action.instanceId, "TIANYU_SHELL_CONSOLE_LOG"),
    );

    const runtimeEnabled = !(config instanceof Missing) && config.runtime.console;
    const toggleEnabled = !(featureState instanceof Missing) && featureState;

    if (action.params.forceLog || runtimeEnabled || toggleEnabled) {
        Log.log(action.params.message, action.params.level, action.params.timer);
    }
});
