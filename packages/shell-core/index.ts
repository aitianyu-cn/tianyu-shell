/**@format */

/** Export Interfaces */
export * from "./src/core/declares/Console";
export * from "./src/core/declares/Core";
export * from "./src/core/declares/Declare";
export * from "./src/core/declares/Event";
export * from "./src/core/declares/Exception";
export * from "./src/core/declares/Features";
export * from "./src/core/declares/IStorage";
export * from "./src/core/declares/Language";
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
import * as ProcessorImport from "./src/core/utils/Processor";
import * as CommonInterfaceIAutomaticStorage from "./src/core/common/interface/IAutomaticStorage";
import * as CommonAutomaticStorage from "./src/core/common/AutomaticStorage";

export namespace Utils {
    export import HashParameter = HashParameterImport.HashParameter;
    export import Processor = ProcessorImport.TianyuShellProcessor;

    export import DefaultStorageWatchDogTimer = CommonInterfaceIAutomaticStorage.DefaultStorageWatchDogTimer;
    export import MinimumStorageWatchDogTimer = CommonInterfaceIAutomaticStorage.MinimumStorageWatchDogTimer;
    export import AutomaticStorage = CommonAutomaticStorage.AutomaticStorage;
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

export namespace Utils {
    export import TianyuShellUIHelper = UIHelperImport.TianyuShellUIHelper;

    export import translateThemeColor = UIThemeTranslatorImport.translateThemeColor;
    export import translateThemeColorToId = UIThemeTranslatorImport.translateThemeColorToId;
}

import * as ControllerCreatorImport from "./src/ui/plugin/handler/Creator";
import * as UtilsDomHelperImport from "./src/ui/utils/DomHelper";

export namespace DOM {
    export import creator = ControllerCreatorImport.createHTMLbyTianyuUI;
    export import renderDOM = UtilsDomHelperImport.renderHTML;
}
