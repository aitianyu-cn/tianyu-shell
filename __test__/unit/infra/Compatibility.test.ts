/** @format */

import { themeList, languageDef } from "infra/Compatibility";

describe("aitianyu-cn.node-module.tianyu-shell.infra.Compatibility", () => {
    it("themeList", () => {
        expect(themeList()).toEqual(["tianyu-default", "tianyu-green", "tianyu-mono", "tianyu-purple", "tianyu-red"]);
    });

    it("languageDef", () => {
        expect(languageDef()).toEqual({ support: ["zh_CN", "en_US"], pending: [] });
    });
});
