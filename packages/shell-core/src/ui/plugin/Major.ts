/**@format */

import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { MajorBase } from "./Core";

/** Tianyu Shell Core UI Major layer APIs */
export class Major {
    /**
     * append a UI element to Tianyu Shell Major Layer
     *
     * @param element UI element
     */
    public static append(element: HTMLElement | TianyuUI): void {
        MajorBase().append(element);
    }
    /**
     * append a UI element into specific HTML element
     *
     * @param id specific HTML element id or element object
     * @param element appended UI element
     */
    public static appendInto(id: string | HTMLElement, element: HTMLElement | TianyuUI): void {
        MajorBase().appendInto(id, element);
    }
    /**
     * remove a UI element from Major Layer
     *
     * @param element UI element
     */
    public static remove(element: HTMLElement | TianyuUI | string): void {
        MajorBase().remove(element);
    }
    /**
     * remove a UI element from specific HTML element
     *
     * @param id specific HTML element id or element object
     * @param element the removed UI element
     */
    public static removeFrom(id: string | HTMLElement, element: HTMLElement | TianyuUI | string): void {
        MajorBase().removeFrom(id, element);
    }
    /**
     * get HTML element by element id
     *
     * @param elemId the element id
     *
     * @returns return HTML element objects
     */
    public static getElementById(elemId: string): HTMLElement[] {
        return MajorBase().getElementById(elemId);
    }
    /**
     * get HTML element by element class name
     *
     * @param className the element class name
     *
     * @returns return HTML element objects
     */
    public static getElementByClassName(className: string): Element[] {
        return MajorBase().getElementByClassName(className);
    }
    /**
     * get HTML element by element tag name
     *
     * @param tagName the element tag name
     *
     * @returns return HTML element objects
     */
    public static getElementByTagName(tagName: string): Element[] {
        return MajorBase().getElementByTagName(tagName);
    }
    /**
     * create a new Tianyu UI element object
     *
     * @param type the HTML element type
     * @param id the HTML element id, a guid string will be applied if no specified
     *
     * @returns return a new Tianyu Shell UI element object
     */
    public static createElement(type: keyof HTMLElementTagNameMap, id?: string): TianyuUI {
        return MajorBase().createElement(type, id);
    }
}
