/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
    TianyuShellUIHyperLink,
    TianyuShellUIMessageType,
} from "shell-core/src/core/declares/ui/UserInterface";
import {
    MESSAGE_DEFAULT_HORIZONTAL_RATE,
    MESSAGE_DEFAULT_VERTICAL_RATE,
    MESSAGE_DEFAULT_TIMESTAMP,
} from "../../types/MessageTypes";

export interface IMessageState extends IterableType {
    helper: IMessageHelper;
    messages: {
        [id: string]: IMessageTipState;
    };
}

export interface IMessageHelper extends IterableType {
    align: {
        horizontal: ITianyuShellUIHorizontalAlignment;
        vertical: ITianyuShellUIVerticalAlignment;
    };
    rate: {
        horizontal: number;
        vertical: number;
    };
    timestamp: number;
    layerId: string;
}

export const DEFAULT_MESSAGE_HELPER: IMessageHelper = {
    align: {
        horizontal: ITianyuShellUIHorizontalAlignment.CENTER,
        vertical: ITianyuShellUIVerticalAlignment.BOTTOM,
    },
    rate: {
        horizontal: MESSAGE_DEFAULT_HORIZONTAL_RATE,
        vertical: MESSAGE_DEFAULT_VERTICAL_RATE,
    },
    timestamp: MESSAGE_DEFAULT_TIMESTAMP,
    layerId: "",
};

export interface IMessageTipState extends IterableType {
    type: TianyuShellUIMessageType;
    code: string;
    message: string;
    title: string;
    detail: string[];
    timestamp: number;
    unread: boolean;
    isTechError: boolean;
    link: string;
}

export interface IMessagePostData {
    type: TianyuShellUIMessageType;
    code: string;
    message: string;
    title: string;
    detail?: string[];
    isTech?: boolean;
    moreInfo?: TianyuShellUIHyperLink | undefined;
    troubleShot?: TianyuShellUIHyperLink | undefined;
}

export interface IMessageInfoLink {
    moreInfo?: TianyuShellUIHyperLink | undefined;
    troubleShot?: TianyuShellUIHyperLink | undefined;
}

export const MESSAGE_LINKER_MAP = "message-infolink-map";

export const DEFAULT_MESSAGE_TIP: IMessageTipState = {
    type: TianyuShellUIMessageType.INFO,
    code: "",
    message: "",
    title: "",
    detail: [],
    timestamp: 0,
    unread: false,
    isTechError: false,
    link: "",
};
