/** @format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { StyleHelper } from "shell-core/src/ui/resources/StyleHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.resources.StyleHelper", () => {
    const styles: TianyuUIStyleDeclaration[] = [
        {
            width: "1000px",
            height: "100px",
        },
        {
            backgroundColor: "white",
        },
        {
            height: "200px",
        },
    ];

    it("merge", () => {
        const mergedStyle = StyleHelper.merge(...styles);

        expect(Object.keys(mergedStyle).length).toEqual(3);
        expect(mergedStyle.width).toEqual("1000px");
        expect(mergedStyle.height).toEqual("200px");
        expect(mergedStyle.backgroundColor).toEqual("white");
    });

    it("insert", () => {
        const source: TianyuUIStyleDeclaration = {
            color: "#123456",
        };

        const target = StyleHelper.insert(source, ...styles);

        expect(Object.keys(target).length).toEqual(4);
        expect(target.width).toEqual("1000px");
        expect(target.height).toEqual("200px");
        expect(target.backgroundColor).toEqual("white");
        expect(target.color).toEqual("#123456");
    });

    it("set", () => {
        const element = document.createElement("div");
        const style = StyleHelper.merge(...styles);

        StyleHelper.set(element, style);

        expect(element.style.width).toEqual("1000px");
        expect(element.style.height).toEqual("200px");
        expect(element.style.backgroundColor).toEqual("white");
    });
});
