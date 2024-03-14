/**@format */

import { MapOfString } from "@aitianyu.cn/types";
import { IAnimationIndex } from "./Declaration";

export class GlobalStyling {
    public static getStyleElement(): HTMLStyleElement {
        let style = document.head.getElementsByTagName("style")[0] as HTMLStyleElement;
        if (!style) {
            style = document.createElement("style");
            document.head.appendChild(style);
        }

        return style;
    }

    public static insertStylingSheet(stylings: MapOfString): IAnimationIndex {
        const animationIndex: IAnimationIndex = {};
        const styleElement = GlobalStyling.getStyleElement();
        for (const stylingKey of Object.keys(stylings)) {
            const index = styleElement.sheet?.insertRule(stylings[stylingKey]);
            animationIndex[stylingKey] = index;
        }
        return animationIndex;
    }

    public static removeStylingSheet(animationIndex: IAnimationIndex): void {
        const styleElement = GlobalStyling.getStyleElement();
        for (const styling of Object.keys(animationIndex)) {
            const index = animationIndex[styling];
            index && styleElement.sheet?.deleteRule(index);
        }
    }
}
