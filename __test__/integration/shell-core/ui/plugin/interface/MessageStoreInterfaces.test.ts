/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
    TianyuShellUIMessageType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { updateMessageLayer } from "shell-core/src/ui/plugin/handler/MessageHandler";
import { MessageInterface } from "shell-core/src/ui/plugin/interface/MessageInterfaceExpose";
import { IMessagePostData } from "shell-core/src/ui/plugin/interface/state/MessageState";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

/** @format */
describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.MessageStoreInterface", () => {
    const TianyuStore = createMockedStore();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.MESSAGE_STORE_TYPE, MessageInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                MessageInterface.core.creator(getMessageInstanceId()),
                MessageInterface.control.init(getMessageInstanceId()),
            ]),
        );

        const layerId = TianyuStore.selecteWithThrow(MessageInterface.control.getId(getMessageInstanceId()));
        const div = document.createElement("div");
        div.id = layerId;

        document.body.appendChild(div);

        const messageHelper = TianyuStore.selecteWithThrow(MessageInterface.control.getHelper(getMessageInstanceId()));
        updateMessageLayer(div, messageHelper);
    });

    afterEach(async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(MessageInterface.control.lifecycle(getMessageInstanceId()));

        await destroyStore(TianyuStore);
    });

    it("vertical align", async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(
            MessageInterface.helper.setVerticalAlign(getMessageInstanceId(), ITianyuShellUIVerticalAlignment.TOP),
        );

        expect(TianyuStore.selecteWithThrow(MessageInterface.helper.getVerticalAlign(getMessageInstanceId()))).toEqual(
            ITianyuShellUIVerticalAlignment.TOP,
        );
    });

    it("vertical rate", async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(MessageInterface.helper.setVerticalRate(getMessageInstanceId(), 50));

        expect(TianyuStore.selecteWithThrow(MessageInterface.helper.getVerticalRate(getMessageInstanceId()))).toEqual(
            50,
        );
    });

    it("horizontal align", async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(
            MessageInterface.helper.setHorizontalAlign(getMessageInstanceId(), ITianyuShellUIHorizontalAlignment.RIGHT),
        );

        expect(
            TianyuStore.selecteWithThrow(MessageInterface.helper.getHorizontalAlign(getMessageInstanceId())),
        ).toEqual(ITianyuShellUIHorizontalAlignment.RIGHT);
    });

    it("horizontal rate", async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(MessageInterface.helper.setHorizontalRate(getMessageInstanceId(), 50));

        expect(TianyuStore.selecteWithThrow(MessageInterface.helper.getHorizontalRate(getMessageInstanceId()))).toEqual(
            50,
        );
    });

    it("timestamp", async () => {
        const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

        await TianyuStore.dispatch(MessageInterface.helper.setTimestamp(getMessageInstanceId(), 50));

        expect(TianyuStore.selecteWithThrow(MessageInterface.helper.getTimestamp(getMessageInstanceId()))).toEqual(50);
    });

    describe("message lifecycle", () => {
        it("post message - 1", async () => {
            const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            expect(TianyuStore.selecteWithThrow(MessageInterface.control.allMessages(getMessageInstanceId()))).toEqual(
                {},
            );

            const message: IMessagePostData = {
                type: TianyuShellUIMessageType.ERROR,
                code: "1000",
                message: "test message",
                title: "test",
                moreInfo: {
                    link: () => undefined,
                    key: "moreInfo",
                    message: "more information",
                },
                troubleShot: {
                    link: () => undefined,
                    key: "troubleShot",
                    message: "trouble shotting",
                },
            };
            await TianyuStore.dispatch(MessageInterface.message.post(getMessageInstanceId(), message));

            const openMessages1 = TianyuStore.selecteWithThrow(
                MessageInterface.control.allMessages(getMessageInstanceId()),
            );
            const openMessageKeys = Object.keys(openMessages1);
            expect(TianyuStore.selecteWithThrow(MessageInterface.message.count(getMessageInstanceId()))).toEqual(1);

            const linkerId = TianyuStore.selecteWithThrow(
                MessageInterface.message.getLinkId(getMessageInstanceId(), openMessageKeys[0]),
            );
            const linkInfo = TianyuStore.selecteWithThrow(
                MessageInterface.message.getLink(getMessageInstanceId(), linkerId),
            );
            expect(linkInfo.moreInfo).toBeDefined();
            expect(linkInfo.troubleShot).toBeDefined();

            const messageInfo = TianyuStore.selecteWithThrow(
                MessageInterface.message.getMessageState(getMessageInstanceId(), openMessageKeys[0]),
            );
            expect(messageInfo?.code).toEqual("1000");
            expect(messageInfo?.link).toEqual(linkerId);

            // close
            await TianyuStore.dispatch(MessageInterface.message.close(getMessageInstanceId(), openMessageKeys[0]));

            expect(
                TianyuStore.selecteWithThrow(
                    MessageInterface.message.isOpen(getMessageInstanceId(), openMessageKeys[0]),
                ),
            ).toBeFalsy();
        });

        it("post message - 2", async () => {
            const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            expect(TianyuStore.selecteWithThrow(MessageInterface.control.allMessages(getMessageInstanceId()))).toEqual(
                {},
            );

            const message: IMessagePostData = {
                type: TianyuShellUIMessageType.ERROR,
                code: "1000",
                message: "test message",
                title: "test",
                troubleShot: {
                    link: () => undefined,
                    key: "troubleShot",
                    message: "trouble shotting",
                },
            };
            await TianyuStore.dispatch(MessageInterface.message.post(getMessageInstanceId(), message));

            const openMessages1 = TianyuStore.selecteWithThrow(
                MessageInterface.control.allMessages(getMessageInstanceId()),
            );
            const openMessageKeys = Object.keys(openMessages1);
            expect(TianyuStore.selecteWithThrow(MessageInterface.message.count(getMessageInstanceId()))).toEqual(1);

            await TianyuStore.dispatch(MessageInterface.message.close(getMessageInstanceId(), openMessageKeys[0]));

            expect(
                TianyuStore.selecteWithThrow(
                    MessageInterface.message.isOpen(getMessageInstanceId(), openMessageKeys[0]),
                ),
            ).toBeFalsy();
        });

        it("post message - 3", async () => {
            const { getMessageInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            expect(TianyuStore.selecteWithThrow(MessageInterface.control.allMessages(getMessageInstanceId()))).toEqual(
                {},
            );

            const message: IMessagePostData = {
                type: TianyuShellUIMessageType.ERROR,
                code: "1000",
                message: "test message",
                title: "test",
            };
            await TianyuStore.dispatch(MessageInterface.message.post(getMessageInstanceId(), message));

            const openMessages1 = TianyuStore.selecteWithThrow(
                MessageInterface.control.allMessages(getMessageInstanceId()),
            );
            const openMessageKeys = Object.keys(openMessages1);
            expect(TianyuStore.selecteWithThrow(MessageInterface.message.count(getMessageInstanceId()))).toEqual(1);

            const linkerId = TianyuStore.selecteWithThrow(
                MessageInterface.message.getLinkId(getMessageInstanceId(), openMessageKeys[0]),
            );
            expect(linkerId).toEqual("");
            const linkInfo = TianyuStore.selecteWithThrow(
                MessageInterface.message.getLink(getMessageInstanceId(), linkerId),
            );
            expect(linkInfo).toEqual({});

            // close
            await TianyuStore.dispatch(MessageInterface.message.close(getMessageInstanceId(), openMessageKeys[0]));

            expect(
                TianyuStore.selecteWithThrow(
                    MessageInterface.message.isOpen(getMessageInstanceId(), openMessageKeys[0]),
                ),
            ).toBeFalsy();
        });
    });
});
