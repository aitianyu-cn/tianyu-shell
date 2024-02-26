/**@format */

import { MapOfString, MapOfStrings } from "@aitianyu.cn/types";
import { TianyuUIEvent } from "./TianyuUIEvent";
import { TianyuUIStyleDeclaration } from "./TianyuUIStyle";

/** Tianyu Shell Default UI Element definiation */
export interface TianyuUI {
    /** UI Element id*/
    id: string;
    /**
     * UI Element Type
     * The type is inherited from HTMLElementTagNameMap
     */
    type: keyof HTMLElementTagNameMap;
    /** Define the element inner Text */
    innerText?: string;
    /** Define the element inner HTML value */
    innerHTML?: string;
    /** Define the element outer Text */
    outerText?: string;

    /** Define the element inline stylings */
    style?: TianyuUIStyleDeclaration;
    /** Define the element interation event */
    event?: TianyuUIEvent;

    /** Define the name(s) of Tianyu Defined stylings */
    styles?: MapOfStrings | string[] | string;
    /** Define the list of Css styling name */
    classes?: string[];
    /** Define the inner child elements */
    children?: TianyuUI[];
    /**
     * Other Definiations of native HTML element
     * This items will be mapped into HTML element if the element has the properties
     */
    others?: MapOfString;
}
