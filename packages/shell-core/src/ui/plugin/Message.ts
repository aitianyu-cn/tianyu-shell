/**@format */

import { TianyuShellUIMessageType, TianyuShellUIHyperLink } from "../../core/declares/ui/UserInterface";
import { MessageBase } from "./Core";

/** Tianyu Shell UI Message Center */
export class Message {
    /**
     * Post a message
     *
     * @param type message type [ERROR, FATAL, WARNING, INFO, SUCCESS, RELOAD]
     * @param code message code to indicates the message
     * @param message message content
     * @param title message title for future using
     * @param detail message details for future using
     * @param isTech indicates the message is technical message or not
     * @param moreInfo hyper link to get more information
     * @param troubleShot hyper link for trouble shot
     *
     * @returns return the message id
     */
    public static post(
        type: TianyuShellUIMessageType,
        code: string,
        message: string,
        title: string,
        detail: string[],
        isTech?: boolean,
        moreInfo?: TianyuShellUIHyperLink | undefined,
        troubleShot?: TianyuShellUIHyperLink | undefined,
    ): string {
        return MessageBase().post(type, code, message, title, detail, isTech, moreInfo, troubleShot);
    }

    /**
     * To close a message
     *
     * @param id message id
     */
    public static close(id: string): void {
        MessageBase().close(id);
    }

    /**
     * Check the message is opened.
     *
     * @param id message id
     *
     * @returns return true if the message is opened, otherwise return false
     */
    public static isOpen(id: string): boolean {
        return MessageBase().isOpen(id);
    }

    /**
     * Get all messages count
     *
     * @returns return the messages count
     */
    public static count(): number {
        return MessageBase().count();
    }
}
