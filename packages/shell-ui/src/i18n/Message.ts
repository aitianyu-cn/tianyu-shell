/**@format */

import { getTextFromFile } from "../../../infra/resource/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("ui", "i18n/message", id, args);
}
