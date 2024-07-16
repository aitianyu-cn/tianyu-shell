/** @format */

import { FetchFileLoader } from "@aitianyu.cn/client-base";

export async function fetchData(url: string): Promise<any> {
    try {
        const fetchFile = new FetchFileLoader(url);
        const response = await fetchFile.openAsync();
        return response || null;
    } catch {
        return null;
    }
}
