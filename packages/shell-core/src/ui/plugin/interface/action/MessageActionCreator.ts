/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
} from "shell-core/src/core/declares/ui/UserInterface";
import { IMessagePostData, IMessageState } from "../state/MessageState";

export const CreateMessageInstanceActionCreator = ActionFactor.makeCreateStoreAction<IMessageState>();
export const DestroyMessageInstanceActionCreator = ActionFactor.makeDestroyStoreAction();

export const CreateLinkerMapActionCreator = ActionFactor.makeActionCreator<IMessageState>();
export const LifeCycleActionCreator = ActionFactor.makeActionCreator<IMessageState>();

export const SetVerticalAlignActionCreator = ActionFactor.makeActionCreator<
    IMessageState,
    ITianyuShellUIVerticalAlignment
>();
export const SetVerticalRateActionCreator = ActionFactor.makeActionCreator<IMessageState, number>();
export const SetHorizontalAlignActionCreator = ActionFactor.makeActionCreator<
    IMessageState,
    ITianyuShellUIHorizontalAlignment
>();
export const SetHorizontalRateActionCreator = ActionFactor.makeActionCreator<IMessageState, number>();
export const SetTimestampActionCreator = ActionFactor.makeActionCreator<IMessageState, number>();

export const PostMessageActionCreator = ActionFactor.makeActionCreator<IMessageState, IMessagePostData>();
export const CloseMessageActionCreator = ActionFactor.makeActionCreator<IMessageState, string>();
