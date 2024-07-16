/** @format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { getHistroySupportedIns, getInstanceId, getNoHisSupportedIns, getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.Store", () => {
    describe("getStore", () => {
        it("success", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            expect(getStore()).toBeDefined();
        });

        it("failed", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            const oldStore = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
            (window as any).tianyuShell.runtime.store = undefined;

            expect(getStore).toThrow("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");

            (window as any).tianyuShell.runtime.store = oldStore;
        });
    });

    describe("getInstanceId", () => {
        it("success", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            expect(getInstanceId()).toBeDefined();
        });

        it("failed", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            const oldStore = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
            (window as any).tianyuShell.runtime.store = undefined;

            expect(getInstanceId).toThrow("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");

            (window as any).tianyuShell.runtime.store = oldStore;
        });
    });

    describe("getHistroySupportedIns", () => {
        it("success", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            expect(getHistroySupportedIns()).toBeDefined();
        });

        it("failed", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            const oldStore = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
            (window as any).tianyuShell.runtime.store = undefined;

            expect(getHistroySupportedIns).toThrow("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");

            (window as any).tianyuShell.runtime.store = oldStore;
        });
    });

    describe("getNoHisSupportedIns", () => {
        it("success", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            expect(getNoHisSupportedIns()).toBeDefined();
        });

        it("failed", () => {
            expect(((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store).toBeDefined();
            const oldStore = ((window as any)?.tianyuShell as ITianyuShell)?.runtime?.store;
            (window as any).tianyuShell.runtime.store = undefined;

            expect(getNoHisSupportedIns).toThrow("[Error] Tianyu Shell infra exception: Tianyu Store is not valid.");

            (window as any).tianyuShell.runtime.store = oldStore;
        });
    });
});
