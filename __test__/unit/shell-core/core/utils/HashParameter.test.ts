/**@format */

import { MapOfString } from "@aitianyu.cn/types";
import { HashParameter } from "shell-core/src/core/utils/HashParameter";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.utils.HashParameter", () => {
    describe("parse", () => {
        it("normal param string", () => {
            const param = "test=1&a=b&c=true";

            const paramMap = HashParameter.parse(param);

            expect(Object.keys(paramMap).length).toBe(3);
            expect(paramMap["test"]).toEqual("1");
            expect(paramMap["a"]).toEqual("b");
            expect(paramMap["c"]).toEqual("true");
        });

        it("multi equals symbol string", () => {
            const param = "test=1+2=3&test2=2*3=6";

            const paramMap = HashParameter.parse(param);

            expect(Object.keys(paramMap).length).toBe(2);
            expect(paramMap["test"]).toEqual("1+2=3");
            expect(paramMap["test2"]).toEqual("2*3=6");
        });

        it("get param from window.location.hash", () => {
            window.location.hash = "?test=1&a=b&c=true";

            const paramMap = HashParameter.parse();

            expect(Object.keys(paramMap).length).toBe(3);
            expect(paramMap["test"]).toEqual("1");
            expect(paramMap["a"]).toEqual("b");
            expect(paramMap["c"]).toEqual("true");
        });
    });

    describe("stringify", () => {
        it("empty param", () => {
            const paramStr = HashParameter.stringify({});
            expect(paramStr).toEqual("");
        });

        it("non-empty param", () => {
            const paramMap: MapOfString = {
                test1: "true",
                test2: "1+2+3=6",
                test3: "a",
            };

            const paramStr = HashParameter.stringify(paramMap);
            expect(paramStr).toEqual("test1=true&test2=1+2+3=6&test3=a");
        });
    });

    describe("formate", () => {
        it("empty param", () => {
            const paramStr = HashParameter.format({});
            expect(paramStr).toEqual("");
        });

        it("non-empty param", () => {
            const paramMap: MapOfString = {
                test1: "true",
                test2: "1+2+3=6",
                test3: "a",
            };

            const paramStr = HashParameter.format(paramMap);
            expect(paramStr).toEqual("?test1=true&test2=1+2+3=6&test3=a");
        });
    });
});
