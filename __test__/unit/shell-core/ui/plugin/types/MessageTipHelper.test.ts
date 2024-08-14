/** @format */

import { TianyuShellUIMessageType } from "shell-core/src/core/declares/ui/UserInterface";
import { MessageTipHelper } from "shell-core/src/ui/plugin/types/MessageTipHelper";
import { expectDebugger } from "test/env/TestHookExpection";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.types.MessageTipHelper", () => {
    describe("MessageTipHelper", () => {
        it("processBasicStyles", () => {
            const div = document.createElement("div");

            MessageTipHelper.processBasicStyles(div);

            expect(div.classList.contains("tys_message_view_baisc_styling")).toBeTruthy();
        });

        describe("processBackground", () => {
            it("fatal", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.FATAL);

                expectDebugger().toHaveBeenCalledWith("process background: fatal");
            });

            it("error", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.ERROR);

                expectDebugger().toHaveBeenCalledWith("process background: error");
            });

            it("warning", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.WARNING);

                expectDebugger().toHaveBeenCalledWith("process background: warning");
            });

            it("success", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.SUCCESS);

                expectDebugger().toHaveBeenCalledWith("process background: success");
            });

            it("reload", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.RELOAD);

                expectDebugger().toHaveBeenCalledWith("process background: reload");
            });

            it("default", () => {
                const div = document.createElement("div");

                MessageTipHelper.processBackground(div, TianyuShellUIMessageType.INFO);

                expectDebugger().toHaveBeenCalledWith("process background: default");
            });
        });

        describe("processFrontColor", () => {
            it("fatal", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.FATAL);

                expectDebugger().toHaveBeenCalledWith("process front color: fatal");
            });

            it("error", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.ERROR);

                expectDebugger().toHaveBeenCalledWith("process front color: error");
            });

            it("warning", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.WARNING);

                expectDebugger().toHaveBeenCalledWith("process front color: warning");
            });

            it("success", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.SUCCESS);

                expectDebugger().toHaveBeenCalledWith("process front color: success");
            });

            it("reload", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.RELOAD);

                expectDebugger().toHaveBeenCalledWith("process front color: reload");
            });

            it("default", () => {
                const div = document.createElement("div");

                MessageTipHelper.processFrontColor(div, TianyuShellUIMessageType.INFO);

                expectDebugger().toHaveBeenCalledWith("process front color: default");
            });
        });

        describe("processCloseButton", () => {
            it("is auto close type", () => {
                const div = document.createElement("div");

                jest.spyOn(div, "appendChild");

                MessageTipHelper.processCloseButton(div, TianyuShellUIMessageType.INFO, () => {});

                expect(div.appendChild).not.toHaveBeenCalled();
            });

            it("add close button", () => {
                const div = document.createElement("div");

                jest.spyOn(div, "appendChild");

                MessageTipHelper.processCloseButton(div, TianyuShellUIMessageType.ERROR, () => {});

                expect(div.appendChild).toHaveBeenCalled();
            });
        });

        it("processContent", () => {
            const div = document.createElement("div");

            jest.spyOn(div, "appendChild");

            MessageTipHelper.processContent(div, "test-innerText");

            expect(div.appendChild).toHaveBeenCalled();
        });

        describe("processHyperLink", () => {
            it("is auto close type", () => {
                const div = document.createElement("div");

                jest.spyOn(div, "appendChild");

                MessageTipHelper.processHyperLink(div, TianyuShellUIMessageType.INFO);

                expect(div.appendChild).not.toHaveBeenCalled();
            });

            it("add hyper link", () => {
                const div = document.createElement("div");

                jest.spyOn(div, "appendChild");

                MessageTipHelper.processHyperLink(
                    div,
                    TianyuShellUIMessageType.ERROR,
                    {
                        key: "moreInfo",
                        message: "moreInfo",
                        link: () => {},
                    },
                    {
                        key: "troubleShot",
                        message: "troubleShot",
                        link: () => {},
                    },
                );

                expect(div.appendChild).toHaveBeenCalled();

                const placeHoler = (div.children as any)["messageTip-placeHoler"] as HTMLElement;
                const moreButton = (div.children as any)["moreInfo"] as HTMLElement;
                const troubleButton = (div.children as any)["troubleShot"] as HTMLElement;

                expect(placeHoler.classList.contains("tys_common_view_show")).toBeTruthy();
                expect(moreButton.classList.contains("tys_common_view_hidden")).toBeTruthy();
                expect(troubleButton.classList.contains("tys_common_view_hidden")).toBeTruthy();

                placeHoler.click();

                expect(placeHoler.classList.contains("tys_common_view_hidden")).toBeTruthy();
                expect(moreButton.classList.contains("tys_common_view_show")).toBeTruthy();
                expect(troubleButton.classList.contains("tys_common_view_show")).toBeTruthy();
            });
        });

        it("isAutoClose", () => {
            expect(MessageTipHelper.isAutoClose(TianyuShellUIMessageType.INFO)).toBeTruthy();
            expect(MessageTipHelper.isAutoClose(TianyuShellUIMessageType.SUCCESS)).toBeTruthy();
            expect(MessageTipHelper.isAutoClose(TianyuShellUIMessageType.RELOAD)).toBeTruthy();
            expect(MessageTipHelper.isAutoClose(TianyuShellUIMessageType.ERROR)).toBeFalsy();
        });
    });
});
