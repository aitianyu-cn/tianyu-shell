/**@format */

export * from "./resource/MessageLoader";

import * as CompatibilityImport from "./Compatibility";

export namespace Compatibility {
    export import themeCompatibility = CompatibilityImport.themeList;
    export import languageCompatibility = CompatibilityImport.languageDef;
}
