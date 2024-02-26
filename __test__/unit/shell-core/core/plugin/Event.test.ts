/**@format */

import { ITianyuShell } from "../../../../../packages/shell-core/src/core/declares/Declare";
import { EventRemoveResult, IEventInvokeData } from "../../../../../packages/shell-core/src/core/declares/Event";
import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";
import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/tianyuShell";

const config = require("../../../../config/env.json") as ITianyuShellInitial;
initialTianyuShell(config);

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Event", () => {
    const { Event, EventController } = require("../../../../../packages/shell-core/src/core/plugin/Event");

    beforeAll(() => {
        jest.setTimeout(30000);
    });

    describe("global part", () => {
        it("test for global setting", () => {
            expect(((window as any).tianyuShell as ITianyuShell).core.event).toBeDefined();
        });

        it("on loaded", () => {
            const fnOnLoaded = () => {};
            Event.listenLoaded("test", fnOnLoaded);
            expect(Event.containsLoaded("test")).toBeTruthy();
            Event.removelistenLoaded("test");
            expect(Event.containsLoaded("test")).toBeFalsy();
        });

        it("on hash changed", () => {
            const fnOnHashChanged = () => {};
            Event.listenHashChanged("test", fnOnHashChanged);
            expect(Event.containsHashChanged("test")).toBeTruthy();
            Event.removelistenHashChanged("test");
            expect(Event.containsHashChanged("test")).toBeFalsy();
        });

        it("on resized", () => {
            const fnOnResized = () => {};
            Event.listenPageResize("test", fnOnResized);
            expect(Event.containsPageResize("test")).toBeTruthy();
            Event.removelistenPageResize("test");
            expect(Event.containsPageResize("test")).toBeFalsy();
        });

        it("integration test", (done) => {
            const called = {
                onResize: false,
                onHashchanged: false,
                onLoaded: false,
            };

            let fnResizeResolve = () => {};

            const resizePromise = new Promise<void>((resolve) => {
                fnResizeResolve = resolve;
            });

            Event.listenLoaded("test", () => {
                called.onLoaded = true;
            });
            Event.listenHashChanged("test", () => {
                called.onHashchanged = true;
            });
            Event.listenPageResize("test", () => {
                called.onResize = true;
                fnResizeResolve();
            });

            document.body.onload?.(new global.Event(""));
            document.body.onresize?.(new global.UIEvent(""));
            window.onhashchange?.(new global.HashChangeEvent(""));

            resizePromise.finally(() => {
                expect(called.onHashchanged).toBeTruthy();
                expect(called.onLoaded).toBeTruthy();
                expect(called.onResize).toBeTruthy();
                done();
            });
        });
    });

    describe("event controller", () => {
        describe("controller", () => {
            describe("create", () => {
                it("add a new event entity", () => {
                    const entity = EventController.create("test", "test1");
                    expect(entity.isValid()).toBeTruthy();
                    expect(EventController.containEvent("test")).toBeTruthy();
                    expect(EventController.event("test").isValid()).toBeTruthy();
                });

                it("add a invalid event", () => {
                    const entity = EventController.create("test", "test2");
                    expect(entity.isValid()).toBeFalsy();
                });

                it("get a exist entity", () => {
                    const entity = EventController.create("test", "test1");
                    expect(entity.isValid()).toBeTruthy();
                });
            });

            describe("delete", () => {
                it("delete not exist event", () => {
                    const result = EventController.delete("test2", "test2");
                    expect(result).toEqual(EventRemoveResult.NoExist);
                });

                it("delete not accessable event", () => {
                    const result = EventController.delete("test", "test2");
                    expect(result).toEqual(EventRemoveResult.UnAccessible);
                });

                it("delete not accessable event", () => {
                    const result = EventController.delete("test", "test1");
                    expect(result).toEqual(EventRemoveResult.Success);
                    expect(EventController.containEvent("test")).toBeFalsy();
                    expect(EventController.event("test").isValid()).toBeFalsy();
                });
            });
        });

        describe("event entity", () => {
            it("integration test - async", (done) => {
                const entity = EventController.create("test-event-entity", "test1");
                expect(entity).toBeDefined();
                expect(entity.isValid()).toBeTruthy();

                const emptyInvokePromise = entity.invoke({ data: "test empty" });

                let fnPromise1Resolve = () => {};
                let fnPromise2Resolve = () => {};

                const oPromise1 = new Promise<void>((resolve) => {
                    fnPromise1Resolve = resolve;
                });
                const oPromise2 = new Promise<void>((resolve) => {
                    fnPromise2Resolve = resolve;
                });

                const fnListen1Callback = (value: IEventInvokeData) => {
                    expect(value.data).toEqual("test event");
                    fnPromise1Resolve();
                };
                const fnListen2Callback = (value: IEventInvokeData) => {
                    expect(value.data).toEqual("test event");
                    fnPromise2Resolve();
                };

                entity.listen("listen1", fnListen1Callback);
                entity.listen("listen2", fnListen2Callback);

                expect(entity.containListener("listen1")).toBeTruthy();
                expect(entity.containListener("listen2")).toBeTruthy();

                const validInvoke = new Promise<void>((resolve, reject) => {
                    entity.invoke({ data: "test event" }).then(() => {
                        Promise.all([oPromise1, oPromise2]).then(() => {
                            resolve();
                        }, reject);
                    }, reject);
                });

                entity.unlisten("listen1");
                entity.unlisten("listen2");
                expect(entity.containListener("listen1")).toBeFalsy();
                expect(entity.containListener("listen2")).toBeFalsy();

                const fnListen3Callback = (value: IEventInvokeData) => {
                    expect(value.data).toEqual("test event - 2");
                    throw Error("");
                };
                entity.listen("listen2", fnListen3Callback);

                const invalidInvoke = new Promise<void>((resolve, reject) => {
                    entity.invoke({ data: "test event - 2" }).then(
                        () => {
                            reject();
                        },
                        () => {
                            resolve();
                        },
                    );
                });

                Promise.all([emptyInvokePromise, validInvoke, invalidInvoke]).finally(() => {
                    done();
                });
            });

            it("integration test - sync", () => {
                const entity = EventController.create("test-event-entity2", "test1");
                expect(entity).toBeDefined();
                expect(entity.isValid()).toBeTruthy();

                const emptyResult = entity.invokeSync({ data: "test event" });
                expect(emptyResult.success).toBeTruthy();
                expect(emptyResult.errors.length).toEqual(0);
                expect(emptyResult.message).toEqual(["[SKIPPED] there is no triggers needs to be processed"]);

                const fnListen1Callback = (value: IEventInvokeData) => {
                    expect(value.data).toEqual("test event");
                };
                const fnListen2Callback = (value: IEventInvokeData) => {
                    expect(value.data).toEqual("test event");
                    throw Error();
                };

                entity.listen("listen1", fnListen1Callback);
                entity.listen("listen2", fnListen2Callback);
                expect(entity.containListener("listen1")).toBeTruthy();
                expect(entity.containListener("listen2")).toBeTruthy();

                const runResult = entity.invokeSync({ data: "test event" });
                expect(runResult.success).toBeFalsy();
                expect(runResult.errors.length).toBeGreaterThan(0);
                expect(runResult.message).toEqual(["[TOTAL] 2", "[SUCCESS] 1"]);
            });
        });

        describe("invalid event entity", () => {
            const validEntity = EventController.create("test-event-entity3", "test1");
            const entity = EventController.create("test-event-entity3", "test2");

            beforeAll(() => {
                expect(validEntity).toBeDefined();
                expect(validEntity.isValid()).toBeTruthy();

                expect(entity).toBeDefined();
                expect(entity.isValid()).toBeFalsy();
            });

            it("listen", () => {
                expect(() => {
                    entity.listen("test", () => {});
                }).not.toThrow();
                expect(entity.containListener("test")).toBeFalsy();
            });

            it("unlisten", () => {
                expect(() => {
                    entity.unlisten("test");
                }).not.toThrow();
                expect(entity.containListener("test")).toBeFalsy();
            });

            it("invoke", (done) => {
                entity.invoke({ data: "test event" }).then(
                    () => done.fail(),
                    () => done(),
                );
            });

            it("invoke sync", () => {
                const result = entity.invokeSync({ data: "test event" });
                expect(result.success).toBeFalsy();
                expect(result.errors.length).toEqual(1);
                expect(result.errors[0]).toEqual({
                    message: "this is not a valid event entity!",
                });
            });
        });
    });
});
