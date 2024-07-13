/** @format */

import { StoreHelper } from "@aitianyu.cn/tianyu-store";
import { getNoHisSupportedIns, getStore } from "../../utils/Store";
import { CreateTianyuShellCoreAction, DestroyTianyuShellCoreAction } from "./actions/CreateAction";
import { ChangeUrlHashAction, PageResizeAction, SetDocumentLoadedAction } from "./actions/EventActions";
import { GetDocumentLoaded, GetPageSize, GetUrlHash } from "./selectors/EventSelector";
import {
    AddFeatureToggleInfoAction,
    DisableFeatureToggleAction,
    EnableFeatureToggleAction,
} from "./actions/FeatureToggleActions";
import {
    GetAllFeatures,
    GetFeatureToggleInfo,
    HasFeatureName,
    IsFeatureToggleActive,
} from "./selectors/FeatureToggleSelector";
import { SetLanguageAction } from "./actions/LanguageActions";
import {
    GetLanguage,
    GetLanguageAsString,
    GetPendingLanguages,
    GetSupportLanguages,
    IsLanguageSuppprted,
} from "./selectors/LanguageSelector";
import {
    AddLanguageAction,
    AddPendingLanguage,
    AddSupportLanguage,
    AddThemesAction,
} from "./actions/CompatibilityActions";
import { GetThemeList } from "./selectors/CompatibilitySelector";
import { getTianyuShellCoreInstanceId, TIANYU_SHELL_CORE_STORE_TYPE } from "../../utils/CoreInterfaceExpose";

export const TianyuShellCoreInstanceId = getTianyuShellCoreInstanceId();

export const TianyuShellCoreInterface = {
    core: {
        creator: CreateTianyuShellCoreAction,
        destroy: DestroyTianyuShellCoreAction,
    },

    event: {
        action: {
            onLoaded: SetDocumentLoadedAction,
            onHaschange: ChangeUrlHashAction,
            onPageResize: PageResizeAction,
        },

        select: {
            isLoaded: GetDocumentLoaded,
            getHash: GetUrlHash,
            getPageSize: GetPageSize,
        },
    },

    featureToggle: {
        action: {
            add: AddFeatureToggleInfoAction,
            enable: EnableFeatureToggleAction,
            disable: DisableFeatureToggleAction,
        },

        select: {
            getInfo: GetFeatureToggleInfo,
            allFeature: GetAllFeatures,
            isActive: IsFeatureToggleActive,
            contains: HasFeatureName,
        },
    },

    language: {
        action: {
            set: SetLanguageAction,
        },

        select: {
            get: GetLanguage,
            getString: GetLanguageAsString,
            isSupport: IsLanguageSuppprted,

            getSupport: GetSupportLanguages,
            getPending: GetPendingLanguages,
        },
    },

    compatibility: {
        internal: {
            _addSupportLanguage: AddSupportLanguage,
            _addPendingLanguage: AddPendingLanguage,
        },

        action: {
            addLanguage: AddLanguageAction,
            addTheme: AddThemesAction,
        },

        select: {
            getThemes: GetThemeList,
        },
    },
};

getStore().registerInterface(TIANYU_SHELL_CORE_STORE_TYPE, TianyuShellCoreInterface);
