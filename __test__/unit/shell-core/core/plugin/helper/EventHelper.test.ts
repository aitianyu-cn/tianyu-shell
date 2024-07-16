/** @format */

import { IBatchAction, IInstanceAction } from "@aitianyu.cn/tianyu-store";
import { onLoaded } from "shell-core/src/core/plugin/helper/EventHelper";
import { TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";
import * as Runtime from "shell-core/src/core/plugin/Runtime";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.helper.EventHelper", () => {
    it("onLoaded", () => {
        jest.spyOn(getStore(), "dispatchForView").mockImplementation((action) => {
            const batchAction = action as IBatchAction;
            expect(batchAction.actions.length).toEqual(1);
            expect(batchAction.actions[0].action).toEqual(TianyuShellCoreInterface.event.action.onLoaded.info.fullName);
        });

        onLoaded();
    });

    it("onHashChanged", (done) => {
        window.location.hash = "#test";
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterface.event.action.onHaschange.info.fullName,
            );
            expect((action as IInstanceAction).params).toEqual("test");
            done();
        });
    });

    describe("onPageResized", () => {
        it("isMobile", (done) => {
            jest.spyOn(Runtime, "isMobile").mockReturnValue(true);
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.event.action.onPageResize.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual(100);
                done();
            });

            window.outerWidth = 1000;
            window.onresize?.({} as any);
            window.outerWidth = 100;
            window.onresize?.({} as any);
        });

        it("not mobile", (done) => {
            jest.spyOn(Runtime, "isMobile").mockReturnValue(false);
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.event.action.onPageResize.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual(100);
                done();
            });

            window.innerWidth = 1000;
            window.onresize?.({} as any);
            window.innerWidth = 100;
            window.onresize?.({} as any);
        });
    });
});
