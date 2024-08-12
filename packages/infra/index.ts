/**@format */

export * from "./resource/MessageLoader";

import * as CompatibilityImport from "./Compatibility";

declare global {
    export const __TIANYU_SHELL_TEST_HOOK__: {
        debugger: () => undefined;
    };
}

export namespace Compatibility {
    export import themeCompatibility = CompatibilityImport.themeList;
    export import languageCompatibility = CompatibilityImport.languageDef;
}
