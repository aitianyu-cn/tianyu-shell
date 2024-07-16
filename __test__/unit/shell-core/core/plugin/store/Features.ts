/** @format */

import { FeatureSource } from "shell-core/src/core/declares/Features";
import { processToggleState } from "shell-core/src/core/plugin/helper/FeatureToggleHelper";
import { ITianyuShellFeatureToggleState } from "shell-core/src/core/plugin/store/State";

const features: FeatureSource = {
    FEATURE_1: {
        description: "",
        defaultOn: false,
        version: "",
        reqId: "",
        depFeature: [],
    },
    FEATURE_2: {
        description: "",
        defaultOn: true,
        version: "",
        reqId: "",
        depFeature: [],
    },
    FEATURE_3: {
        description: "",
        defaultOn: true,
        version: "",
        reqId: "",
        depFeature: ["FEATURE_1"],
    },
    FEATURE_4: {
        description: "",
        defaultOn: false,
        version: "",
        reqId: "",
        depFeature: ["FEATURE_2"],
    },
};

export function getFeatures(): ITianyuShellFeatureToggleState {
    const featureInfo: ITianyuShellFeatureToggleState = {
        features: {},
        dependencies: {},
    };
    for (const featureName of Object.keys(features)) {
        const state = processToggleState(features, featureName);
        featureInfo.features[featureName] = state;
        featureInfo.dependencies[featureName] = features[featureName].depFeature;
    }

    return featureInfo;
}
