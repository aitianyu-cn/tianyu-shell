/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
} from "shell-core/src/core/declares/ui/UserInterface";
import { isMobile } from "shell-core/src/core/plugin/Runtime";
import { getStore } from "shell-core/src/core/utils/Store";
import { TianyuShellUIMessageZIndex } from "../../common/Declare";
import { getMessageInstanceId } from "../../tools/InstanceHelper";
import { MessageInterface } from "../interface/MessageInterfaceExpose";
import { DEFAULT_MESSAGE_HELPER, IMessageHelper } from "../interface/state/MessageState";

export function updateMessageLayer(messageLayer: HTMLElement, messageHelper: IMessageHelper): void {
    // to setup message layer setting.
    const leftAlign = messageHelper.align.horizontal === ITianyuShellUIHorizontalAlignment.LEFT;
    const rightAlign = messageHelper.align.horizontal === ITianyuShellUIHorizontalAlignment.RIGHT;
    const topAlign = messageHelper.align.vertical === ITianyuShellUIVerticalAlignment.TOP;
    const bottomAlign = messageHelper.align.vertical === ITianyuShellUIVerticalAlignment.BOTTOM;

    messageLayer.id = messageHelper.layerId;
    messageLayer.classList.add(
        "tys_message_layer_styling",
        topAlign ? "tys_message_layer_styling_vtop" : "tys_message_layer_styling_vntop",
    );
    messageLayer.style.zIndex = `${TianyuShellUIMessageZIndex}`;
    messageLayer.style.width = isMobile() ? /* istanbul ignore next */ "100%" : `${messageHelper.rate.horizontal}%`;
    messageLayer.style.maxHeight = isMobile() ? /* istanbul ignore next */ "100%" : `${messageHelper.rate.vertical}%`;
    messageLayer.style.height = "fit-content";
    messageLayer.style.left = leftAlign
        ? "0px"
        : rightAlign
        ? "auto"
        : isMobile()
        ? /* istanbul ignore next */ "0px"
        : `${(100 - messageHelper.rate.horizontal) / 2}%`;
    messageLayer.style.right = leftAlign
        ? "auto"
        : rightAlign
        ? "0px"
        : isMobile()
        ? /* istanbul ignore next */ "0px"
        : `${(100 - messageHelper.rate.horizontal) / 2}%`;

    messageLayer.style.top = topAlign
        ? "0px"
        : bottomAlign
        ? "auto"
        : isMobile()
        ? /* istanbul ignore next */ "0px"
        : `${(100 - messageHelper.rate.vertical) / 2}%`;
    messageLayer.style.bottom = topAlign
        ? "auto"
        : bottomAlign
        ? "0px"
        : isMobile()
        ? /* istanbul ignore next */ "0px"
        : `${(100 - messageHelper.rate.vertical) / 2}%`;
    messageLayer.style.alignItems = leftAlign ? "flex-start" : rightAlign ? "flex-end" : "center";
}

export function initLayout(): void {
    const store = getStore();
    const instanceId = getMessageInstanceId();

    const layerId = store.selecte(MessageInterface.control.getId(instanceId));
    const messageLayer = document.createElement("div");
    messageLayer.id = layerId instanceof Missing ? "" : layerId;
    document.body.appendChild(messageLayer);

    const messageHelperWithMissing = store.selecte(MessageInterface.control.getHelper(instanceId));
    const messageHelper =
        messageHelperWithMissing instanceof Missing ? DEFAULT_MESSAGE_HELPER : messageHelperWithMissing;
    updateMessageLayer(messageLayer, messageHelper);
}
