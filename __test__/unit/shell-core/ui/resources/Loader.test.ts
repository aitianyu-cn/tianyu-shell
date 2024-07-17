/** @format */

import { staticLoader } from "shell-core/src/ui/resources/Loader";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.resources.Loader", () => {
    it("staticLoader", () => {
        jest.spyOn(window.document.head, "appendChild").mockImplementation();

        staticLoader();

        expect(window.document.head.appendChild).toHaveBeenCalledTimes(2);
    });
});
