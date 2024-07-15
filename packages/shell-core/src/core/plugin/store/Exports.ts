/** @format */

import { InstanceId, StoreHelper } from "@aitianyu.cn/tianyu-store";
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
import { ConsoleLogAction } from "./actions/ConsoleActions";
import {
    _AddNewCaptureRecordAction,
    _DoCaptureOperationAction,
    _GenerateNewClassifyAction,
    _GenerateOrIncreaseClassifyIdAction,
    CleanCaptureAction,
    DownloadCaptureAction,
    EndCaptureAction,
    StartCaptureAction,
} from "./actions/CaptureActions";
import {
    _GetAllCaptureRecords,
    _GetCaptureBaseTime,
    _GetCaptureRecord,
    _GetClassifyId,
} from "./selectors/CaptureSelector";
import { TIANYU_SHELL_CORE_STORE_TYPE } from "../../declares/Constant";

export function getTianyuShellCoreInstanceId(): InstanceId {
    return StoreHelper.generateInstanceId(getNoHisSupportedIns(), TIANYU_SHELL_CORE_STORE_TYPE, "tianyu-shell-core");
}

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

    console: {
        log: ConsoleLogAction,

        capture: {
            internal: {
                _doCaptureOperation: _DoCaptureOperationAction,
                _generateClassify: _GenerateNewClassifyAction,
                _handleClassifyId: _GenerateOrIncreaseClassifyIdAction,
                _recordCapture: _AddNewCaptureRecordAction,

                _getClassifyId: _GetClassifyId,
                _getCaptureRec: _GetCaptureRecord,
                _getAllRecords: _GetAllCaptureRecords,
                _getBaseTime: _GetCaptureBaseTime,
            },

            action: {
                clean: CleanCaptureAction,
                start: StartCaptureAction,
                end: EndCaptureAction,
                donwload: DownloadCaptureAction,
            },
        },
    },
};
