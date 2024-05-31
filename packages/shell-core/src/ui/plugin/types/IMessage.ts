/**@format */

import { TianyuShellUIHyperLink, TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";

export interface IMessage {
    id: string;
    type: TianyuShellUIMessageType;
    code: string;
    message: string;
    title: string;
    detail: string[];
    timestamp: number;
    isTechError: boolean;
    moreInfo?: TianyuShellUIHyperLink;
    troubleShot?: TianyuShellUIHyperLink;
}
