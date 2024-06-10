/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IStylingState } from "../../state/StylingState";

export const CreateStylingInstanceActionCreator = ActionFactor.makeCreateStoreAction<IStylingState>();
export const DestroyStylingInstanceActionCreator = ActionFactor.makeDestroyStoreAction();
