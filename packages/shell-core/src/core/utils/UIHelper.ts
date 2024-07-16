/** @format */

import { getIsMobile } from "./UserAgent";

export function getWindowWidth(): number {
    return getIsMobile() ? window.outerWidth : window.innerWidth;
}
