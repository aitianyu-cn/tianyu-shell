/** @format */

import { ListenerFactor, Missing } from "@aitianyu.cn/tianyu-store";
import { StylingListenerExpose } from "../interface/StylingInterfaceExpose";
import { getStylingInstanceId } from "../../tools/InstanceHelper";
import { CssHelper } from "../../resources/CssHelper";
import { getStore } from "shell-core/src/core/utils/Store";

function onStyleCssChanged(oldCssList: string[] | undefined, newCssList: string[] | undefined): void {
    const store = getStore();
    const instanceId = getStylingInstanceId();

    oldCssList = oldCssList || [];
    newCssList = newCssList || [];

    for (const css in oldCssList) {
        if (!newCssList.includes(css)) {
            CssHelper.removeGlobalStyle(css);
        }
    }

    for (const css in newCssList) {
        if (!oldCssList.includes(css)) {
            const elementWithMissing = store.selecte(StylingListenerExpose.style.css.getElement(instanceId, css));
            if (elementWithMissing && !(elementWithMissing instanceof Missing)) {
                CssHelper.appendGlobalStyle(elementWithMissing);
            }
        }
    }
}

export const StyleCssChangedListener = ListenerFactor.createListener(
    StylingListenerExpose.style.css.getAllCss(getStylingInstanceId()),
    onStyleCssChanged,
);
