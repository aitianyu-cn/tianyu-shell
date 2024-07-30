/**@format */

import { MapOfStrings, MapOfString, guid } from "@aitianyu.cn/types";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { TianyuUIEvent } from "shell-core/src/core/declares/ui/TianyuUIEvent";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";

export class MajorTianyuUI implements TianyuUI {
    id: string;
    type: keyof HTMLElementTagNameMap;
    innerText?: string | undefined;
    innerHTML?: string | undefined;
    outerText?: string | undefined;
    style: TianyuUIStyleDeclaration;
    event?: TianyuUIEvent | undefined;
    styles?: string | string[] | MapOfStrings | undefined;
    classes?: string[] | undefined;
    children?: TianyuUI[] | undefined;
    others?: MapOfString | undefined;

    public constructor(type: keyof HTMLElementTagNameMap, id?: string) {
        this.type = type;
        this.id = id ?? guid();
        this.style = {};
    }
}
