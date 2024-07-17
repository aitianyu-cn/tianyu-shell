/** @format */

import { MapOfType } from "@aitianyu.cn/types";
import { TianyuUIStyleDeclaration, TianyuUIStyle } from "shell-core";
import { IStyleMap } from "shell-core/src/ui/plugin/interface/state/StylingState";
import * as TianyuStylingHelper from "shell-core/src/ui/tools/TianyuStylingHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.tools.TianyuStylingHelper", () => {
    describe("processPath", () => {
        it("path not provided", () => {
            expect(TianyuStylingHelper.processPath()).toEqual([]);
        });

        it("path all space", () => {
            expect(TianyuStylingHelper.processPath("    ")).toEqual([]);
        });

        it("path with /", () => {
            expect(TianyuStylingHelper.processPath("   / ")).toEqual([]);
        });

        it("get path", () => {
            expect(TianyuStylingHelper.processPath("a/b/c")).toEqual(["a", "b", "c"]);
        });
    });

    describe("getStylingMapDirectly", () => {
        const stylingMap: IStyleMap = {
            list: new Map<string, IStyleMap>([
                [
                    "a",
                    {
                        list: new Map<string, IStyleMap>([
                            [
                                "b",
                                {
                                    list: new Map<string, IStyleMap>([
                                        [
                                            "c",
                                            {
                                                list: new Map<string, IStyleMap>(),
                                                styles: new Map<string, TianyuUIStyleDeclaration>([["c_style", {}]]),
                                            },
                                        ],
                                    ]),
                                    styles: new Map<string, TianyuUIStyleDeclaration>([["b_style", {}]]),
                                },
                            ],
                        ]),
                        styles: new Map<string, TianyuUIStyleDeclaration>([["a_style", {}]]),
                    },
                ],
                [
                    "e",
                    {
                        list: new Map<string, IStyleMap>(),
                        styles: new Map<string, TianyuUIStyleDeclaration>([["e_style", {}]]),
                    },
                ],
            ]),
            styles: new Map<string, TianyuUIStyleDeclaration>(),
        };

        it("valid", () => {
            const styleMap = TianyuStylingHelper.getStylingMapDirectly(stylingMap, ["a", "b", "c"]);
            expect(styleMap.valid).toBeTruthy();
            expect(styleMap.style.styles.has("c_style")).toBeTruthy();
        });

        it("invalid", () => {
            const styleMap = TianyuStylingHelper.getStylingMapDirectly(stylingMap, ["a", "b", "d"]);
            expect(styleMap.valid).toBeFalsy();
        });
    });

    describe("getStylingMap", () => {
        const stylingMapE: IStyleMap = {
            list: new Map<string, IStyleMap>(),
            styles: new Map<string, TianyuUIStyleDeclaration>([["e_style", {}]]),
        };
        const stylingMapD: IStyleMap = {
            list: new Map<string, IStyleMap>([["e", stylingMapE]]),
            styles: new Map<string, TianyuUIStyleDeclaration>([["d_style", {}]]),
        };
        const stylingMapC: IStyleMap = {
            list: new Map<string, IStyleMap>([["d", stylingMapD]]),
            styles: new Map<string, TianyuUIStyleDeclaration>([["c_style", {}]]),
        };

        const stylingMapB: IStyleMap = {
            list: new Map<string, IStyleMap>(),
            styles: new Map<string, TianyuUIStyleDeclaration>([["b_style", {}]]),
        };
        const stylingMapA: IStyleMap = {
            list: new Map<string, IStyleMap>([["b", stylingMapB]]),
            styles: new Map<string, TianyuUIStyleDeclaration>([["a_style", {}]]),
        };

        const stylingMap: IStyleMap = {
            list: new Map<string, IStyleMap>([
                ["a", stylingMapA],
                ["c", stylingMapC],
            ]),
            styles: new Map<string, TianyuUIStyleDeclaration>([["root_style", {}]]),
        };

        it("no key", () => {
            const map = TianyuStylingHelper.getStylingMap(stylingMap, "a");

            expect(map.valid).toBeTruthy();
            expect(map.style.styles.has("a_style")).toBeTruthy();
        });

        it("not deep search", () => {
            const map = TianyuStylingHelper.getStylingMap(stylingMap, "a", []);

            expect(map.valid).toBeTruthy();
            expect(map.style.styles.has("a_style")).toBeTruthy();
        });

        it("not styling list", () => {
            const map = TianyuStylingHelper.getStylingMap(stylingMap, "a", [], true);

            expect(map.valid).toBeTruthy();
            expect(map.style.styles.has("a_style")).toBeTruthy();
        });

        it("in styling list", () => {
            const stylings: MapOfType<TianyuUIStyleDeclaration[]> = {};
            TianyuStylingHelper.getStylingMap(stylingMap, "c/d/e", ["c_style", "d_style", "e_style"], true, stylings);

            expect(stylings["c_style"]).toBeDefined();
            expect(stylings["d_style"]).toBeDefined();
            expect(stylings["e_style"]).toBeDefined();

            expect(stylings["a_style"]).toBeUndefined();
            expect(stylings["b_style"]).toBeUndefined();
        });

        it("has path not exist", () => {
            const stylings: MapOfType<TianyuUIStyleDeclaration[]> = {};
            TianyuStylingHelper.getStylingMap(stylingMap, "c/d/f", ["c_style", "d_style", "e_style"], true, stylings);

            expect(stylings["c_style"]).toBeDefined();
            expect(stylings["d_style"]).toBeDefined();

            expect(stylings["e_style"]).toBeUndefined();
            expect(stylings["a_style"]).toBeUndefined();
            expect(stylings["b_style"]).toBeUndefined();
        });
    });
});
