/**@format */

import { TianyuShellProcessor } from "../utils/Processor";
import { ITianyuShellLanguage, TianyuShellLanguageRegisterType } from "../declares/Language";
import { AreaCode, ArrayHelper, parseAreaCode, parseAreaString } from "@aitianyu.cn/types";
import { Cookie } from "./Cookie";
import { ITianyuShell } from "../declares/Declare";
import { ITianyuShellPluginSetting } from "../declares/Core";
import { LanguageParseException } from "../declares/Exception";
import { LANGUAGE_COOKIE_ID, getLanguage } from "../../../../infra/Language";
import { languageDef } from "infra/Compatibility";

const languageConfig = ((window as any).tianyuShell as ITianyuShell)?.runtime?.sync?.language || languageDef();

function generateLanguage(type: string): string[] {
    const list: string[] = [];
    const languageTypeList = languageConfig[type];

    if (Array.isArray(languageTypeList)) {
        for (const langItem of languageConfig[type]) {
            const area = parseAreaString(langItem);
            AreaCode.unknown !== area && list.push(langItem);
        }

        return list;
    }

    return [];
}

/** Tianyu Shell Language Implementation */
const _language: ITianyuShellLanguage = {
    set: function (language: string | AreaCode): void {
        // check the language is support or not
        const areaString = typeof language === "string" ? language : parseAreaCode(language);
        if (!this.supportLanguage.includes(areaString)) {
            return;
        }

        // save language to local storage and valid date is 30 days
        const date = new Date(Date.now());
        const expires = new Date(date.setDate(date.getDate() + 30));
        Cookie.set(LANGUAGE_COOKIE_ID, areaString, { expires: expires });
    },
    get: function (): AreaCode {
        return parseAreaString(getLanguage());
    },
    toString: function (language?: AreaCode): string {
        return parseAreaCode(language || this.get());
    },
    supportLanguage: generateLanguage("support"),
    pendingLanguage: generateLanguage("pending"),
};

function _initTianyuShellLanguage(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.language) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                language: _language,
            },
        };
    }
}

const _pluginSetting: ITianyuShellPluginSetting = TianyuShellProcessor.getPluginSetting();
_pluginSetting.globalize && _initTianyuShellLanguage();

/** Tianyu Shell Language */
export class Language {
    /**
     * Set application local language
     *
     * @param language language areacode or language string
     */
    public static set(language: string | AreaCode): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.language.set(language)
            : _language.set(language);
    }
    /**
     * Get application language
     *
     * @returns return local language from cookie or get default language from browser
     */
    public static getLocalLanguage(): AreaCode {
        return _pluginSetting.globalize ? ((window as any).tianyuShell as ITianyuShell).core.language.get() : _language.get();
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
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.language.toString(language)
            : _language.toString(language);
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
        switch (type) {
            case "support":
                {
                    // get supported languages and mergre data
                    const newSupportLanguages = ArrayHelper.merge(
                        _pluginSetting.globalize
                            ? ((window as any).tianyuShell as ITianyuShell).core.language.supportLanguage
                            : _language.supportLanguage,
                        languages,
                    );
                    // process pending languages
                    // to remove languages which are added in supported language list currently,
                    // from old pending languages list
                    const newPendingLanguages: string[] = [];
                    const oldPendingLanguages = _pluginSetting.globalize
                        ? ((window as any).tianyuShell as ITianyuShell).core.language.supportLanguage
                        : _language.supportLanguage;
                    for (const lang of oldPendingLanguages) {
                        !newSupportLanguages.includes(lang) && newPendingLanguages.push(lang);
                    }
                    // set new languages
                    if (_pluginSetting.globalize) {
                        ((window as any).tianyuShell as ITianyuShell).core.language.supportLanguage = newSupportLanguages;
                        ((window as any).tianyuShell as ITianyuShell).core.language.pendingLanguage = newPendingLanguages;
                    } else {
                        _language.supportLanguage = newSupportLanguages;
                        _language.pendingLanguage = newPendingLanguages;
                    }
                }
                break;
            default:
                {
                    // get pending languages and mergre data
                    const newPendingLanguages = ArrayHelper.merge(
                        _pluginSetting.globalize
                            ? ((window as any).tianyuShell as ITianyuShell).core.language.pendingLanguage
                            : _language.pendingLanguage,
                        languages,
                    );
                    // process supported languages
                    // to remove languages which are added in pending language list currently,
                    // from old supported languages list
                    const newSupportLanguages: string[] = [];
                    const oldSupportLanguages = _pluginSetting.globalize
                        ? ((window as any).tianyuShell as ITianyuShell).core.language.supportLanguage
                        : _language.supportLanguage;
                    for (const lang of oldSupportLanguages) {
                        !newPendingLanguages.includes(lang) && newSupportLanguages.push(lang);
                    }
                    // set new languages
                    if (_pluginSetting.globalize) {
                        ((window as any).tianyuShell as ITianyuShell).core.language.supportLanguage = newSupportLanguages;
                        ((window as any).tianyuShell as ITianyuShell).core.language.pendingLanguage = newPendingLanguages;
                    } else {
                        _language.supportLanguage = newSupportLanguages;
                        _language.pendingLanguage = newPendingLanguages;
                    }

                    // if the language of local setting is not supported in newest language setting
                    // to set the local language to the first of support languages or get from default language.
                    const localUsingLanguage = parseAreaCode(Language.getLocalLanguage()).replace("-", "_");
                    if (newPendingLanguages.includes(localUsingLanguage)) {
                        if (newSupportLanguages.length > 0) {
                            const newLocalLanguage = parseAreaString(newSupportLanguages[0]);
                            Language.set(newLocalLanguage);
                        } else {
                            Language.set(Language.getDefaultLanguage());
                        }
                    }
                }
                break;
        }
    }
}
