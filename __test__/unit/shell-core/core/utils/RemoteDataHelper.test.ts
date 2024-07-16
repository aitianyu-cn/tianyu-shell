/** @format */

import { FetchFileLoader } from "@aitianyu.cn/client-base";
import { fetchData } from "shell-core/src/core/utils/RemoteDataHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.utils.RemoteDataHelper", () => {
    describe("fetchData", () => {
        it("fench data success", async () => {
            jest.spyOn(FetchFileLoader.prototype, "openAsync").mockReturnValue(Promise.resolve({}));
            const data = await fetchData("");
            expect(data).toBeDefined();
        });

        it("fench data success with undefined", async () => {
            jest.spyOn(FetchFileLoader.prototype, "openAsync").mockReturnValue(Promise.resolve(undefined));
            const data = await fetchData("");
            expect(data).toBeNull();
        });

        it("fench data failed", async () => {
            jest.spyOn(FetchFileLoader.prototype, "openAsync").mockImplementation(async () => {
                throw new Error();
            });
            const data = await fetchData("");
            expect(data).toBeNull();
        });
    });
});
