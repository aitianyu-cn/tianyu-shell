/** @format */

import { TianyuUIStyleDeclaration, TianyuUIStyle } from "shell-core";
import { IStyleMap } from "shell-core/src/ui/plugin/interface/state/StylingState";
import { processPath } from "shell-core/src/ui/tools/TianyuStylingHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.tools.TianyuStylingHelper", () => {
    describe("processPath", () => {
        it("path not provided", () => {
            expect(processPath()).toEqual([]);
        });

        it("path all space", () => {
            expect(processPath("    ")).toEqual([]);
        });

        it("path with /", () => {
            expect(processPath("   / ")).toEqual([]);
        });

        it("get path", () => {
            expect(processPath("a/b/c")).toEqual(["a", "b", "c"]);
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
                                                styles: new Map<string, TianyuUIStyleDeclaration>(),
                                            },
                                        ],
                                    ]),
                                    styles: new Map<string, TianyuUIStyleDeclaration>(),
                                },
                            ],
                        ]),
                        styles: new Map<string, TianyuUIStyleDeclaration>(),
                    },
                ],
                ["e", { list: new Map<string, IStyleMap>(), styles: new Map<string, TianyuUIStyleDeclaration>() }],
            ]),
            styles: new Map<string, TianyuUIStyleDeclaration>(),
        };

        it("valid", () => {});
    });
});
