/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";

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
