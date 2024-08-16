/** @format */

import { ITianyuShellInitial } from "../../ITianyuShellInitial";

export async function globalFeatureLoader(config: ITianyuShellInitial): Promise<void> {
    if (config?.runtime?.globalCache) {
        const { initTianyuShellGlobalCache } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "../runtime/RuntimeInitial"
        );
        initTianyuShellGlobalCache();
    }

    const { compatibilityLoader } = await import(
        /*webpackChunkName: "aitianyu.cn/tianyu-shell/runtime" */ "../runtime/CompatibilityLoader"
    );
    await compatibilityLoader();
}
