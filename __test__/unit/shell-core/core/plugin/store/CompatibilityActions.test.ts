/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { AreaCode, parseAreaCode } from "@aitianyu.cn/types";
import { languageDef, themeList } from "infra/Compatibility";
import { TIANYU_SHELL_CORE_STORE_TYPE } from "shell-core/src/core/declares/Constant";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { ITianyuShellCoreState } from "shell-core/src/core/plugin/store/State";
import { getStore } from "shell-core/src/core/utils/Store";

const __test_resetAllState = ActionFactor.makeActionCreator<ITianyuShellCoreState>().withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["compatibility"], {
        language: languageDef(),
        theme: themeList(),
    });
});

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.store.actions.CompatibilityActions", () => {
    beforeAll(async () => {
        const TEST_STORE_INTERFACE = {
            __test__: {
                compatibility: {
                    reset: __test_resetAllState,
                },
            },
        };
        getStore().registerInterface({
            [TIANYU_SHELL_CORE_STORE_TYPE]: TEST_STORE_INTERFACE,
        });
        await getStore().dispatch(__test_resetAllState(getTianyuShellCoreInstanceId()));
    });

    afterEach(async () => {
        await getStore().dispatch(__test_resetAllState(getTianyuShellCoreInstanceId()));
    });

    describe("AddLanguageAction", () => {
        it("add supporting", async () => {
            const oldPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const oldSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(oldPending.length).toEqual(0);
            expect(oldSupport).toEqual(["zh_CN", "en_US"]);

            await getStore().dispatch(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "support",
                    languages: [parseAreaCode(AreaCode.zh_TW), parseAreaCode(AreaCode.en_UK)],
                }),
            );
            const newPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const newSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(newPending.length).toEqual(0);
            expect(newSupport).toEqual([
                "zh_CN",
                "en_US",
                parseAreaCode(AreaCode.zh_TW),
                parseAreaCode(AreaCode.en_UK),
            ]);
        });

        it("add pending", async () => {
            const oldPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const oldSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(oldPending.length).toEqual(0);
            expect(oldSupport).toEqual(["zh_CN", "en_US"]);

            const currentUsingBeforeAdd = parseAreaCode(
                getStore().selecteWithThrow(
                    TianyuShellCoreInterface.language.select.get(getTianyuShellCoreInstanceId()),
                ),
            );
            await getStore().dispatch(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "pending",
                    languages: [currentUsingBeforeAdd, parseAreaCode(AreaCode.en_UK)],
                }),
            );

            const validSupport = ["zh_CN", "en_US"].filter((lang) => lang !== currentUsingBeforeAdd);
            const newPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const newSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(newPending).toEqual([currentUsingBeforeAdd, parseAreaCode(AreaCode.en_UK)]);
            expect(newSupport).toEqual(validSupport);

            const currentUsingAfterAdd = parseAreaCode(
                getStore().selecteWithThrow(
                    TianyuShellCoreInterface.language.select.get(getTianyuShellCoreInstanceId()),
                ),
            );
            expect(currentUsingAfterAdd).toEqual(validSupport[0]);
        });

        it("add support after pending", async () => {
            const oldPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const oldSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(oldPending.length).toEqual(0);
            expect(oldSupport).toEqual(["zh_CN", "en_US"]);

            await getStore().dispatch(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "pending",
                    languages: [parseAreaCode(AreaCode.en_UK), parseAreaCode(AreaCode.af_ZA)],
                }),
            );
            expect(
                getStore().selecteWithThrow(
                    TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
                ),
            ).toEqual([parseAreaCode(AreaCode.en_UK), parseAreaCode(AreaCode.af_ZA)]);

            await getStore().dispatch(
                TianyuShellCoreInterface.compatibility.action.addLanguage(getTianyuShellCoreInstanceId(), {
                    type: "support",
                    languages: [parseAreaCode(AreaCode.zh_TW), parseAreaCode(AreaCode.en_UK)],
                }),
            );
            const newPending = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getPending(getTianyuShellCoreInstanceId()),
            );
            const newSupport = getStore().selecteWithThrow(
                TianyuShellCoreInterface.language.select.getSupport(getTianyuShellCoreInstanceId()),
            );
            expect(newPending).toEqual([parseAreaCode(AreaCode.af_ZA)]);
            expect(newSupport).toEqual([
                "zh_CN",
                "en_US",
                parseAreaCode(AreaCode.zh_TW),
                parseAreaCode(AreaCode.en_UK),
            ]);
        });
    });

    describe("AddThemesAction", () => {
        it("add themes", async () => {
            const themes = ["tianyu-default", "tianyu-green", "tianyu-mono", "tianyu-purple", "tianyu-red"];
            const storeThemes = getStore().selecteWithThrow(
                TianyuShellCoreInterface.compatibility.select.getThemes(getTianyuShellCoreInstanceId()),
            );
            expect(storeThemes).toEqual(themes);

            await getStore().dispatch(
                TianyuShellCoreInterface.compatibility.action.addTheme(getTianyuShellCoreInstanceId(), [
                    "tianyu-default",
                    "tianyu-test1",
                    "tianyu-green",
                    "tianyu-test2",
                ]),
            );
            const storeThemesAfterAdd = getStore().selecteWithThrow(
                TianyuShellCoreInterface.compatibility.select.getThemes(getTianyuShellCoreInstanceId()),
            );
            expect(storeThemesAfterAdd).toEqual([...themes, "tianyu-test1", "tianyu-test2"]);
        });
    });
});
