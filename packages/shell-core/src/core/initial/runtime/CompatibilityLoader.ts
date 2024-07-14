/**@format */

import { TIANYU_RESOURCE_COMMON, TIANYU_RESOURCE_URL } from "infra/RemoteEnvironment";
import { ITianyuShell } from "../../declares/Declare";
import { FetchFileLoader } from "@aitianyu.cn/client-base";
import { getStore } from "../../utils/Store";
import { getTianyuShellInfraInstanceId, TianyuShellInfraInterfaceExpose } from "../../utils/InfraInterfaceExpose";
import { Missing } from "@aitianyu.cn/tianyu-store";

function remoteUrlGenerator(group: string, proxy: string): string {
    if (proxy) {
        return `${proxy}/${TIANYU_RESOURCE_COMMON}/${group}/compatibility.json`;
    }
    return `${TIANYU_RESOURCE_URL}/${TIANYU_RESOURCE_COMMON}/${group}/compatibility.json`;
}

async function fetchData(url: string): Promise<any> {
    try {
        const fetchFile = new FetchFileLoader(url);
        const response = await fetchFile.openAsync();
        return response || null;
    } catch {
        return null;
    }
}

async function languageLoader(proxy: string): Promise<void> {
    const remoteUrl = remoteUrlGenerator("language", proxy);
    const languageData = await fetchData(remoteUrl);

    if (
        languageData &&
        ((Array.isArray(languageData.support) && languageData.support.length) ||
            (Array.isArray(languageData.pending) && languageData.pending.length))
    ) {
        const windowObj = window as any;
        if (!(windowObj.tianyuShell as ITianyuShell)?.runtime?.sync?.language) {
            (windowObj.tianyuShell as ITianyuShell) = {
                ...(windowObj.tianyuShell || {}),
                runtime: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.runtime || {}),
                    sync: {
                        ...((windowObj.tianyuShell as ITianyuShell)?.runtime?.sync || {}),
                        language: {
                            pending: languageData.pending || [],
                            support: languageData.support || [],
                        },
                    },
                },
            };
        } else {
            (windowObj.tianyuShell as ITianyuShell).runtime.sync.language?.pending.push(
                ...(languageData.pending || []),
            );
            (windowObj.tianyuShell as ITianyuShell).runtime.sync.language?.support.push(
                ...(languageData.support || []),
            );
        }
    }
}

async function themeLoader(proxy: string): Promise<void> {
    const remoteUrl = remoteUrlGenerator("theme", proxy);
    const themeData = await fetchData(remoteUrl);

    if (Array.isArray(themeData) && themeData.length) {
        const windowObj = window as any;
        if (!(windowObj.tianyuShell as ITianyuShell)?.runtime?.sync?.theme) {
            (windowObj.tianyuShell as ITianyuShell) = {
                ...(windowObj.tianyuShell || {}),
                runtime: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.runtime || {}),
                    sync: {
                        ...((windowObj.tianyuShell as ITianyuShell)?.runtime?.sync || {}),
                        theme: themeData,
                    },
                },
            };
        } else {
            (windowObj.tianyuShell as ITianyuShell).runtime.sync.theme?.push(...themeData);
        }
    }
}

export async function compatibilityLoader(): Promise<void> {
    const compatibility = getStore().selecte(
        TianyuShellInfraInterfaceExpose.getCompatibilityConfig(getTianyuShellInfraInstanceId()),
    );
    if (compatibility instanceof Missing || !compatibility.compatibility) {
        return;
    }

    await languageLoader(compatibility.proxy);
    await themeLoader(compatibility.proxy);
}
