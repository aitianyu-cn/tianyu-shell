/**@format */

import { getTextFromFile } from "../../../../../infra/International";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("core", "core/common/i18n/message", id, args);
}
