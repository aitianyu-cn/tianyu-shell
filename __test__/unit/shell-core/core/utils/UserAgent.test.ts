/** @format */

import { getIsIOS, getIsMacOS, getIsMobile } from "shell-core/src/core/utils/UserAgent";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.UserAgent", () => {
    const oldNavigator = global.navigator;

    afterEach(() => {
        global.navigator = oldNavigator;
    });

    describe("getIsMobile", () => {
        const fnGnerateMobile = (match: string, result?: boolean) => {
            Object.defineProperty(window, "navigator", {
                configurable: true,
                writable: true,
                value: { userAgent: match },
            });
            expect(getIsMobile() || result).toBeTruthy();
        };

        it("userAgentData mobile", () => {
            (navigator as any).userAgentData = {
                mobile: true,
            };

            expect(getIsMobile()).toBeTruthy();
        });

        it("ipad", () => fnGnerateMobile("ipad"));
        it("iphone os", () => fnGnerateMobile("iphone os"));
        it("midp", () => fnGnerateMobile("midp"));
        it("rv:1.2.3.4", () => fnGnerateMobile("rv:1.2.3.4"));
        it("ucweb", () => fnGnerateMobile("ucweb"));
        it("android", () => fnGnerateMobile("android"));
        it("windows ce", () => fnGnerateMobile("windows ce"));
        it("windows mobile", () => fnGnerateMobile("windows mobile"));
        it("windows", () => fnGnerateMobile("windows", true));
    });

    describe("getIsIOS", () => {
        const fnGnerateIOS = (match: string, result?: boolean) => {
            Object.defineProperty(window, "navigator", {
                configurable: true,
                writable: true,
                value: { userAgent: match },
            });
            expect(getIsIOS() || result).toBeTruthy();
        };

        it("ipad", () => fnGnerateIOS("ipad"));
        it("iphone os", () => fnGnerateIOS("iphone os"));
        it("windows", () => fnGnerateIOS("windows", true));
    });

    describe("getIsMacOS", () => {
        const fnGnerateMacOS = (match: string, result?: boolean) => {
            Object.defineProperty(window, "navigator", {
                configurable: true,
                writable: true,
                value: { userAgent: match },
            });
            expect(getIsMacOS() || result).toBeTruthy();
        };

        it("mac os x", () => fnGnerateMacOS("mac os x"));
        it("windows", () => fnGnerateMacOS("windows", true));
    });
});
