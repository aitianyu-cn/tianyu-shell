/** @format */

import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";
import { getFeatures } from "./Features";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.store.actions.FeatureToggleActions", () => {
    beforeAll(async () => {
        await getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.add(getTianyuShellCoreInstanceId(), getFeatures()),
        );

        const allFeatures = getStore().selecteWithThrow(
            TianyuShellCoreInterface.featureToggle.select.allFeature(getTianyuShellCoreInstanceId()),
        );
        expect(allFeatures["FEATURE_1"]).toBeFalsy();
        expect(allFeatures["FEATURE_2"]).toBeTruthy();
        expect(allFeatures["FEATURE_3"]).toBeFalsy();
        expect(allFeatures["FEATURE_4"]).toBeFalsy();

        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), "FEATURE_1"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), "FEATURE_2"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), "FEATURE_3"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), "FEATURE_4"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), "FEATURE_5"),
            ),
        ).toBeFalsy();
    });

    it("EnableFeatureToggleAction", async () => {
        await getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.enable(getTianyuShellCoreInstanceId(), {
                featureName: "FEATURE_3",
                enableDepFeatures: true,
            }),
        );

        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_1"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_2"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_3"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_4"),
            ),
        ).toBeFalsy();
    });

    it("DisableFeatureToggleAction", async () => {
        await getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.disable(getTianyuShellCoreInstanceId(), {
                featureName: "FEATURE_1",
                disableDepFeatures: true,
            }),
        );

        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_1"),
            ),
        ).toBeFalsy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_2"),
            ),
        ).toBeTruthy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_3"),
            ),
        ).toBeFalsy();
        expect(
            getStore().selecteWithThrow(
                TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), "FEATURE_4"),
            ),
        ).toBeFalsy();
    });
});
