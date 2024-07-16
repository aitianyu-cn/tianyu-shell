/** @format */

import { ActionFactor, SelectorFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { CaptureOperationType, ITianyuShellCoreState, ITianyuShellFeatureToggleState } from "../plugin/store/State";
import { AreaCode, LogLevel, MapOfBoolean } from "@aitianyu.cn/types";
import { TIANYU_SHELL_CORE_STORE_TYPE } from "../declares/Constant";

export { getTianyuShellCoreInstanceId } from "shell-core/src/core/plugin/store/Exports";

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

    console: {
        log: ActionFactor.makeVirtualAction<
            ITianyuShellCoreState,
            {
                message: string;
                level?: LogLevel;
                timer?: boolean;
                forceLog?: boolean;
            }
        >(),

        capture: {
            action: {
                clean: ActionFactor.makeVirtualAction<ITianyuShellCoreState, void>(),
                start: ActionFactor.makeVirtualAction<
                    ITianyuShellCoreState,
                    {
                        guid: string;
                        classify: string;
                        id: string;
                        forceLog?: boolean;
                    }
                >(),
                end: ActionFactor.makeVirtualAction<ITianyuShellCoreState, string>(),
                donwload: ActionFactor.makeVirtualAction<ITianyuShellCoreState, string>(),
            },

            select: {
                lastCap: SelectorFactor.makeVirtualSelector<
                    ITianyuShellCoreState,
                    {
                        type: CaptureOperationType;
                        message: string;
                    }
                >(),
            },
        },
    },
};

StoreUtils.registerExpose(TianyuShellCoreInterfaceExpose, TIANYU_SHELL_CORE_STORE_TYPE);
