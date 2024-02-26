/**@format */

import {
    TIANYU_RESOURCE_URL,
    TIANYU_RESOURCE_COMMON,
    TIANYU_SHELL_RESOURCE_PROJECT,
    TIANYU_SHELL_RESOURCE_BASIC_GROUP,
} from "infra/RemoteEnvironment";

/** Tianyu Shell Theme URL Handler */
export class ThemeURLHandler {
    /**
     * Get Tianyu Shell Default Theme URL
     *
     * @param theme Tianyu Shell Theme name
     * @param themeColor Tianyu Shell Theme Color name
     * @returns return the Theme URL
     */
    public static getURL(theme: string, themeColor: string): string {
        return `${TIANYU_RESOURCE_URL}/${TIANYU_RESOURCE_COMMON}/theme/${themeColor}/${theme}.css`;
    }
}

/** Tianyu Shell UI Styling URL Handler */
export class StylingURLHandler {
    /**
     * Get a static resource full URL in resource.aitianyu.cn/resources
     *
     * @param name resource name
     * @returns return full URL
     */
    public static staticURL(name: string): HTMLElement {
        const styling = document.createElement("link");
        styling.id = `tianyu_shell_ui_static_${name}`;
        styling.href = `${TIANYU_RESOURCE_URL}/${TIANYU_SHELL_RESOURCE_PROJECT}/${TIANYU_SHELL_RESOURCE_BASIC_GROUP}/${name}.css`;
        styling.rel = "stylesheet";
        styling.type = "text/css";

        return styling;
    }
}
