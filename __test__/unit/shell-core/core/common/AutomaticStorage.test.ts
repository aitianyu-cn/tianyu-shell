/** @format */

import { ObjectHelper } from "@aitianyu.cn/types";
import { AutomaticStorage } from "shell-core/src/core/common/AutomaticStorage";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.common.AutomaticStorage", () => {
    let storage = new AutomaticStorage();

    it("setValue", () => {
        expect(storage.count()).toEqual(0);

        storage.setValue("test_key_1", { test: true }, false);
        expect(storage.count()).toEqual(1);
        expect(storage.containsKey("test_key_1")).toBeTruthy();
    });

    describe("getValue", () => {
        it("get exist value", () => {
            const value = storage.getValue("test_key_1");
            expect(value).toBeDefined();
            expect(ObjectHelper.compareObjects(value, { test: true })).toEqual("same");
        });

        it("get not exist value", () => {
            const value = storage.getValue("test_key_2");
            expect(value).toBeNull();
        });
    });

    it("delValue", () => {
        expect(storage.count()).toEqual(1);
        expect(storage.containsKey("test_key_1")).toBeTruthy();

        storage.delValue("test_key_1");
        expect(storage.count()).toEqual(0);
        expect(storage.containsKey("test_key_1")).toBeFalsy();
    });

    describe("updateStamp", () => {
        it("should update", () => {
            storage.setValue("test_key_2", { test2: true }, true);
            (storage as any).oContent["test_key_2"].flag = false;
            (storage as any).oContent["test_key_2"].timeStamp = 0;

            storage.updateStamp("test_key_2");

            expect((storage as any).oContent["test_key_2"].flag).toBeTruthy();
            expect((storage as any).oContent["test_key_2"].timeStamp).not.toEqual(0);
        });

        it("should not update", () => {
            storage.setValue("test_key_3", { test3: true }, false);
            (storage as any).oContent["test_key_3"].flag = false;

            storage.updateStamp("test_key_3");

            expect((storage as any).oContent["test_key_3"].flag).toBeTruthy();
            expect((storage as any).oContent["test_key_3"].timeStamp).toEqual(-1);
        });
    });

    describe("test watch dog", () => {
        beforeEach(() => {
            storage.endWatchDog();

            expect((storage as any).iTimer).toEqual(0);
        });

        it("startWatchDog", () => {
            storage.startWatchDog(0);

            expect((storage as any).iTimer).not.toEqual(0);
        });

        it("watchDog", () => {
            (storage as any).oContent["watch_test_1"] = {
                flag: false,
                timeStamp: 0,
                data: "1",
            };
            (storage as any).oContent["watch_test_2"] = {
                flag: true,
                timeStamp: 0,
                data: "2",
            };
            (storage as any).oContent["watch_test_3"] = {
                flag: true,
                timeStamp: -1,
                data: "3",
            };
            (storage as any).oContent["watch_test_4"] = {
                flag: true,
                timeStamp: Date.now(),
                data: "4",
            };

            (storage as any).watchDog();

            expect(storage.containsKey("watch_test_1")).toBeFalsy();
            expect((storage as any).oContent["watch_test_2"].flag).toBeFalsy();
            expect((storage as any).oContent["watch_test_3"].flag).toBeTruthy();
            expect((storage as any).oContent["watch_test_4"].flag).toBeTruthy();
        });
    });
});
