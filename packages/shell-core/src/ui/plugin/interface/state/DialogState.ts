/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import { CallbackActionT } from "@aitianyu.cn/types";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import {
    ITianyuShellUIDialogCallbackValue,
    TianyuShellUIDialogButtons,
    TianyuShellUIDialogType,
} from "shell-core/src/core/declares/ui/UserInterface";

export type LayerMap = Map<string, HTMLElement>;

export type DialogElementMap = Map<string, { layer: string; element: HTMLElement }>;

export interface IDialogState extends IterableType {
    id: string;
    layers: string[];
    current: string;
    dialogs: string[];
}

export const DIALOG_LAYER_MAP = "dialog-layer-map";

export const DIALOG_ELEMENT_MAP = "dialog-element-map";

export interface IDialogInstance {
    id: string;
    element: TianyuUI | string;
    button?: TianyuShellUIDialogButtons;
    type?: TianyuShellUIDialogType;
    close?: boolean;
    callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue>;
}
