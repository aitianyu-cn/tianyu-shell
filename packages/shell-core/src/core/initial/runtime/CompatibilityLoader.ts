/**@format */

import { getStore } from "../../utils/Store";
import { TianyuShellInfraInterfaceExpose } from "../../utils/InfraInterfaceExpose";
import { IInstanceAction, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { getTianyuShellInfraInstanceId } from "../store-api/TianyushellInfraInterface";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "../../plugin/store/Exports";
import { compatibilityUrlGenerator } from "../../utils/URLHelper";
import { fetchData } from "../../utils/RemoteDataHelper";

async function languageLoader(proxy: string): Promise<void> {
    const remoteUrl = compatibilityUrlGenerator("language", proxy);
    const languageData = await fetchData(remoteUrl);

    if (languageData) {
        const aActions: IInstanceAction<any>[] = [];
        Array.isArray(languageData.pending) &&
            languageData.pending.length &&
            aActions.push(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "pending",
                    languages: languageData.pending || [],
                }),
            );
        Array.isArray(languageData.support) &&
            languageData.support.length &&
            aActions.push(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "support",
                    languages: languageData.support || [],
                }),
            );

        await getStore().dispatch(StoreUtils.createBatchAction(aActions));
    }
}

async function themeLoader(proxy: string): Promise<void> {
    const remoteUrl = compatibilityUrlGenerator("theme", proxy);
    const themeData = await fetchData(remoteUrl);

    if (Array.isArray(themeData) && themeData.length) {
        await getStore().dispatch(
            TianyuShellCoreInterface.compatibility.action.addTheme(getTianyuShellCoreInstanceId(), themeData),
        );
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
