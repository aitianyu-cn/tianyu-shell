/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { DEFAULT_MESSAGE_HELPER, IMessageTipState } from "shell-core/src/ui/plugin/interface/state/MessageState";
import { expectDebugger } from "test/env/TestHookExpection";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.listener.MessageListener", () => {
    describe("LayerSettingListener", () => {
        it("layer id not valid", async () => {
            const { LayerSettingListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            jest.spyOn(document, "getElementById");
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());

            LayerSettingListener.listener(undefined, DEFAULT_MESSAGE_HELPER);

            expect(document.getElementById).not.toHaveBeenCalled();
        });

        it("layer not found", async () => {
            const MessageHandler = await import("shell-core/src/ui/plugin/handler/MessageHandler");
            const { LayerSettingListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            jest.spyOn(MessageHandler, "updateMessageLayer");
            jest.spyOn(document, "getElementById").mockReturnValue(null);

            LayerSettingListener.listener(undefined, DEFAULT_MESSAGE_HELPER);

            expect(document.getElementById).toHaveBeenCalled();
            expect(MessageHandler.updateMessageLayer).not.toHaveBeenCalled();
        });

        it("update layer", async () => {
            const MessageHandler = await import("shell-core/src/ui/plugin/handler/MessageHandler");
            const { LayerSettingListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            const div = document.createElement("div");

            jest.spyOn(MessageHandler, "updateMessageLayer").mockImplementation();
            jest.spyOn(document, "getElementById").mockReturnValue(div);

            LayerSettingListener.listener(undefined, DEFAULT_MESSAGE_HELPER);

            expect(document.getElementById).toHaveBeenCalled();
            expect(MessageHandler.updateMessageLayer).toHaveBeenCalled();
        });

        it("not have new state, old is same as default", async () => {
            const { LayerSettingListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            jest.spyOn(getStore(), "selecte");

            LayerSettingListener.listener(DEFAULT_MESSAGE_HELPER, undefined);

            expect(getStore().selecte).not.toHaveBeenCalled();
        });

        it("not have new state, old is different with default", async () => {
            const MessageHandler = await import("shell-core/src/ui/plugin/handler/MessageHandler");
            const { LayerSettingListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            const div = document.createElement("div");

            jest.spyOn(MessageHandler, "updateMessageLayer").mockImplementation();
            jest.spyOn(document, "getElementById").mockReturnValue(div);

            LayerSettingListener.listener(undefined, undefined);

            expect(document.getElementById).toHaveBeenCalled();
            expect(MessageHandler.updateMessageLayer).toHaveBeenCalled();
        });
    });

    describe("MessagePostListener", () => {
        it("layer id is invalid", async () => {
            const { MessagePostListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
            jest.spyOn(document, "getElementById");

            MessagePostListener.listener(undefined, undefined);

            expect(document.getElementById).not.toHaveBeenCalled();
        });

        it("message layer is not found", async () => {
            const { MessagePostListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            jest.spyOn(document, "getElementById").mockReturnValue(null);

            MessagePostListener.listener(undefined, undefined);

            expectDebugger().toHaveBeenCalledWith("message layer is invalid");
        });

        it("post message", async () => {
            const oldMessages: MapOfType<IMessageTipState> = {
                "1000": {
                    type: TianyuShellUIMessageType.ERROR,
                    code: "1000",
                    message: "message 1000",
                    title: "title 1000",
                    detail: [],
                    timestamp: 3000,
                    unread: true,
                    isTechError: false,
                    link: "",
                },
            };
            const newMessages: MapOfType<IMessageTipState> = {
                "1000": {
                    type: TianyuShellUIMessageType.ERROR,
                    code: "1000",
                    message: "message 1000",
                    title: "title 1000",
                    detail: [],
                    timestamp: 3000,
                    unread: true,
                    isTechError: false,
                    link: "",
                },
                "1001": {
                    type: TianyuShellUIMessageType.ERROR,
                    code: "1001",
                    message: "message 1001",
                    title: "title 1001",
                    detail: [],
                    timestamp: 3000,
                    unread: true,
                    isTechError: false,
                    link: "",
                },
            };
            const { MessagePostListener } = await import("shell-core/src/ui/plugin/listener/MessageListener");

            const div = document.createElement("div");

            jest.spyOn(div, "appendChild");
            jest.spyOn(document, "getElementById").mockReturnValue(div);

            MessagePostListener.listener(oldMessages, newMessages);

            expect(div.appendChild).toHaveBeenCalledTimes(1);
        });
    });
});
