/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import { MapOfString } from "@aitianyu.cn/types";
import { TianyuUIStyle } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { TianyuShellUIThemeColor } from "shell-core/src/core/declares/ui/UserInterface";

export interface IStylingState extends IterableType {
    css: string[];
    theme: {
        user: {
            custom: MapOfString;
            using: string[];
        };
        default: {
            theme: string;
            /** Theme color */
            color: TianyuShellUIThemeColor;
            /** Theme valid flag */
            valid: boolean;
        };
        custom: {
            theme: string;
            /** Theme color */
            color: TianyuShellUIThemeColor;
            /** Theme valid flag */
            valid: boolean;
        };
    };
}

export interface IStyleMap {
    list: Map<string, IStyleMap>;
    styles: TianyuUIStyle;
}

export type CssMap = Map<string, HTMLElement>;

export const STYLING_CSS_MAP = "styling-css-map";
export const STYLING_STYLE_MAP = "styling-style-map";
