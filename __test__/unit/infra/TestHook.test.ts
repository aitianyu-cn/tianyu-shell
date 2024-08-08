/** @format */

import { TestHook } from "infra/TestHook";

describe("aitianyu-cn.node-module.tianyu-shell.infra.TestHook", () => {
    describe("TestHook", () => {
        it("debugger", () => {
            expect(() => {
                TestHook.debugger();
            }).not.toThrow();
        });
    });
});
