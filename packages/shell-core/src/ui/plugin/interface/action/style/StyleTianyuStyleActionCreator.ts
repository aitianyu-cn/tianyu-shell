/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { IStylingState } from "../../state/StylingState";

export const CreateTianyuStyleMapActionCreator = ActionFactor.makeActionCreator<IStylingState>();
export const LifecycleTianyuStyleMapActionCreator = ActionFactor.makeActionCreator<IStylingState>();

export const SetTianyuStylingActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    {
        key: string;
        styling: TianyuUIStyleDeclaration;
        path?: string;
    }
>();
export const RemoveTianyuStylingActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    { key: string; path?: string }
>();
