/**@format */

import { getLanguage } from "../Language";
import { DEFAULT_LANGUAGE, setI18nModuleCache } from "./Message";

const _i18nRequireContexts: { [local: string]: () => Promise<void> } = {
    [DEFAULT_LANGUAGE]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    DEFAULT_LANGUAGE,
                    "core",
                    require.context(
                        "../../shell-core/src",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message.properties$/,
                    ),
                );
                // setI18nModuleCache(
                //     DEFAULT_LANGUAGE,
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message.properties$/,
                //     ),
                // );
                // setI18nModuleCache(
                //     DEFAULT_LANGUAGE,
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message.properties$/,
                //     ),
                // );
            },
            "tianyu-shell/i18n/default",
        ),
    ["zh_CN"]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    "zh_CN",
                    "core",
                    require.context(
                        "../../shell-core/src",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_zh_CN.properties$/,
                    ),
                );
                // setI18nModuleCache(
                //     "zh_CN",
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_zh_CN.properties$/,
                //     ),
                // );
                // setI18nModuleCache(
                //     "zh_CN",
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_zh_CN.properties$/,
                //     ),
                // );
            },
            "tianyu-shell/i18n/zh_CN",
        ),
    ["en_US"]: async () =>
        require.ensure(
            [],
            (require: NodeRequire) => {
                setI18nModuleCache(
                    "en_US",
                    "core",
                    require.context(
                        "../../shell-core/src",
                        true,
                        /\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_en_US.properties$/,
                    ),
                );
                // setI18nModuleCache(
                //     "en_US",
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_en_US.properties$/,
                //     ),
                // );
                // setI18nModuleCache(
                //     "en_US",
                //     "react",
                //     require.context(
                //         "../../shell-react/src",
                //         true,
                //         /^\.\/[a-z\-0-9]+(\/resources)?((\/i18n)|(\/strings))?\/message_en_US.properties$/,
                //     ),
                // );
            },
            "tianyu-shell/i18n/en_US",
        ),
};

/**
 * Load i18n files
 *
 * @returns return an async promise
 */
export async function loadI18n(): Promise<any> {
    return Promise.all([_i18nRequireContexts[DEFAULT_LANGUAGE]?.(), _i18nRequireContexts[getLanguage()]?.()]);
}

/**
 * Load default i18n files
 *
 * @returns return an async promise
 */
export async function loadI18nWithDefault(): Promise<void> {
    return _i18nRequireContexts[DEFAULT_LANGUAGE]?.() || Promise.resolve();
}
