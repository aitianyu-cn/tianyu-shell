/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IStylingState } from "../../state/StylingState";

export const CreateCssMappingActionCreator = ActionFactor.makeActionCreator<IStylingState>();
export const LifecycleCssMappingActionCreator = ActionFactor.makeActionCreator<IStylingState>();

export const RemoveStylingCssActionCreator = ActionFactor.makeActionCreator<IStylingState, string>();
export const AddStylingCssActionCreator = ActionFactor.makeActionCreator<
    IStylingState,
    { key: string; link: string }
>();
