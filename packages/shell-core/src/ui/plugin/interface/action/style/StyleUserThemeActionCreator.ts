/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IStylingState } from "../../state/StylingState";

export const AddNewCustomThemeActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    {
        themeId: string;
        styling: string;
    }
>();

export const UpdateCustomThemeActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    {
        themeId: string;
        styling: string;
    }
>();

export const DeleteCustomThemeActionCreator = ActionFactor.makeActionCreator<IStylingState, string>();

export const ResetCustomThemeActionCreator = ActionFactor.makeActionCreator<IStylingState>();
