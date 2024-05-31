/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";

export const BACKGROUND_ELEMENT_MAP = "background-html-map";

export interface IBackgroundState extends IBackgroundInfo {
    layerId: string;
    defaultColor: string;
}

export interface IBackgroundInfo extends IterableType {
    color: string;
    elementId: string | null;
}
