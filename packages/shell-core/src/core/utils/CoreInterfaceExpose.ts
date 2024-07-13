/** @format */

import { ActionFactor, InstanceId, SelectorFactor, StoreHelper, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { getNoHisSupportedIns } from "./Store";
import { ITianyuShellCoreState, ITianyuShellFeatureToggleState } from "../plugin/store/State";
import { AreaCode, MapOfBoolean } from "@aitianyu.cn/types";

export const TIANYU_SHELL_CORE_STORE_TYPE = "tianyu-shell";

export function getTianyuShellCoreInstanceId(): InstanceId {
    return StoreHelper.generateInstanceId(getNoHisSupportedIns(), TIANYU_SHELL_CORE_STORE_TYPE, "tianyu-shell-core");
}

export const TianyuShellCoreInterfaceExpose = {
    event: {
        select: {
            isLoaded: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, boolean>(),
            getHash: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, string>(),
            getPageSize: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, number>(),
        },
    },

    featureToggle: {
        action: {
            add: ActionFactor.makeVirtualAction<
                ITianyuShellCoreState,
                ITianyuShellFeatureToggleState,
                ITianyuShellFeatureToggleState
            >(),
            enable: ActionFactor.makeVirtualAction<
                ITianyuShellCoreState,
                {
                    featureName: string;
                    enableDepFeatures: boolean;
                },
                MapOfBoolean
            >(),
            disable: ActionFactor.makeVirtualAction<
                ITianyuShellCoreState,
                {
                    featureName: string;
                    disableDepFeatures: boolean;
                },
                MapOfBoolean
            >(),
        },

        select: {
            getInfo: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, ITianyuShellFeatureToggleState>(),
            allFeature: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, MapOfBoolean>(),
            isActive: SelectorFactor.makeVirtualParameterSelector<ITianyuShellCoreState, string, boolean>(),
            contains: SelectorFactor.makeVirtualParameterSelector<ITianyuShellCoreState, string, boolean>(),
        },
    },

    language: {
        action: {
            set: ActionFactor.makeVirtualAction<ITianyuShellCoreState, string | AreaCode, string | null>(),
        },

        select: {
            get: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, AreaCode>(),
            getString: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, string>(),
            isSupport: SelectorFactor.makeVirtualParameterSelector<ITianyuShellCoreState, string, boolean>(),

            getSupport: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, string[]>(),
            getPending: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, string[]>(),
        },
    },

    compatibility: {
        select: {
            getThemes: SelectorFactor.makeVirtualSelector<ITianyuShellCoreState, string[]>(),
        },
    },
};

StoreUtils.registerExpose(TianyuShellCoreInterfaceExpose, TIANYU_SHELL_CORE_STORE_TYPE);
