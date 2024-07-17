/** @format */

import { GlobalStyling } from "shell-core/src/ui/utils/Styling";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.utils.Styling", () => {
    describe("GlobalStyling", () => {
        it("getStyleElement", () => {
            jest.spyOn(window.document.head, "appendChild").mockImplementation();
            jest.spyOn(window.document.head, "getElementsByTagName").mockReturnValue([] as any);
            jest.spyOn(window.document, "createElement");

            GlobalStyling.getStyleElement();

            expect(window.document.createElement).toHaveBeenCalled();
            expect(window.document.head.appendChild).toHaveBeenCalled();
        });

        it("insertStylingSheet", () => {
            const stylingElem = window.document.createElement("style");
            jest.spyOn(GlobalStyling, "getStyleElement").mockReturnValue(stylingElem);

            const data = {
                index: 0,
                list: {} as Record<number, string>,
            };
            const fnInsert = (rule: string) => {
                const index = data.index++;
                data.list[index] = rule;
                return index;
            };
            Object.defineProperty(stylingElem, "sheet", {
                configurable: true,
                writable: true,
                value: { insertRule: fnInsert },
            });

            const stylings: Record<string, string> = {
                s1: "s1",
                s2: "s2",
                s3: "s3",
                s4: "s4",
            };
            const sheetIndexs = GlobalStyling.insertStylingSheet(stylings);
            for (const key of Object.keys(sheetIndexs)) {
                expect(sheetIndexs[key]).toBeDefined();
                const index = sheetIndexs[key];
                if (index !== undefined) {
                    expect(stylings[key]).toEqual(data.list[index]);
                }
            }
        });

        it("removeStylingSheet", () => {
            const stylingElem = window.document.createElement("style");
            jest.spyOn(GlobalStyling, "getStyleElement").mockReturnValue(stylingElem);

            const data = {
                index: 0,
                list: {} as Record<number, string>,
            };
            const fnInsert = (rule: string) => {
                const index = data.index++;
                data.list[index] = rule;
                return index;
            };
            const fnRemove = (index: number) => {
                if (data.list[index] !== undefined) {
                    delete data.list[index];
                }
            };
            Object.defineProperty(stylingElem, "sheet", {
                configurable: true,
                writable: true,
                value: {
                    insertRule: fnInsert,
                    deleteRule: fnRemove,
                },
            });

            const stylings: Record<string, string> = {
                s1: "s1",
                s2: "s2",
                s3: "s3",
                s4: "s4",
            };
            const sheetIndexs = GlobalStyling.insertStylingSheet(stylings);
            for (const key of Object.keys(sheetIndexs)) {
                expect(sheetIndexs[key]).toBeDefined();
                const index = sheetIndexs[key];
                if (index !== undefined) {
                    expect(stylings[key]).toEqual(data.list[index]);
                }
            }

            GlobalStyling.removeStylingSheet({
                s1: 0,
                s2: 1,
            });
            expect(data.list[0]).toBeUndefined();
            expect(data.list[1]).toBeUndefined();
            expect(data.list[2]).toBeDefined();
            expect(data.list[3]).toBeDefined();
        });
    });
});
