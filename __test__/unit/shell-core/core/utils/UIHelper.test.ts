/** @format */

import { getWindowWidth } from "shell-core/src/core/utils/UIHelper";
import * as UserAgent from "shell-core/src/core/utils/UserAgent";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.UIHelper", () => {
    describe("getWindowWidth", () => {
        beforeEach(() => {
            window.outerWidth = 500;
            window.innerWidth = 1500;
        });

        it("mobile", () => {
            jest.spyOn(UserAgent, "getIsMobile").mockReturnValue(true);
            expect(getWindowWidth()).toEqual(500);
        });

        it("not mobile", () => {
            jest.spyOn(UserAgent, "getIsMobile").mockReturnValue(false);
            expect(getWindowWidth()).toEqual(1500);
        });
    });
});
