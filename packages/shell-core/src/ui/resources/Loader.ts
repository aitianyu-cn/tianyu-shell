/**@format */

import { StylingURLHandler } from "./URLHandler";

export function staticLoader(): void {
    // in product environment
    // all styling should be loaded from Aitianyu Server

    // load static common-style
    document.head.appendChild(StylingURLHandler.staticURL("common-style"));
    // load static style of tianyu shell ui basic compnent
    // includes dialog, message, background and major view
    document.head.appendChild(StylingURLHandler.staticURL("component-style"));
}
