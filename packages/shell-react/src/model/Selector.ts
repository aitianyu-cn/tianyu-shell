/**@format */

import { CallbackAction } from "@aitianyu.cn/types";

export interface ISingleSelectorItemController {
    select(selectorId: string): boolean;
    leave(selectorId: string): void;
}

export interface ISingleSelector {
    select(): boolean;
    leave(): void;
}

export interface ISingleSelectorGroup {
    join(unselectTrigger: CallbackAction, name?: string): ISingleSelector;
}

export interface ISingleSelectorController extends ISingleSelectorGroup {
    selectedItem(): string;
    setSelected(name: string): void;
}
