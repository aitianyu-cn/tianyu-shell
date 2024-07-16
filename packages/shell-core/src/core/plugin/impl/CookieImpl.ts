/** @format */

import { getCookie } from "infra/Cookie";
import { ITianyuShellCookie } from "../../declares/Core";

export const CookieImpl: ITianyuShellCookie = {
    set: function (
        key: string,
        value: string,
        domain?: string,
        path?: string,
        expires?: Date,
        escaped?: boolean,
    ): void {
        /* istanbul ignore next */
        const escapeValue = escaped ? value : encodeURI(value);
        /* istanbul ignore next */
        const expiresPart = expires ? `; expires=${expires.toUTCString()}` : "";
        /* istanbul ignore next */
        const pathPart = path ? `; path=${path}` : "; path=/";
        /* istanbul ignore next */
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

        /* istanbul ignore next */
        const pathPart = path ? `; path=${path}` : "; path=/";
        /* istanbul ignore next */
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `${key}=${pathPart}${domainPart};expires=Fri, 02-Jan-1970 00:00:00 GMT`;
    },
};
