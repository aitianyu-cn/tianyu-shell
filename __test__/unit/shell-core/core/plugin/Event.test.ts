/** @format */

import { Event } from "shell-core/src/core/plugin/Event";
import { TianyuShellCoreInterfaceExpose } from "shell-core/src/core/utils/CoreInterfaceExpose";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Event", () => {
    it("listenLoaded", (done) => {
        jest.spyOn(getStore(), "subscribe").mockImplementation((selector) => {
            expect(selector.selector).toEqual(TianyuShellCoreInterfaceExpose.event.select.isLoaded.info.fullName);
            done();
            return () => undefined;
        });
        Event.listenLoaded(() => undefined);
    });

    it("listenHashChanged", (done) => {
        jest.spyOn(getStore(), "subscribe").mockImplementation((selector) => {
            expect(selector.selector).toEqual(TianyuShellCoreInterfaceExpose.event.select.getHash.info.fullName);
            done();
            return () => undefined;
        });
        Event.listenHashChanged(() => undefined);
    });

    it("listenPageResize", (done) => {
        jest.spyOn(getStore(), "subscribe").mockImplementation((selector) => {
            expect(selector.selector).toEqual(TianyuShellCoreInterfaceExpose.event.select.getPageSize.info.fullName);
            done();
            return () => undefined;
        });
        Event.listenPageResize(() => undefined);
    });
});
