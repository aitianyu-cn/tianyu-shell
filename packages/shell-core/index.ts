/**@format */

/** Export Interfaces */
export * from "./src/core/declares/Console";
export * from "./src/core/declares/Core";
export * from "./src/core/declares/Declare";
export * from "./src/core/declares/Exception";
export * from "./src/core/declares/Features";
export * from "./src/core/declares/IStorage";
export * from "./src/core/declares/Router";
export * from "./src/core/declares/Sync";
export * from "./src/core/declares/ui/UserInterface";

/** Export Implementations */
export { PerfCapture, Log, PerfHelper } from "./src/core/plugin/Console";
export * from "./src/core/plugin/Cookie";
export * from "./src/core/plugin/Event";
export * from "./src/core/plugin/FeatureToggle";
export * from "./src/core/plugin/Language";
export * from "./src/core/plugin/Router";
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

import * as StoreImport from "./src/core/utils/Store";
import * as InterfaceExposeImport from "./src/ui/plugin/interface/InterfaceExpose";
import * as StoreTypeImport from "./src/ui/plugin/interface/StoreTypes";
import * as InstanceHelperImport from "./src/ui/tools/InstanceHelper";
import * as CoreInterfaceImport from "./src/core/utils/CoreInterfaceExpose";
import * as InfraInterfaceImport from "./src/core/TianyushellInfraInterfaceExpose";

export namespace TianyuShellStore {
    export import getStore = StoreImport.getStore;
    export import getInstanceId = StoreImport.getInstanceId;
    export import getHistroySupportedIns = StoreImport.getHistroySupportedIns;
    export import getNoHisSupportedIns = StoreImport.getNoHisSupportedIns;

    export import CoreInterfaceExpose = CoreInterfaceImport.TianyuShellCoreInterfaceExpose;
    export import getCoreInstanceId = CoreInterfaceImport.getTianyuShellCoreInstanceId;

    export import InfraInterfaceExpose = InfraInterfaceImport.TianyuShellInfraInterfaceExpose;
    export import getInfraInstanceId = InfraInterfaceImport.getTianyuShellInfraInstanceId;

    export namespace UI {
        export import InterfaceExpose = InterfaceExposeImport.StoreInterfaceExpose;
        export import StoreType = StoreTypeImport.StoreType;

        export namespace InstanceHelper {
            export import getBackgroundInstanceId = InstanceHelperImport.getBackgroundInstanceId;
            export import getMessageInstanceId = InstanceHelperImport.getMessageInstanceId;
            export import getStylingInstanceId = InstanceHelperImport.getStylingInstanceId;
        }
    }
}

// Export UI Interfaces
export * from "./src/ui/common/Declare";
export * from "./src/ui/common/Interface";
export * from "./src/ui/common/UIException";
export * from "./src/core/declares/ui/TianyuUI";
export * from "./src/core/declares/ui/TianyuUIEvent";
export * from "./src/core/declares/ui/TianyuUIStyle";

// Export UI Core Components
export { waitLoading } from "./src/ui/plugin/Core";
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
