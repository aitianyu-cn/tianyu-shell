/**@format */

import { MapOfString, StringHelper } from "@aitianyu.cn/types";
import { getLanguage } from "../Language";

/** Default language define of i18n cache */
export const DEFAULT_LANGUAGE = "DEFAULT_LANGUAGE";

const _i18nModuleCache: {
    [packageName: string]: {
        [lang: string]: __WebpackModuleApi.RequireContext;
    };
} = {};

/**
 * Package Module Name
 * This is a id of package module
 * core: shell-core
 * react: shell-react
 * ui: shell-ui
 */
export type i18nModuleName = "core" | "react" | "ui";

/**
 * Set international package to module cache
 *
 * @param lang the language name
 * @param packageName the package id of the package path
 * @param module the module require interface
 */
export function setI18nModuleCache(lang: string, packageName: i18nModuleName, module: __WebpackModuleApi.RequireContext): void {
    if (!_i18nModuleCache[packageName]) {
        _i18nModuleCache[packageName] = {};
    }
    _i18nModuleCache[packageName][lang] = module;
}

/**
 * Get international module require interface by language and package name from module cache
 *
 * @param lang the language name
 * @param packageName the package id of the package path
 * @returns return the module require function
 */
export function getI18nModuleCache(lang: string, packageName: i18nModuleName): __WebpackModuleApi.RequireContext | undefined {
    return _i18nModuleCache[packageName]?.[lang];
}

function formatText(map: MapOfString, id: string, args?: (string | number)[] | string): string {
    const value = map[id] ? map[id].trim() : undefined;
    if (value && args) {
        return StringHelper.format(value, args);
    }
    return value || "";
}

function getText(
    packageName: i18nModuleName,
    file: string,
    key: string,
    lang: string,
    params?: (string | number)[] | string,
): string | null {
    const requireContext = getI18nModuleCache(lang, packageName);
    const fileName = `./${file}${lang !== DEFAULT_LANGUAGE ? `_${lang}` : ""}.properties`;
    let resource;
    try {
        resource = requireContext ? requireContext(fileName) : undefined;
    } catch {
        // In infra designing
        // the error when require the i18n source file that does not need to do especial handling.
    }
    const formattedResource: string | undefined = resource && formatText(resource, key, params);
    if (formattedResource) {
        try {
            // return unescape(encodeURI(formattedResource.replace(/\"/g, '\\"')));
            return unescape(JSON.parse(`"${formattedResource}"`));
        } catch {
            // When the value formating cause an error, to return the raw value instead.
        }
    }
    return formattedResource || "";
}

/**
 * Get i18n text from specific file.
 *
 * @param packageName the package id of the root folder under packages
 * @param file the i18n file path (relative path of the root folder)
 * @param key the i18n key
 * @param params string params for format needs
 * @param fallString a string to use when the specific i18n value is not found
 * @returns return a formatted i18n value string.
 */
export function getTextFromFile(
    packageName: i18nModuleName,
    file: string,
    key: string,
    params?: (string | number)[] | string,
    fallString?: string,
): string {
    return (
        getText(packageName, file, key, getLanguage(), params) ||
        getText(packageName, file, key, DEFAULT_LANGUAGE, params) ||
        fallString ||
        key
    );
}
