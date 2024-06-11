/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IStylingState } from "../../state/StylingState";
import { ITianyuShellCoreUIThemeItem } from "shell-core/src/core/declares/ui/UserInterface";

export const CreateStylingInstanceActionCreator = ActionFactor.makeCreateStoreAction<
    IStylingState,
    {
        default: ITianyuShellCoreUIThemeItem;
        custom: ITianyuShellCoreUIThemeItem;
    }
>();

export const DestroyStylingInstanceActionCreator = ActionFactor.makeDestroyStoreAction();
