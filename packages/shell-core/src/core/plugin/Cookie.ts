/**@format */

import { ICookieSetOptions } from "../declares/Cookie";
import { CookieImpl } from "./impl/CookieImpl";

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
        CookieImpl.set(key, value, options?.domain, options?.path, options?.expires, options?.escaped);
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
        return CookieImpl.get(key, notFound);
    }
    /**
     * Remove a value from cookie
     *
     * @param key the value name
     * @param path the domain URL sub-path
     * @param domain the domain URL
     */
    public static remove(key: string, path?: string, domain?: string): void {
        CookieImpl.remove(key, path, domain);
    }
}
