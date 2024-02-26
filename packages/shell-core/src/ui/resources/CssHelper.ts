/**@format */

export class CssHelper {
    /**
     * Set global style
     *
     * @param styleContent CSS style string (this is a inner HTML css)
     * @returns return the added HTML element
     */
    public static setGlobalStyle(styleContent: string): HTMLElement {
        const style = document.createElement("style");
        style.innerHTML = styleContent;
        document.head.appendChild(style);
        return style;
    }

    /**
     * Set a link as global style
     *
     * @param link the CSS style link
     * @returns return the added link HTML element
     */
    public static linkGlobalStyle(link: string): HTMLElement {
        const style = document.createElement("link");
        style.href = link;
        style.rel = "stylesheet";
        style.type = "text/css";
        document.head.appendChild(style);
        return style;
    }

    /**
     * Remove a HTML styling element from HTML head
     *
     * @param element the removed element
     */
    public static removeGlobalStyle(element: HTMLElement): void {
        document.head.removeChild(element);
    }
}
