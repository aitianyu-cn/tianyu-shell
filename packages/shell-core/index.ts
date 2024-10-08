/**@format */

/** Export Interfaces */
export * from "./src/core/declares/Console";
export * from "./src/core/declares/Core";
export * from "./src/core/declares/Cookie";
export * from "./src/core/declares/Declare";
export * from "./src/core/declares/Exception";
export * from "./src/core/declares/Features";
export * from "./src/core/declares/IStorage";
export * from "./src/core/declares/ui/UserInterface";

/** Export Implementations */
export { PerfCapture, Log, PerfHelper } from "./src/core/plugin/Console";
export * from "./src/core/plugin/Cookie";
export * from "./src/core/plugin/Event";
export * from "./src/core/plugin/FeatureToggle";
export * from "./src/core/plugin/Language";
export * from "./src/core/plugin/Runtime";

/** Export as Components */
import * as HashParameterImport from "./src/core/utils/HashParameter";
import * as CommonInterfaceIAutomaticStorage from "./src/core/common/interface/IAutomaticStorage";
import * as CommonAutomaticStorage from "./src/core/common/AutomaticStorage";

export namespace Utils {
    export import HashParameter = HashParameterImport.HashParameter;

    export import DefaultStorageWatchDogTimer = CommonInterfaceIAutomaticStorage.DefaultStorageWatchDogTimer;
    export import MinimumStorageWatchDogTimer = CommonInterfaceIAutomaticStorage.MinimumStorageWatchDogTimer;
    export import AutomaticStorage = CommonAutomaticStorage.AutomaticStorage;
}

import { TIANYU_SHELL_CORE_STORE_TYPE, TIANYU_SHELL_INFRA_STORE_TYPE } from "./src/core/declares/Constant";
import * as StoreImport from "./src/core/utils/Store";
import * as InterfaceExposeImport from "./src/ui/plugin/interface/InterfaceExpose";
import * as StoreTypeImport from "./src/ui/plugin/interface/StoreTypes";
import * as InstanceHelperImport from "./src/ui/tools/InstanceHelper";
import * as CoreInterfaceImport from "./src/core/utils/CoreInterfaceExpose";
import * as InfraInterfaceImport from "./src/core/utils/InfraInterfaceExpose";

export namespace TianyuShellStore {
    export import getStore = StoreImport.getStore;

    export const StoreTypeExpose = {
        SYSTEM: "tianyu-shell-system-entity",
        SYSTEM_HISTORY: "tianyu-shell-system-history-entity",
        SYSTEM_NO_HIS: "tianyu-shell-system-non-history-entity",
        CORE: TIANYU_SHELL_CORE_STORE_TYPE,
        INFRA: TIANYU_SHELL_INFRA_STORE_TYPE,
        ...StoreTypeImport.StoreType,
    };

    export const InterfaceExpose = {
        [TIANYU_SHELL_CORE_STORE_TYPE]: CoreInterfaceImport.TianyuShellCoreInterfaceExpose,
        [TIANYU_SHELL_INFRA_STORE_TYPE]: InfraInterfaceImport.TianyuShellInfraInterfaceExpose,
        ...InterfaceExposeImport.StoreInterfaceExpose,
    };

    export const InstanceMap = {
        ["tianyu-shell-system-entity"]: StoreImport.getInstanceId,
        ["tianyu-shell-system-history-entity"]: StoreImport.getHistroySupportedIns,
        ["tianyu-shell-system-non-history-entity"]: StoreImport.getNoHisSupportedIns,

        [TIANYU_SHELL_CORE_STORE_TYPE]: CoreInterfaceImport.getTianyuShellCoreInstanceId,
        [TIANYU_SHELL_INFRA_STORE_TYPE]: InfraInterfaceImport.getTianyuShellInfraInstanceId,

        ["tianyu-shell-ui-background"]: InstanceHelperImport.getBackgroundInstanceId,
        ["tianyu-shell-ui-message"]: InstanceHelperImport.getMessageInstanceId,
        ["tianyu-shell-ui-styling"]: InstanceHelperImport.getStylingInstanceId,
    };
}

// Export UI Interfaces
export * from "./src/ui/common/Declare";
export * from "./src/ui/common/Interface";
export * from "./src/ui/common/UIException";
export * from "./src/core/declares/ui/TianyuUI";
export * from "./src/core/declares/ui/TianyuUIEvent";
export * from "./src/core/declares/ui/TianyuUIStyle";

// Export UI Core Components
export * from "./src/ui/plugin/Theme";
export * from "./src/ui/plugin/UserTheme";
export * from "./src/ui/plugin/Message";
export * from "./src/ui/plugin/Style";
export * from "./src/ui/plugin/StyleCss";
export * from "./src/ui/plugin/Dialog";
export * from "./src/ui/plugin/DialogHelper";
export * from "./src/ui/plugin/Background";
export * from "./src/ui/plugin/Major";
export * from "./src/ui/plugin/MajorHelper";

// Export UI Utils
import * as UIHelperImport from "./src/ui/utils/Helper";
import * as UIThemeTranslatorImport from "./src/ui/utils/ThemeTranslator";
import * as UIGlobalStylingImport from "./src/ui/utils/Styling";

export namespace Utils {
    export import TianyuShellUIHelper = UIHelperImport.TianyuShellUIHelper;

    export import translateThemeColor = UIThemeTranslatorImport.translateThemeColor;
    export import translateThemeColorToId = UIThemeTranslatorImport.translateThemeColorToId;

    export import GlobalStyling = UIGlobalStylingImport.GlobalStyling;
}

import * as ControllerCreatorImport from "./src/ui/plugin/handler/Creator";
import * as UtilsDomHelperImport from "./src/ui/utils/DomHelper";

export namespace DOM {
    export import creator = ControllerCreatorImport.createHTMLbyTianyuUI;
    export import renderDOM = UtilsDomHelperImport.renderHTML;
}
