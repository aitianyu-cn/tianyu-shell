/** @format */

import { ITianyuShellInitial } from "../../ITianyuShellInitial";

export async function handlerLoader(config: ITianyuShellInitial): Promise<void> {
    if (config?.core?.plugin?.globalize) {
        const { loadHandlers } = await import(
            /*webpackChunkName: "aitianyu.cn/tianyu-shell/handler" */ "../../plugin/handler/Handler"
        );
        loadHandlers();
    }
}
