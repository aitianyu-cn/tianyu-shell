/**@format */

import { getTextFromFile } from "../../../../../infra/International";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("core", "ui/resources/i18n/message", id, args);
}
