/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import {
    ITianyuShellUIHorizontalAlignment,
    ITianyuShellUIVerticalAlignment,
    TianyuShellUIMessageType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { MessageGlobalAPIs } from "shell-core/src/ui/plugin/apis/MessageAPIs";
import { MessageInterface } from "shell-core/src/ui/plugin/interface/MessageInterfaceExpose";
import { DEFAULT_MESSAGE_HELPER } from "shell-core/src/ui/plugin/interface/state/MessageState";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.apis.MessageAPIs", () => {
    describe("messageHelperGlobalAPIs", () => {
        it("setVerticalAlign", (done) => {
            const align = ITianyuShellUIVerticalAlignment.CENTER;
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    MessageInterface.helper.setVerticalAlign.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual(align);

                done();
            });

            MessageGlobalAPIs.helper.setVerticalAlign(align);
        });

        it("setVerticalRate", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    MessageInterface.helper.setVerticalRate.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual(100);

                done();
            });

            MessageGlobalAPIs.helper.setVerticalRate(100);
        });

        it("setHorizontalAlign", (done) => {
            const align = ITianyuShellUIHorizontalAlignment.CENTER;
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    MessageInterface.helper.setHorizontalAlign.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual(align);

                done();
            });

            MessageGlobalAPIs.helper.setHorizontalAlign(align);
        });

        it("setHorizontalRate", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    MessageInterface.helper.setHorizontalRate.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual(100);

                done();
            });

            MessageGlobalAPIs.helper.setHorizontalRate(100);
        });

        it("setTimestamp", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(
                    MessageInterface.helper.setTimestamp.info.fullName,
                );
                expect((action as IInstanceAction<any>).params).toEqual(100);

                done();
            });

            MessageGlobalAPIs.helper.setTimestamp(100);
        });

        describe("getVerticalAlign", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.helper.getVerticalAlign()).toEqual(DEFAULT_MESSAGE_HELPER.align.vertical);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(ITianyuShellUIVerticalAlignment.BOTTOM);
                expect(MessageGlobalAPIs.helper.getVerticalAlign()).toEqual(ITianyuShellUIVerticalAlignment.BOTTOM);
            });
        });

        describe("getVerticalRate", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.helper.getVerticalRate()).toEqual(DEFAULT_MESSAGE_HELPER.rate.vertical);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(2000);
                expect(MessageGlobalAPIs.helper.getVerticalRate()).toEqual(2000);
            });
        });

        describe("getHorizontalAlign", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.helper.getHorizontalAlign()).toEqual(DEFAULT_MESSAGE_HELPER.align.horizontal);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(ITianyuShellUIHorizontalAlignment.CENTER);
                expect(MessageGlobalAPIs.helper.getHorizontalAlign()).toEqual(ITianyuShellUIHorizontalAlignment.CENTER);
            });
        });

        describe("getHorizontalRate", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.helper.getHorizontalRate()).toEqual(DEFAULT_MESSAGE_HELPER.rate.horizontal);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(2000);
                expect(MessageGlobalAPIs.helper.getHorizontalRate()).toEqual(2000);
            });
        });

        describe("getTimestamp", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.helper.getTimestamp()).toEqual(DEFAULT_MESSAGE_HELPER.timestamp);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(2000);
                expect(MessageGlobalAPIs.helper.getTimestamp()).toEqual(2000);
            });
        });
    });

    describe("MessageGlobalAPIs", () => {
        it("post", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(MessageInterface.message.post.info.fullName);

                done();
            });

            MessageGlobalAPIs.post(TianyuShellUIMessageType.INFO, "", "", "", []);
        });

        it("close", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction<any>).action).toEqual(MessageInterface.message.close.info.fullName);

                done();
            });

            MessageGlobalAPIs.close("");
        });

        describe("isOpen", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.isOpen("")).toEqual(false);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(true);
                expect(MessageGlobalAPIs.isOpen("")).toEqual(true);
            });
        });

        describe("count", () => {
            it("missing", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
                expect(MessageGlobalAPIs.count()).toEqual(0);
            });

            it("success", () => {
                jest.spyOn(getStore(), "selecte").mockReturnValue(10);
                expect(MessageGlobalAPIs.count()).toEqual(10);
            });
        });
    });
});
