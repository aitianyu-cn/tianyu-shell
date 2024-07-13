/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellInitial } from "../ITianyuShellInitial";
import { ObjectHelper } from "@aitianyu.cn/types";

export const CreateTianyuShellInfraAction = ActionFactor.makeCreateStoreAction<
    ITianyuShellInitial,
    ITianyuShellInitial
>().withReducer(function (_, state) {
    return ObjectHelper.clone(state);
});

export const DestroyTianyuShellInfraAction = ActionFactor.makeDestroyStoreAction();
