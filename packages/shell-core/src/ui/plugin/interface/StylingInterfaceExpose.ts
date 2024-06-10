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
import { GetTianyuUIStyleSelector } from "./selector/StyleTianyuStyleSelector";
import { IStylingState } from "./state/StylingState";

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
        },
        tianyuStyle: {
            set: SetTianyuStylingAction,
            remove: RemoveTianyuStylingAction,
            get: GetTianyuUIStyleSelector,
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
                },
                string | undefined
            >(),
            remove: ActionFactor.makeVirtualAction<IStylingState, string, string | undefined>(),
        },
        tianyuStyle: {
            set: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    key: string;
                    styling: TianyuUIStyleDeclaration;
                    path?: string | undefined;
                },
                void
            >(),
            remove: ActionFactor.makeVirtualAction<
                IStylingState,
                {
                    key: string;
                    path?: string | undefined;
                },
                void
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
};

StylingInterface as ITianyuStoreInterface<IStylingState>;
StylingExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(StylingExpose);
