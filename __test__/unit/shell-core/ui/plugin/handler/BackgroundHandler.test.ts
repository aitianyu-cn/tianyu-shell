/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { initLayout } from "shell-core/src/ui/plugin/handler/BackgroundHandler";
import { BackgroundInterface } from "shell-core/src/ui/plugin/interface/BackgroundInterfaceExpose";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.handler.BackgroundHandler", () => {
    describe("initLayout", () => {
        it("could not get id and color from store", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
                const div = node as HTMLDivElement;
                expect(div.id).toEqual("");
                expect(div.style.background).toEqual("rgb(255, 255, 255)");
                return node;
            });

            initLayout();
        });

        it("could not get id and color from store", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                if (selector.selector === BackgroundInterface.control.getId.info.fullName) {
                    return "1234567890";
                }
                if (selector.selector === BackgroundInterface.color.get.info.fullName) {
                    return "red";
                }

                return new Missing();
            });
            jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
                const div = node as HTMLDivElement;
                expect(div.id).toEqual("1234567890");
                expect(div.style.background).toEqual("red");
                return node;
            });

            initLayout();
        });
    });
});
