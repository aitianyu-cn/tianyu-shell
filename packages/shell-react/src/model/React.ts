/**@format */

declare type StandardLonghandProperties = any;

export interface IReactProperty {
    [key: string]: string | boolean | number;
}

export interface IReactState {
    [key: string]: string | boolean | number;
}

export interface IReactControlProperty {
    style?: StandardLonghandProperties;
    width?: number;
}
