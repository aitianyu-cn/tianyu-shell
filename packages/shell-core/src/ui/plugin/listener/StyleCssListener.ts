/** @format */

import { ListenerFactor, Missing } from "@aitianyu.cn/tianyu-store";
import { StylingListenerExpose } from "../interface/StylingInterfaceExpose";
import { getStylingInstanceId } from "../../tools/InstanceHelper";
import { CssHelper } from "../../resources/CssHelper";
import { getStore } from "shell-core/src/core/utils/Store";
import { TestHook } from "infra/TestHook";

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
            try {
                const elementWithMissing = store.selecteWithThrow(
                    StylingListenerExpose.style.css.getElement(instanceId, css),
                );
                if (elementWithMissing) {
                    CssHelper.appendGlobalStyle(elementWithMissing);
                }
            } catch {
                TestHook.debugger("style css listener - get style element failed");
            }
        }
    }
}

export const StyleCssChangedListener = ListenerFactor.createListener(
    StylingListenerExpose.style.css.getAllCss(getStylingInstanceId()),
    onStyleCssChanged,
);
