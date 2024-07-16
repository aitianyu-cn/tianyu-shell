/** @format */

import { captureNameGenerator, download } from "shell-core/src/core/plugin/helper/CaptureHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.helper.CaptureHelper", () => {
    describe("captureNameGenerator", () => {
        it("get name with cound: 0", () => {
            expect(captureNameGenerator("test", "t", 0)).toEqual("test - t");
        });

        it("get name with cound: 1", () => {
            expect(captureNameGenerator("test", "t", 1)).toEqual("test - t (1)");
        });
    });

    describe("download", () => {
        const { Blob } = require("blob-polyfill");
        const oldBlob = global.Blob;
        // const oldURL = global.URL;

        beforeEach(() => {
            global.Blob = Blob;
            // global.URL = new URL("http://localhost");
        });

        afterEach(() => {
            global.Blob = oldBlob;
            // global.URL = oldURL;
        });

        it("download data", () => {
            jest.spyOn(HTMLAnchorElement.prototype, "click");
            global.URL.createObjectURL = jest.fn();
            download("t1", -1, []);
            expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
        });
    });
});
