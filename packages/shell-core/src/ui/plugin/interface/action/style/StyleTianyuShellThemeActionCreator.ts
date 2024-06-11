/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IStylingState } from "../../state/StylingState";
import { ITianyuShellCoreUIThemeItem } from "shell-core/src/core/declares/ui/UserInterface";

export const ResetTianyuShellThemeActionCreator = ActionFactor.makeActionCreator<IStylingState>();

export const ChangeTianyuShellThemeActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    ITianyuShellCoreUIThemeItem
>();
