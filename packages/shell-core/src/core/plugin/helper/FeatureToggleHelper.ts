/** @format */

import { FeatureSource } from "../../declares/Features";

export const _processToggleState = (features: FeatureSource, featureName: string): boolean => {
    const featureState = features[featureName];
    const featureDependency = featureState.depFeature;

    let bDependentFeatureState = true;
    if (featureDependency) {
        for (let i = 0; bDependentFeatureState && i < featureDependency.length; ++i) {
            bDependentFeatureState = _processToggleState(features, featureDependency[i]);
        }
    }

    return bDependentFeatureState && featureState.defaultOn;
};
