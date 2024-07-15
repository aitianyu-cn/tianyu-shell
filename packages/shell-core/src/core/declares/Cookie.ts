/** @format */

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
