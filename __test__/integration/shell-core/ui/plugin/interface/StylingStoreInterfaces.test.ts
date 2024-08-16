/** @format */

import { StoreUtils } from "@aitianyu.cn/tianyu-store";
import { updateTianyuShellTheme } from "shell-core/src/ui/plugin/handler/StylingHandler";
import { StoreType } from "shell-core/src/ui/plugin/interface/StoreTypes";
import { StylingInterface } from "shell-core/src/ui/plugin/interface/StylingInterfaceExpose";
import { createMockedStore, destroyStore, initialStore } from "test/mocks/StoreMocks";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.interface.action.StylingStoreInterface", () => {
    const TianyuStore = createMockedStore();

    beforeAll(() => {
        TianyuStore.registerInterface(StoreType.STYLING_STORE_TYPE, StylingInterface);
    });

    beforeEach(async () => {
        await initialStore(TianyuStore);

        const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                StylingInterface.core.creator(getStylingInstanceId(), {
                    default: {
                        theme: "tianyu-default",
                        color: "light",
                    },
                    custom: {
                        theme: "tianyu-red",
                        color: "light",
                    },
                }),
                StylingInterface.control.create.tianyuStyleMap(getStylingInstanceId()),
                StylingInterface.control.create.cssMap(getStylingInstanceId()),
            ]),
        );

        updateTianyuShellTheme("custom", "light");
    });

    afterEach(async () => {
        const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
        await TianyuStore.dispatch(
            StoreUtils.createBatchAction([
                StylingInterface.control.lifecycle.tianyuStyleMap(getStylingInstanceId()),
                StylingInterface.control.lifecycle.cssMap(getStylingInstanceId()),
            ]),
        );

        await destroyStore(TianyuStore);
    });

    describe("css styling", () => {
        it("external obj is missing", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(StylingInterface.control.lifecycle.cssMap(getStylingInstanceId()));

            await TianyuStore.dispatch(
                StylingInterface.style.css.add(getStylingInstanceId(), {
                    key: "test",
                    link: "test-link",
                }),
            );

            expect(
                TianyuStore.selecteWithThrow(StylingInterface.style.css.getAllCss(getStylingInstanceId())).includes(
                    "test",
                ),
            ).toBeFalsy();
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.style.css.getElement(getStylingInstanceId(), "test")),
            ).toBeUndefined();
        });

        it("set success", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.css.add(getStylingInstanceId(), {
                        key: "css-styling-1",
                        link: "https://resources.aitianyu.cn/placeholder",
                    }),
                    StylingInterface.style.css.add(getStylingInstanceId(), {
                        key: "css-styling-2",
                        link: `{width:"100px",height:"50px"}`,
                    }),
                ]),
            );

            const cssList = TianyuStore.selecteWithThrow(StylingInterface.style.css.getAllCss(getStylingInstanceId()));
            expect(cssList.includes("css-styling-1")).toBeTruthy();
            expect(cssList.includes("css-styling-2")).toBeTruthy();

            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.css.getElement(getStylingInstanceId(), "css-styling-1"),
                ),
            ).toBeDefined();
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.css.getElement(getStylingInstanceId(), "css-styling-2"),
                ),
            ).toBeDefined();
        });

        it("set duplicated styling", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");

            const innerHTML = `{width:"100px",height:"50px"}`;

            await TianyuStore.dispatch(
                StylingInterface.style.css.add(getStylingInstanceId(), {
                    key: "css-styling-1",
                    link: "https://resources.aitianyu.cn/placeholder",
                }),
            );

            const cssList = TianyuStore.selecteWithThrow(StylingInterface.style.css.getAllCss(getStylingInstanceId()));
            expect(cssList.includes("css-styling-1")).toBeTruthy();

            expect(
                (
                    TianyuStore.selecteWithThrow(
                        StylingInterface.style.css.getElement(getStylingInstanceId(), "css-styling-1"),
                    ) as HTMLLinkElement
                )?.href,
            ).toEqual("https://resources.aitianyu.cn/placeholder");

            await TianyuStore.dispatch(
                StylingInterface.style.css.add(getStylingInstanceId(), {
                    key: "css-styling-1",
                    link: innerHTML,
                }),
            );
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.css.getElement(getStylingInstanceId(), "css-styling-1"),
                )?.innerHTML,
            ).toEqual(innerHTML);
        });
    });

    describe("tianyu styling", () => {
        it("external obj is missing", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(StylingInterface.control.lifecycle.tianyuStyleMap(getStylingInstanceId()));

            await TianyuStore.dispatch(
                StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                    key: "test",
                    path: "a/b/c",
                    styling: {
                        width: "100px",
                    },
                }),
            );
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: "test",
                        path: "a/b/c",
                    }),
                ),
            ).toEqual({});

            await TianyuStore.dispatch(
                StylingInterface.style.tianyuStyle.remove(getStylingInstanceId(), {
                    key: "test",
                    path: "a/b/c",
                }),
            );
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: "test",
                        path: "a/b/c",
                    }),
                ),
            ).toEqual({});
        });

        it("set a list stylings", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b/c",
                        styling: {
                            width: "100px",
                            height: "50px",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-2",
                        path: "a/b/c",
                        styling: {
                            width: "1000px",
                            height: "500px",
                            textAlign: "center",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b",
                        styling: {
                            userSelect: "none",
                        },
                    }),
                ]),
            );

            const stylings1 = TianyuStore.selecteWithThrow(
                StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                    key: "styling-1",
                    path: "a/b/c",
                    isDepth: true,
                }),
            );
            expect(stylings1.userSelect).toEqual("none");
            expect(stylings1.width).toEqual("100px");
            expect(stylings1.height).toEqual("50px");

            const stylings2 = TianyuStore.selecteWithThrow(
                StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                    key: "styling-2",
                    path: "a/b/c",
                    isDepth: true,
                }),
            );
            expect(stylings2.textAlign).toEqual("center");
            expect(stylings2.width).toEqual("1000px");
            expect(stylings2.height).toEqual("500px");
        });

        it("remove testing", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b/c",
                        styling: {
                            width: "100px",
                            height: "50px",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-2",
                        path: "a/b/c",
                        styling: {
                            width: "1000px",
                            height: "500px",
                            textAlign: "center",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b",
                        styling: {
                            userSelect: "none",
                        },
                    }),
                ]),
            );

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.remove(getStylingInstanceId(), {
                        key: "styling-2",
                        path: "a/b/c",
                    }),
                ]),
            );
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: "styling-2",
                        path: "a/b/c",
                        isDepth: true,
                    }),
                ),
            ).toEqual({});

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.remove(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b",
                    }),
                ]),
            );
            const stylings1 = TianyuStore.selecteWithThrow(
                StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                    key: "styling-1",
                    path: "a/b/c",
                    isDepth: true,
                }),
            );
            expect(stylings1.userSelect).toBeUndefined();
            expect(stylings1.width).toEqual("100px");
            expect(stylings1.height).toEqual("50px");
        });

        it("undefined stylings", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b/c",
                        styling: {
                            width: "100px",
                            height: "50px",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-2",
                        path: "a/b/c",
                        styling: {
                            width: "1000px",
                            height: "500px",
                            textAlign: "center",
                        },
                    }),
                    StylingInterface.style.tianyuStyle.set(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b",
                        styling: {
                            userSelect: "none",
                        },
                    }),
                ]),
            );

            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b/c/d",
                        isDepth: true,
                    }),
                ),
            ).toEqual({});
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: "styling-3",
                        path: "a/b/c",
                        isDepth: true,
                    }),
                ),
            ).toEqual({});
            expect(
                TianyuStore.selecteWithThrow(
                    StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                        key: [],
                        path: "a/b/c",
                        isDepth: true,
                    }),
                ),
            ).toEqual({});

            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.style.tianyuStyle.remove(getStylingInstanceId(), {
                        key: "styling-1",
                        path: "a/b/c/d",
                    }),
                ]),
            );
            const stylings1 = TianyuStore.selecteWithThrow(
                StylingInterface.style.tianyuStyle.get(getStylingInstanceId(), {
                    key: "styling-1",
                    path: "a/b/c",
                    isDepth: true,
                }),
            );
            expect(stylings1.userSelect).toEqual("none");
            expect(stylings1.width).toEqual("100px");
            expect(stylings1.height).toEqual("50px");
        });
    });

    describe("theme", () => {
        it("custom theme", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.theme.user.add(getStylingInstanceId(), {
                        themeId: "theme-1",
                        styling: "theme1",
                    }),
                    StylingInterface.theme.user.add(getStylingInstanceId(), {
                        themeId: "theme-2",
                        styling: "theme2",
                    }),
                    StylingInterface.theme.user.add(getStylingInstanceId(), {
                        themeId: "theme-3",
                        styling: "theme3",
                    }),
                    StylingInterface.theme.user.add(getStylingInstanceId(), {
                        themeId: "theme-4",
                        styling: "theme4",
                    }),
                ]),
            );

            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getUsingThemes(getStylingInstanceId())),
            ).toEqual(["theme-1", "theme-2", "theme-3", "theme-4"]);
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getURL(getStylingInstanceId(), "theme-1")),
            ).toEqual("aitianyu.cn/theme/theme1");

            await TianyuStore.dispatch(StylingInterface.theme.user.remove(getStylingInstanceId(), "theme-2"));
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.isUsing(getStylingInstanceId(), "theme-1")),
            ).toBeTruthy();
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.isUsing(getStylingInstanceId(), "theme-2")),
            ).toBeFalsy();
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.isUsing(getStylingInstanceId(), "theme-3")),
            ).toBeTruthy();
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.isUsing(getStylingInstanceId(), "theme-4")),
            ).toBeTruthy();

            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getURL(getStylingInstanceId(), "theme-2")),
            ).toEqual("");

            await TianyuStore.dispatch(StylingInterface.theme.user.reset(getStylingInstanceId()));
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getUsingThemes(getStylingInstanceId())),
            ).toEqual([]);
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getAllThemes(getStylingInstanceId())),
            ).toEqual([]);
        });

        it("system theme", async () => {
            const { getStylingInstanceId } = await import("shell-core/src/ui/tools/InstanceHelper");
            await TianyuStore.dispatch(
                StoreUtils.createBatchAction([
                    StylingInterface.theme.user.add(getStylingInstanceId(), {
                        themeId: "theme-1",
                        styling: "theme1",
                    }),
                    StylingInterface.theme.change(getStylingInstanceId(), {
                        theme: "tianyu-green",
                        color: "dark",
                    }),
                ]),
            );

            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getUsingThemes(getStylingInstanceId())),
            ).toEqual(["theme-1"]);
            expect(TianyuStore.selecteWithThrow(StylingInterface.theme.getCustom(getStylingInstanceId()))).toEqual({
                theme: "tianyu-green",
                color: "dark",
            });

            await TianyuStore.dispatch(
                StylingInterface.theme.change(getStylingInstanceId(), {
                    theme: "tianyu-notvalid",
                    color: "dark",
                }),
            );
            expect(TianyuStore.selecteWithThrow(StylingInterface.theme.getCustom(getStylingInstanceId()))).toEqual({
                theme: "tianyu-green",
                color: "dark",
            });

            await TianyuStore.dispatch(StylingInterface.theme.reset(getStylingInstanceId()));
            expect(
                TianyuStore.selecteWithThrow(StylingInterface.theme.user.getUsingThemes(getStylingInstanceId())),
            ).toEqual([]);
            expect(TianyuStore.selecteWithThrow(StylingInterface.theme.getCustom(getStylingInstanceId()))).toEqual(
                TianyuStore.selecteWithThrow(StylingInterface.theme.getDefault(getStylingInstanceId())),
            );
        });
    });
});
