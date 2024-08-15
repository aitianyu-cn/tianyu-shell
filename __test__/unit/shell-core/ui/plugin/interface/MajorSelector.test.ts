/** @format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import {
    _GetMajorClassInfo,
    _GetMajorStylingInfo,
    GetElementByClassName,
    GetElementById,
    GetElementByTagName,
} from "shell-core/src/ui/plugin/interface/selector/MajorSelector";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.interface.MajorSelector", () => {
    it("_GetMajorClassInfo", () => {
        const layer = {
            layerId: "id",
            layerRoot: null,
        };
        const classNames = ["c1", "c2"];
        const info = _GetMajorClassInfo.resultGenerator(layer, classNames);

        expect(info).toEqual({
            layer,
            classNames,
        });
    });

    it("_GetMajorStylingInfo", () => {
        const layer = {
            layerId: "id",
            layerRoot: null,
        };
        const stylings: TianyuUIStyleDeclaration = {
            width: "100px",
        };
        const info = _GetMajorStylingInfo.resultGenerator(layer, stylings);

        expect(info).toEqual({
            layer,
            stylings,
        });
    });

    describe("GetElementById", () => {
        it("has element", () => {
            jest.spyOn(document, "getElementById").mockReturnValue(document.createElement("div"));

            expect(GetElementById.getter({}, "test").length).toEqual(1);
        });

        it("no element", () => {
            expect(GetElementById.getter({}, "test").length).toEqual(0);
        });
    });

    it("GetElementByClassName", () => {
        const div = document.createElement("div");
        div.appendChild(document.createElement("p"));
        div.appendChild(document.createElement("p"));
        div.appendChild(document.createElement("p"));

        jest.spyOn(document, "getElementsByClassName").mockReturnValue(div.getElementsByTagName("p"));

        expect(GetElementByClassName.getter({}, "p").length).toEqual(3);
    });

    it("GetElementByTagName", () => {
        const div = document.createElement("div");
        div.appendChild(document.createElement("p"));
        div.appendChild(document.createElement("p"));
        div.appendChild(document.createElement("p"));

        jest.spyOn(document, "getElementsByTagName").mockReturnValue(div.getElementsByTagName("p"));

        expect(GetElementByTagName.getter({}, "p").length).toEqual(3);
    });
});
