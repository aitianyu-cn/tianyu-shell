/**@format */

import { Log } from "shell-core/src/core/plugin/Console";
import { TianyuUI } from "../../core/declares/ui/TianyuUI";
import { createHTMLbyTianyuUI } from "../plugin/handler/Creator";
import * as MessageBundle from "../resources/i18n/Message";

/**
 * Render Tianyu Shell UI element to a target HTML element as a child
 *
 * @param parent parent HTML element
 * @param tianyuUI Tianyu Shell UI Element which needs to rendered
 */
export function renderHTML(parent: HTMLElement | string, tianyuUI: TianyuUI): void {
    const renderParent = typeof parent === "string" ? document.getElementById(parent) : parent;
    if (!renderParent) {
        Log.error(MessageBundle.getText("TIANYU_UI_RENDER_NO_PARENT", typeof parent === "string" ? parent : "[HTML Object]"));
        return;
    }

    const uiElement = createHTMLbyTianyuUI(tianyuUI);
    renderParent.appendChild(uiElement);
}
