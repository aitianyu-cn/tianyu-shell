/**@format */

import { IReactControlProperty } from "./React";
import { ISingleSelectorGroup } from "./Selector";

export interface IReactRadioButtonProperty extends IReactControlProperty {
    group: ISingleSelectorGroup;
    id: string;
    value: string;
    selected?: boolean;
    size?: number;
    color?: string;
    selectedColor?: string;
    border?: string;
    insideMargin?: number | string;
}
