/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IBackgroundState } from "../state/BackgroundState";

export const CreateBackgroundInstanceActionCreator = ActionFactor.makeCreateStoreAction<IBackgroundState>();
export const DestroyBackgroundInstanceActionCreator = ActionFactor.makeDestroyStoreAction();

export const BackgroundExternalActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();
export const BackgroundLifecycleActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();

export const SetColorActionCreator = ActionFactor.makeActionCreator<IBackgroundState, string>();
export const RemoveColorActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();

export const SetHtmlElementActionCreator = ActionFactor.makeActionCreator<
    IBackgroundState,
    { element: HTMLElement; id?: string }
>();
export const RemoveHtmlElementActionCreator = ActionFactor.makeActionCreator<IBackgroundState, string>();
export const ResetHtmlElementActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();
export const ClearHtmlElementsActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();

export const ResetBackgroundActionCreator = ActionFactor.makeActionCreator<IBackgroundState>();
