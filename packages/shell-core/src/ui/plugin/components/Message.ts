/**@format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import {
    ITianyuShellUIHorizontalAlignment as TianyuShellUIHorizontalAlignment,
    TianyuShellUIHyperLink,
    ITianyuShellCoreUIMessage,
    ITianyuShellUIMessageHelper,
    ITianyuShellUIVerticalAlignment as TianyuShellUIVerticalAlignment,
    TianyuShellUIMessageType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { MessageTip } from "../types/MessageTip";
import { MESSAGE_DEFAULT_TIMESTAMP, MESSAGE_DEFAULT_HORIZONTAL_RATE, MESSAGE_DEFAULT_VERTICAL_RATE } from "../types/MessageTypes";
import { guid } from "@aitianyu.cn/types";
import { TianyuShellUIMessagePreious, TianyuShellUIMessageZIndex } from "../../common/Declare";
import * as MessageBundle from "../../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";
import { isMobile } from "shell-core/src/core/plugin/Runtime";

const MESSAGE_MINIMUM_TIMESTAMP = 2000;

interface IMessageHelper {
    align: {
        horizontal: TianyuShellUIHorizontalAlignment;
        vertical: TianyuShellUIVerticalAlignment;
    };
    rate: {
        horizontal: number;
        vertical: number;
    };
    timestamp: number;
    layerId: string;
}

const _messageHelperMap: IMessageHelper = {
    align: {
        horizontal: TianyuShellUIHorizontalAlignment.CENTER,
        vertical: TianyuShellUIVerticalAlignment.BOTTOM,
    },
    rate: {
        horizontal: MESSAGE_DEFAULT_HORIZONTAL_RATE,
        vertical: MESSAGE_DEFAULT_VERTICAL_RATE,
    },
    timestamp: MESSAGE_DEFAULT_TIMESTAMP,
    layerId: "",
};

function _updateMessageLayer(): void {
    // to setup message layer setting.
    const messageLayer = document.getElementById(_messageHelperMap.layerId);
    if (messageLayer) {
        const leftAlign = _messageHelperMap.align.horizontal === TianyuShellUIHorizontalAlignment.LEFT;
        const rightAlign = _messageHelperMap.align.horizontal === TianyuShellUIHorizontalAlignment.RIGHT;
        const topAlign = _messageHelperMap.align.vertical === TianyuShellUIVerticalAlignment.TOP;
        const bottomAlign = _messageHelperMap.align.vertical === TianyuShellUIVerticalAlignment.BOTTOM;

        messageLayer.id = _messageHelperMap.layerId;
        messageLayer.classList.add(
            "tys_message_layer_styling",
            topAlign ? "tys_message_layer_styling_vtop" : "tys_message_layer_styling_vntop",
        );
        messageLayer.style.zIndex = `${TianyuShellUIMessageZIndex}`;
        messageLayer.style.width = isMobile ? "100%" : `${_messageHelperMap.rate.horizontal}%`;
        messageLayer.style.height = isMobile ? "100%" : `${_messageHelperMap.rate.vertical}%`;
        messageLayer.style.left = leftAlign
            ? "0px"
            : rightAlign
            ? "auto"
            : isMobile
            ? "0px"
            : `${(100 - _messageHelperMap.rate.horizontal) / 2}%`;
        messageLayer.style.right = leftAlign
            ? "auto"
            : rightAlign
            ? "0px"
            : isMobile
            ? "0px"
            : `${(100 - _messageHelperMap.rate.horizontal) / 2}%`;

        messageLayer.style.top = topAlign
            ? "0px"
            : bottomAlign
            ? "auto"
            : isMobile
            ? "0px"
            : `${(100 - _messageHelperMap.rate.vertical) / 2}%`;
        messageLayer.style.bottom = topAlign
            ? "auto"
            : bottomAlign
            ? "0px"
            : isMobile
            ? "0px"
            : `${(100 - _messageHelperMap.rate.vertical) / 2}%`;
        messageLayer.style.alignItems = leftAlign ? "flex-start" : rightAlign ? "flex-end" : "center";
    }
}

const _messageMap: Map<string, MessageTip> = new Map<string, MessageTip>();

function _messageIsOpen(id: string): boolean {
    return _messageMap.has(id);
}

function _messageCount(): number {
    return _messageMap.size;
}

function _messageCloseInner(id: string): MessageTip | undefined {
    let removed = false;
    const messageTip = _messageMap.get(id);
    if (messageTip) {
        const layer = document.getElementById(_messageHelperMap.layerId);
        const uiElem = document.getElementById(id);
        if (layer && uiElem) {
            layer.removeChild(uiElem);
            removed = true;
        }
    }
    if (removed && _messageMap.delete(id)) {
        Log.debug(MessageBundle.getText("TIANYU_UI_MESSAGE_CLOSED", id));

        // only removed success should to remove the messageTip
        return messageTip;
    }
}

function _messageClose(id: string): void {
    const messageTip = _messageCloseInner(id);
    if (messageTip) {
        messageTip.close();
    }
}

function _messagePost(
    type: TianyuShellUIMessageType,
    code: string,
    message: string,
    title: string,
    detail?: string[],
    isTech?: boolean,
    moreInfo?: TianyuShellUIHyperLink | undefined,
    troubleShot?: TianyuShellUIHyperLink | undefined,
): string {
    const id = guid();
    const tip = new MessageTip(
        {
            id: id,
            type: type,
            code: code,
            message: message,
            title: title,
            detail: detail || [],
            timestamp: _messageHelperMap.timestamp,
            isTechError: !!isTech,
            moreInfo: moreInfo,
            troubleShot: troubleShot,
        },
        _messageCloseInner,
    );
    _messageMap.set(id, tip);

    const layer = document.getElementById(_messageHelperMap.layerId);
    if (layer) {
        const renderElement = tip.render();
        layer.appendChild(renderElement);
        Log.debug(MessageBundle.getText("TIANYU_UI_MESSAGE_POST_SUCCESS", id));
    } else {
        Log.error(MessageBundle.getText("TIANYU_UI_MESSAGE_POST_NO_LAYER", id));
    }

    return id;
}

function _validateMessageTimestamp(value: number): number {
    return value > MESSAGE_MINIMUM_TIMESTAMP ? value : MESSAGE_MINIMUM_TIMESTAMP;
}

const _messageHelper: ITianyuShellUIMessageHelper = {
    setVerticalAlign: function (value: TianyuShellUIVerticalAlignment): void {
        _messageHelperMap.align.vertical = value;
        _updateMessageLayer();
    },
    setVerticalRate: function (value: number): void {
        _messageHelperMap.rate.vertical = value;
        _updateMessageLayer();
    },
    setHorizontalAlign: function (value: TianyuShellUIHorizontalAlignment): void {
        _messageHelperMap.align.horizontal = value;
        _updateMessageLayer();
    },
    setHorizontalRate: function (value: number): void {
        _messageHelperMap.rate.horizontal = value;
        _updateMessageLayer();
    },
    setTimestamp: function (value: number): void {
        _messageHelperMap.timestamp = _validateMessageTimestamp(value);
    },

    getVerticalAlign: function (): TianyuShellUIVerticalAlignment {
        return _messageHelperMap.align.vertical;
    },
    getVerticalRate: function (): number {
        return _messageHelperMap.rate.vertical;
    },
    getHorizontalAlign: function (): TianyuShellUIHorizontalAlignment {
        return _messageHelperMap.align.horizontal;
    },
    getHorizontalRate: function (): number {
        return _messageHelperMap.rate.horizontal;
    },
    getTimestamp: function (): number {
        return _messageHelperMap.timestamp;
    },
};

const _message: ITianyuShellCoreUIMessage = {
    post: _messagePost,
    close: _messageClose,
    isOpen: _messageIsOpen,
    count: _messageCount,
    helper: _messageHelper,
};

function _init_message_layout_base(): void {
    _messageHelperMap.layerId = `${TianyuShellUIMessagePreious}_${guid()}`;

    const messageLayer = document.createElement("div");
    messageLayer.id = _messageHelperMap.layerId;
    document.body.appendChild(messageLayer);

    _updateMessageLayer();
}

export function initTianyuShellCoreUIMessage(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.message) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    message: _message,
                },
            },
        };

        _init_message_layout_base();

        // CssHelper.loadGlobalStyle("test_message_stype");
    }
}
