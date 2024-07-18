/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { StoreType } from "./StoreTypes";
import { GetDialogLayerCount } from "./selector/DialogSelector";
import { CreateDialogAction, DestroyDialogAction } from "./action/DialogAction";

export const DialogInterface = {
    core: {
        creator: CreateDialogAction,
        destroy: DestroyDialogAction,
    },
    layer: {
        count: GetDialogLayerCount,
    },
};

export const DialogExpose = {};

StoreUtils.registerExpose(DialogExpose, StoreType.DIALOG_STORE_TYPE);
