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
