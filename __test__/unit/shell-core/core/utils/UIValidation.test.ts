/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { getStore } from "shell-core/src/core/utils/Store";
import { UIValidation } from "shell-core/src/core/utils/UIValidation";
import * as Compatibility from "infra/Compatibility";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.UIValidation", () => {
    describe("validateTheme", () => {
        it("get from store is missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(new Missing());
            jest.spyOn(Compatibility, "themeList").mockReturnValue(["1", "2"]);
            expect(UIValidation.validateTheme("1")).toEqual("1");
            expect(UIValidation.validateTheme("3")).toEqual("");
        });

        it("get from store is missing", () => {
            jest.spyOn(getStore(), "selecte").mockReturnValue(["1", "2", "3"]);
            jest.spyOn(Compatibility, "themeList").mockReturnValue(["1", "2"]);
            expect(UIValidation.validateTheme("1")).toEqual("1");
            expect(UIValidation.validateTheme("3")).toEqual("3");
        });
    });
});
