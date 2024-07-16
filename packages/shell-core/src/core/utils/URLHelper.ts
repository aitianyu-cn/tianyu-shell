/** @format */

import { TIANYU_RESOURCE_COMMON, TIANYU_RESOURCE_URL } from "infra/RemoteEnvironment";

export function compatibilityUrlGenerator(group: string, proxy: string): string {
    if (proxy) {
        return `${proxy}/${TIANYU_RESOURCE_COMMON}/${group}/compatibility.json`;
    }
    return `${TIANYU_RESOURCE_URL}/${TIANYU_RESOURCE_COMMON}/${group}/compatibility.json`;
}
