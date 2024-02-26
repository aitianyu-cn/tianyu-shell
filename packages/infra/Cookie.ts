/**@format */

/**
 * Get cookie value
 *
 * @param key the cookie item key name
 * @param notFound a string to use when the cookie is not found
 * @returns return the cookie value, if the value does not exist to return empty string or specific string.
 */
export function getCookie(key: string, notFound: string = ""): string {
    const result = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`));

    return (result && decodeURI(result[2])) || notFound;
}
