/**@format */

import { IterableType } from "@aitianyu.cn/tianyu-store";

declare type StandardLonghandProperties = any;

export interface IReactProperty {
    [key: string]: any;
}

export interface IReactState extends IterableType {}

export interface IReactControlProperty {
    style?: StandardLonghandProperties;
    width?: number;
}
