/** @format */

import {
    ActionFactor,
    ITianyuStoreInterface,
    ITianyuStoreInterfaceImplementation,
    SelectorFactor,
    StoreUtils,
} from "@aitianyu.cn/tianyu-store";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import {
    AddStylingCssAction,
    CreateCssMappingAction,
    LifecycleCssMappingAction,
    RemoveStylingCssAction,
} from "./action/style/StyleCSSAction";
import {
    CreateTianyuStyleMapAction,
    LifecycleTianyuStyleMapAction,
    RemoveTianyuStylingAction,
    SetTianyuStylingAction,
} from "./action/style/StyleTianyuStyleAction";
import { CreateStylingInstanceAction } from "./action/style/StylingBaseAction";
import { DestroyStylingInstanceActionCreator } from "./action/style/StylingBaseActionCreator";
import {
    GetStyleCssElementSelector,
    GetStyleCssListSelector,
    GetTianyuUIStyleSelector,
} from "./selector/StyleTianyuStyleSelector";
import { IStylingState } from "./state/StylingState";
import { ChangeTianyuShellThemeAction, ResetTianyuShellThemeAction } from "./action/style/StyleTianyuShellThemeAction";
import {
    AddNewCustomThemeAction,
    DeleteCustomThemeAction,
    ResetCustomThemeAction,
} from "./action/style/StyleUserThemeAction";
import {
    GetTianyuShellDefaultTheme,
    GetTianyuShellCustomTheme,
    GetAllCustomThemesSelector,
    GetUsingCustomThemesSelector,
    GetCustomThemeURLSelector,
    ContainsUsingCustomThemeSelector,
} from "./selector/StyleThemeSelector";
import { ITianyuShellCoreUIThemeItem } from "shell-core/src/core/declares/ui/UserInterface";
import { StoreType } from "./StoreTypes";

export const StylingInterface = {
    core: {
        creator: CreateStylingInstanceAction,
        destroy: DestroyStylingInstanceActionCreator,
    },
    control: {
        create: {
            cssMap: CreateCssMappingAction,
            tianyuStyleMap: CreateTianyuStyleMapAction,
        },

        lifecycle: {
            cssMap: LifecycleCssMappingAction,
            tianyuStyleMap: LifecycleTianyuStyleMapAction,
        },
    },
    style: {
        css: {
            add: AddStylingCssAction,
            remove: RemoveStylingCssAction,

            getElement: GetStyleCssElementSelector,
            getAllCss: GetStyleCssListSelector,
        },
        tianyuStyle: {
            set: SetTianyuStylingAction,
            remove: RemoveTianyuStylingAction,
            get: GetTianyuUIStyleSelector,
        },
    },
    theme: {
        change: ChangeTianyuShellThemeAction,
        reset: ResetTianyuShellThemeAction,

        getDefault: GetTianyuShellDefaultTheme,
        getCustom: GetTianyuShellCustomTheme,

        user: {
            add: AddNewCustomThemeAction,
            remove: DeleteCustomThemeAction,
            reset: ResetCustomThemeAction,

            getAllThemes: GetAllCustomThemesSelector,
            getUsingThemes: GetUsingCustomThemesSelector,
            getURL: GetCustomThemeURLSelector,
            isUsing: ContainsUsingCustomThemeSelector,
        },
    },
};

export const StylingListenerExpose = {
    style: {
        css: {
            getAllCss: SelectorFactor.makeVirtualSelector<IStylingState, string[]>(),
        },
    },
    theme: {
        getCustom: SelectorFactor.makeVirtualSelector<IStylingState, ITianyuShellCoreUIThemeItem>(),

        user: {
            getUsingThemes: SelectorFactor.makeVirtualSelector<IStylingState, string[]>(),
        },
    },
};

export const StylingExpose = {
    style: {
        css: {
            add: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    key: string;
                    link: string;
                }
            >(),
            remove: ActionFactor.makeVirtualAction<IStylingState, string>(),
            getAllCss: SelectorFactor.makeVirtualSelector<IStylingState, string[]>(),
        },
        tianyuStyle: {
            set: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    key: string;
                    styling: TianyuUIStyleDeclaration;
                    path?: string | undefined;
                }
            >(),
            remove: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    key: string;
                    path?: string | undefined;
                }
            >(),
            get: SelectorFactor.makeVirtualParameterSelector<
                IStylingState,
                {
                    key: string | string[];
                    path?: string | undefined;
                    isDepth?: boolean | undefined;
                },
                TianyuUIStyleDeclaration
            >(),
        },
    },
    theme: {
        change: ActionFactor.makeVirtualAction<IStylingState, ITianyuShellCoreUIThemeItem>(),
        reset: ActionFactor.makeVirtualAction<IStylingState>(),

        getDefault: SelectorFactor.makeVirtualSelector<IStylingState, ITianyuShellCoreUIThemeItem>(),
        getCustom: SelectorFactor.makeVirtualSelector<IStylingState, ITianyuShellCoreUIThemeItem>(),

        user: {
            add: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    themeId: string;
                    styling: string;
                }
            >(),
            remove: ActionFactor.makeVirtualAction<IStylingState, string>(),
            reset: ActionFactor.makeVirtualAction<IStylingState>(),

            getAllThemes: SelectorFactor.makeVirtualSelector<IStylingState, string[]>(),
            getUsingThemes: SelectorFactor.makeVirtualSelector<IStylingState, string[]>(),
            getURL: SelectorFactor.makeVirtualParameterSelector<IStylingState, string, string>(),
            isUsing: SelectorFactor.makeVirtualParameterSelector<IStylingState, string, boolean>(),
        },
    },
};

StylingInterface as ITianyuStoreInterface<IStylingState>;
StylingExpose as ITianyuStoreInterfaceImplementation;
StylingListenerExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(StylingExpose, StoreType.STYLING_STORE_TYPE);
StoreUtils.registerExpose(StylingListenerExpose, StoreType.STYLING_STORE_TYPE);
