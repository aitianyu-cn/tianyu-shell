/**@format */

import { IReactControlProperty } from "./React";

export type ReactToggleType = "default" | "square" | "line";

export interface IReactToggleProperty extends IReactControlProperty {
    id: string;
    size?: number;
    lineLenght?: number;
    defaultState?: boolean;
    type?: ReactToggleType;
    borderRadio?: number;
    selectedBackground?: string;
    unSelectedBackground?: string;
    border?: string;
    toggleColor?: string;
    onStateChange?: (id: string, state: boolean) => void;
}
