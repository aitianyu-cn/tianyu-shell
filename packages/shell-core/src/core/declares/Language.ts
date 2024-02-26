/**@format */

import { AreaCode } from "@aitianyu.cn/types";

/** Tianyu Shell Language APIs */
export interface ITianyuShellLanguage {
    /**
     * Set application local language
     *
     * @param language language areacode or language string
     */
    set(language: AreaCode | string): void;
    /**
     * Get application language
     *
     * @returns return local language from cookie or get default language from browser
     */
    get(): AreaCode;
    /**
     * Get application local language string or parse specific language areacode to string
     *
     * @param language the language area code
     *
     * @returns return local language string or parse language areacode
     */
    toString(language?: AreaCode): string;
    /**
     * The supported languages of application
     *
     * !!!IMPORTANT
     * DO NOT CHANGE THE LIST DIRECTLY
     * PLEASE USE LANGUAGE API TO MODIFY IT
     */
    supportLanguage: string[];
    /**
     * The pending languages of application
     *
     * !!!IMPORTANT
     * DO NOT CHANGE THE LIST DIRECTLY
     * PLEASE USE LANGUAGE API TO MODIFY IT
     */
    pendingLanguage: string[];
}

/**
 * Language modify type
 * To indicate what type of languages (pending or support) will be modified
 */
export type TianyuShellLanguageRegisterType = "pending" | "support";
