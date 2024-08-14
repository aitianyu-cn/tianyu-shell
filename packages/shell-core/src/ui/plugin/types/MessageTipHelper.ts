/**@format */

import { CallbackAction, MapOfType, StringHelper } from "@aitianyu.cn/types";
import { TianyuShellUIHyperLink, TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import * as MessageBundle from "../../resources/i18n/Message";
import { TestHook } from "infra/TestHook";

const _stylingMap: MapOfType<{ bg: string; bord: string; front: string }> = {
    fatal: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
    error: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
    warning: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
    success: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
    reload: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
    default: {
        bg: "--ts_ui_{0}_bg",
        bord: "--ts_ui_{0}_bord",
        front: "--ts_ui_{0}_front",
    },
};

export class MessageTipHelper {
    public static processBasicStyles(element: HTMLElement): void {
        element.classList.add("tys_message_view_baisc_styling");
    }
    public static processBackground(element: HTMLElement, type: TianyuShellUIMessageType): void {
        const typeString = MessageTipHelper._getTypeString(type);
        const bgStyling = StringHelper.format(_stylingMap[typeString].bg, typeString);
        const bordStyling = StringHelper.format(_stylingMap[typeString].bord, typeString);
        element.style.background = `var(${bgStyling})`;
        element.style.borderColor = `var(${bordStyling})`;
        element.style.borderStyle = "solid";
        TestHook.debugger(`process background: ${typeString}`);
    }
    public static processFrontColor(element: HTMLElement, type: TianyuShellUIMessageType): void {
        const typeString = MessageTipHelper._getTypeString(type);
        const styling = StringHelper.format(_stylingMap[typeString].front, typeString);
        element.style.color = `var(${styling})`;
        TestHook.debugger(`process front color: ${typeString}`);
    }
    private static _getTypeString(type: TianyuShellUIMessageType): string {
        switch (type) {
            case TianyuShellUIMessageType.FATAL:
                return "fatal";
            case TianyuShellUIMessageType.ERROR:
                return "error";
            case TianyuShellUIMessageType.WARNING:
                return "warning";
            case TianyuShellUIMessageType.SUCCESS:
                return "success";
            case TianyuShellUIMessageType.RELOAD:
                return "reload";
            case TianyuShellUIMessageType.INFO:
            default:
                return "default";
        }
    }
    public static processCloseButton(
        element: HTMLElement,
        type: TianyuShellUIMessageType,
        onClick: CallbackAction,
    ): void {
        // auto closed message should not add close button
        if (MessageTipHelper.isAutoClose(type)) {
            return;
        }

        const closeButton = document.createElement("div");
        closeButton.addEventListener("click", onClick);
        closeButton.innerText = "×";

        closeButton.classList.add("tys_view_close_button", "tys_message_view_button", "tys_common_user_no_seletion");

        element.appendChild(closeButton);
    }
    public static processContent(element: HTMLElement, msg: string): void {
        const textDiv = document.createElement("div");
        textDiv.innerText = msg;

        textDiv.classList.add("tys_message_view_content");

        element.appendChild(textDiv);
    }
    public static processHyperLink(
        element: HTMLElement,
        type: TianyuShellUIMessageType,
        moreInfo?: TianyuShellUIHyperLink,
        troubleShot?: TianyuShellUIHyperLink,
    ): void {
        // auto closed message tip should not add hyper link
        if (MessageTipHelper.isAutoClose(type)) {
            return;
        }

        let moreButton: HTMLElement | null = null;
        let troubleButton: HTMLElement | null = null;
        if (moreInfo) {
            moreButton = MessageTipHelper.generateHyperLinkElement(moreInfo);
        }

        if (troubleShot) {
            troubleButton = MessageTipHelper.generateHyperLinkElement(troubleShot);
        }

        if (moreButton || troubleButton) {
            const placeHoler = MessageTipHelper.generateHyperLinkElement({
                key: "messageTip-placeHoler",
                message: MessageBundle.getText("TIANYU_UI_MESSAGE_MORE_INFOS"),
                link: () => {
                    moreButton && MessageTipHelper.displayLinker(moreButton);
                    troubleButton && MessageTipHelper.displayLinker(troubleButton);
                    MessageTipHelper.hiddenLinker(placeHoler);
                },
            });
            MessageTipHelper.displayLinker(placeHoler);

            element.appendChild(placeHoler);
            moreButton && element.appendChild(moreButton);
            troubleButton && element.appendChild(troubleButton);
        }
    }
    public static isAutoClose(type: TianyuShellUIMessageType): boolean {
        return (
            type === TianyuShellUIMessageType.INFO ||
            type === TianyuShellUIMessageType.SUCCESS ||
            type === TianyuShellUIMessageType.RELOAD
        );
    }

    private static generateHyperLinkElement(link: TianyuShellUIHyperLink): HTMLElement {
        const linkElement = document.createElement("div");
        linkElement.id = link.key;
        linkElement.innerText = link.message;
        linkElement.addEventListener("click", link.link);
        linkElement.classList.add(
            "tys_message_linker",
            "tys_common_user_no_seletion",
            "tys_message_linker_hidden",
            "tys_common_view_hidden",
        );

        return linkElement;
    }
    private static hiddenLinker(element: HTMLElement): void {
        element.classList.remove("tys_common_view_show");
        element.classList.add("tys_common_view_hidden");
    }
    private static displayLinker(element: HTMLElement): void {
        element.classList.remove("tys_common_view_hidden");
        element.classList.add("tys_common_view_show");
    }
}
