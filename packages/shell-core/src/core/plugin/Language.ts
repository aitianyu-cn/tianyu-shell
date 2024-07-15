/**@format */

import { AreaCode, parseAreaCode, parseAreaString } from "@aitianyu.cn/types";
import { Missing } from "@aitianyu.cn/tianyu-store";
import { TianyuShellLanguageRegisterType } from "../declares/Declare";
import { LanguageParseException } from "../declares/Exception";
import { getStore } from "../utils/Store";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "./store/Exports";
import { getLanguage } from "infra/Language";

/** Tianyu Shell Language */
export class Language {
    /**
     * Set application local language
     *
     * @param language language areacode or language string
     */
    public static set(language: string | AreaCode): void {
        void getStore().dispatch(
            TianyuShellCoreInterface.language.action.set(getTianyuShellCoreInstanceId(), language),
        );
    }
    /**
     * Get application language
     *
     * @returns return local language from cookie or get default language from browser
     */
    public static getLocalLanguage(): AreaCode {
        const language = getStore().selecte(
            TianyuShellCoreInterface.language.select.get(getTianyuShellCoreInstanceId()),
        );

        return language instanceof Missing ? parseAreaString(getLanguage()) : language;
    }
    /**
     * Get browser language
     *
     * @returns return default language from browser
     */
    public static getDefaultLanguage(): AreaCode {
        const defaultLanguage = navigator.language.replace("-", "_");
        return parseAreaString(defaultLanguage);
    }
    /**
     * Convert the string to area code
     *
     * @param areaStr — the source string
     *
     * @returns — return the area code
     */
    public static parse(language: string): AreaCode {
        const areaCode = parseAreaString(language, true /**to force the area code */);

        if (AreaCode.unknown === areaCode) {
            throw new LanguageParseException(language);
        }

        return areaCode;
    }
    /**
     * Get application local language string or parse specific language areacode to string
     *
     * @param language the language area code
     *
     * @returns return local language string or parse language areacode
     */
    public static toString(language?: AreaCode): string {
        return parseAreaCode(Language.getLocalLanguage());
    }
    /**
     * Convert the string to area code
     *
     * @param areaStr the source string
     * @param forceArea a boolean value indicates whether needs to have a strict check for the source string. (That means if in strict mode and the string could not be converted, an unkonwn will be returned.)
     *
     * @returns return the area code
     */
    public static parseAreaString(areaStr?: string, forceArea?: boolean): AreaCode {
        return parseAreaString(areaStr, forceArea);
    }
    /**
     * Modify local language supporting state
     * To add new supported languages or remove some languages
     *
     * @param type register language type
     * @param languages the new language settings
     */
    public static addLanguages(type: TianyuShellLanguageRegisterType, languages: string[]): void {
        void getStore().dispatch(
            TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                type,
                languages,
            }),
        );
    }
}
