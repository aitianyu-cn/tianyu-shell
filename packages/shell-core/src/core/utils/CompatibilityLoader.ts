/**@format */

import { TIANYU_RESOURCE_COMMON, TIANYU_RESOURCE_URL } from "infra/RemoteEnvironment";
import { ITianyuShell } from "../declares/Declare";
import { FetchFileLoader } from "@aitianyu.cn/client-base";

function remoteUrlGenerator(group: string): string {
    if ((window as any).tianyuShell?.env?.config?.core?.sync?.proxy) {
        return `${
            (window as any).tianyuShell?.env?.config?.core?.sync?.proxy
        }/${TIANYU_RESOURCE_COMMON}/${group}/compatibility.json`;
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

async function languageLoader(): Promise<void> {
    const remoteUrl = remoteUrlGenerator("language");
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
            (windowObj.tianyuShell as ITianyuShell).runtime.sync.language?.pending.push(...(languageData.pending || []));
            (windowObj.tianyuShell as ITianyuShell).runtime.sync.language?.support.push(...(languageData.support || []));
        }
    }
}

async function themeLoader(): Promise<void> {
    const remoteUrl = remoteUrlGenerator("theme");
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
    if (!(window as any).tianyuShell?.env?.config?.core?.sync?.compatibility) {
        return;
    }

    await languageLoader();
    await themeLoader();
}
