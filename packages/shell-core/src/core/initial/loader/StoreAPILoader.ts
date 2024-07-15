/** @format */

import { TIANYU_SHELL_CORE_STORE_TYPE, TIANYU_SHELL_INFRA_STORE_TYPE } from "../../declares/Constant";
import { ITianyuShellInitial } from "../../ITianyuShellInitial";

export async function storeAPILoader(config: ITianyuShellInitial): Promise<void> {
    const { getStore } = await import(
        /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "shell-core/src/core/utils/Store"
    );
    const { TianyuShellInfraInterface, getTianyuShellInfraInstanceId } = await import(
        /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "shell-core/src/core/initial/store-api/TianyushellInfraInterface"
    );

    getStore().registerInterface(TIANYU_SHELL_INFRA_STORE_TYPE, TianyuShellInfraInterface);
    await getStore().dispatch(TianyuShellInfraInterface.core.creator(getTianyuShellInfraInstanceId(), config || {}));

    const { TianyuShellCoreInterface, getTianyuShellCoreInstanceId } = await import(
        /*webpackChunkName: "aitianyu.cn/tianyu-shell/store-api" */ "shell-core/src/core/plugin/store/Exports"
    );

    getStore().registerInterface(TIANYU_SHELL_CORE_STORE_TYPE, TianyuShellCoreInterface);
    await getStore().dispatch(TianyuShellCoreInterface.core.creator(getTianyuShellCoreInstanceId()));
}
