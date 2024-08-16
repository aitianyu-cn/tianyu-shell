/**@format */

import { InstanceId, IStore, IterableType } from "@aitianyu.cn/tianyu-store";

declare type StandardLonghandProperties = any;

export interface ITianyuUIProperty {
    parentInstance: InstanceId;
    store: IStore;
    id: string;
}

export interface IReactProperty extends ITianyuUIProperty {
    [key: string]: any;
}

export interface IReactState extends IterableType {}

export interface IReactControlProperty {
    style?: StandardLonghandProperties;
    width?: number;
}
