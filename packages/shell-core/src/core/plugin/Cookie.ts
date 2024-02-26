/**@format */

import { getCookie } from "../../../../infra/Cookie";
import { ITianyuShellCookie, ITianyuShellPluginSetting } from "../declares/Core";
import { ITianyuShell } from "../declares/Declare";
import { TianyuShellProcessor } from "../utils/Processor";

const _cookie: ITianyuShellCookie = {
    set: function (key: string, value: string, domain?: string, path?: string, expires?: Date, escaped?: boolean): void {
        const escapeValue = escaped ? value : encodeURI(value);
        const expiresPart = expires ? `; expires=${expires.toUTCString()}` : "";
        const pathPart = path ? `; path=${path}` : "; path=/";
        const domainPart = domain ? `; domain=${domain}` : "";

        document.cookie = `${key}=${escapeValue}${expiresPart}${pathPart}${domainPart}`;
    },

    get: function (key: string, notFound: string = ""): string {
        return getCookie(key, notFound);
    },

    remove: function (key: string, path?: string, domain?: string): void {
        if (!!!this.get(key)) {
            return;
        }

        const pathPart = path ? `; path=${path}` : "; path=/";
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `${key}=${pathPart}${domainPart};expires=Fri, 02-Jan-1970 00:00:00 GMT`;
    },
};

function _initTianyuShellCookie(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.cookie) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                cookie: _cookie,
            },
        };
    }
}

const _pluginSetting: ITianyuShellPluginSetting = TianyuShellProcessor.getPluginSetting();

_pluginSetting.globalize && _initTianyuShellCookie();

/** Cookie setting option */
export interface ICookieSetOptions {
    /** Cookie domain URL */
    domain?: string;
    /** sub path of URL */
    path?: string;
    /** valid date */
    expires?: Date;
    /** use escaped formatting */
    escaped?: boolean;
}

/** Tianyu Shell Cookie */
export class Cookie {
    /**
     * Set or update cookie value
     *
     * @param key the cookie name
     * @param value cookie value
     * @param options cookie setting options
     */
    public static set(key: string, value: string, options?: ICookieSetOptions): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.cookie.set(
                  key,
                  value,
                  options?.domain,
                  options?.path,
                  options?.expires,
                  options?.escaped,
              )
            : _cookie.set(key, value, options?.domain, options?.path, options?.expires, options?.escaped);
    }
    /**
     * Get a value from cookie
     *
     * @param key the value name
     * @param notFound the fallback value when the specific value is not found
     *
     * @returns return the value or fallback value
     */
    public static get(key: string, notFound: string = ""): string {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.cookie.get(key, notFound)
            : _cookie.get(key, notFound);
    }
    /**
     * Remove a value from cookie
     *
     * @param key the value name
     * @param path the domain URL sub-path
     * @param domain the domain URL
     */
    public static remove(key: string, path?: string, domain?: string): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.cookie.remove(key, path, domain)
            : _cookie.remove(key, path, domain);
    }
}
