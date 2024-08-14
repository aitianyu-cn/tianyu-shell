/** @format */

import { MajorTianyuUI } from "shell-core/src/ui/plugin/types/MajorTianyuUI";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.types.MajorTianyuUI", () => {
    describe("MajorTianyuUI", () => {
        it("given id", () => {
            const tianyuUI = new MajorTianyuUI("div", "test_id");

            expect(tianyuUI.id).toEqual("test_id");
        });

        it("empty id", () => {
            const tianyuUI = new MajorTianyuUI("div");

            expect(tianyuUI.id).not.toEqual("");
        });
    });
});
