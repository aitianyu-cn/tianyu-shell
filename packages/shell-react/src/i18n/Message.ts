/**@format */

import { getTextFromFile } from "../../../infra/resource/Message";

export function getText(id: string, args?: (string | number)[] | string): string {
    return getTextFromFile("react", "i18n/message", id, args);
}
