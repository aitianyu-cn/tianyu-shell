/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState, ITianyuShellFeatureToggleState } from "../State";
import { MapOfBoolean, ObjectHelper } from "@aitianyu.cn/types";

export const GetFeatureToggleInfo = SelectorFactor.makeSelector<ITianyuShellCoreState, ITianyuShellFeatureToggleState>(
    function (state) {
        return state.featureToggle;
    },
);

export const GetAllFeatures = SelectorFactor.makeSelector<ITianyuShellCoreState, MapOfBoolean>(function (state) {
    return ObjectHelper.clone(state.featureToggle.features);
});

export const IsFeatureToggleActive = SelectorFactor.makeParameterSelector<ITianyuShellCoreState, string, boolean>(
    function (state, feature) {
        return Boolean(state.featureToggle.features[feature]);
    },
);

export const HasFeatureName = SelectorFactor.makeParameterSelector<ITianyuShellCoreState, string, boolean>(function (
    state,
    feature,
) {
    return Object.keys(state.featureToggle.features).includes(feature);
});
