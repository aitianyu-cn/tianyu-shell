/** @format */

import { ActionFactor, ITianyuStoreInterface } from "@aitianyu.cn/tianyu-store";

export const TianyuReactInterfaceExpose: ITianyuStoreInterface<any> = {
    core: {
        creator: ActionFactor.makeCreateStoreAction<any, any>().withReducer(function (_, rawState): any {
            return rawState;
        }),
        destroy: ActionFactor.makeDestroyStoreAction(),
    },
};

export const TIANYU_SHELL_REACT_STORE = "tianyu-shell-react";
