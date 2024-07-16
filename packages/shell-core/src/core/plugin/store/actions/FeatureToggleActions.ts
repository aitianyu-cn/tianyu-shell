/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState, ITianyuShellFeatureToggleState } from "../State";
import { MapOfBoolean, ObjectHelper } from "@aitianyu.cn/types";
import { GetFeatureToggleInfo } from "../selectors/FeatureToggleSelector";

const _featureContains = (featureName: string, features: MapOfBoolean): boolean => {
    return Object.keys(features).includes(featureName);
};

export const AddFeatureToggleInfoAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    ITianyuShellFeatureToggleState
>().withReducer(function (state, featureInfo) {
    const newState = ObjectHelper.clone(state);
    newState.featureToggle.features = {
        ...state.featureToggle.features,
        ...featureInfo.features,
    };
    newState.featureToggle.dependencies = {
        ...state.featureToggle.dependencies,
        ...featureInfo.dependencies,
    };
    return newState;
});

export const EnableFeatureToggleAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        featureName: string;
        enableDepFeatures: boolean;
    }
>()
    .withHandler(function* (action) {
        const newFeatureToggleState: MapOfBoolean = {};

        const featureToggleInfo = yield* StoreUtils.Handler.doSelector(GetFeatureToggleInfo(action.instanceId));
        if (!(featureToggleInfo instanceof Missing)) {
            const depFeatures: string[] = [];
            let feature: string | undefined = action.params.featureName;
            while (feature) {
                if (_featureContains(feature, featureToggleInfo.features)) {
                    newFeatureToggleState[feature] = true;

                    if (action.params.enableDepFeatures) {
                        depFeatures.push(...(featureToggleInfo.dependencies[feature] || /* istanbul ignore next */ []));
                    }
                }

                feature = depFeatures.pop();
            }
        }

        return newFeatureToggleState;
    })
    .withReducer(function (state, toggleState) {
        const newState = ObjectHelper.clone(state) as ITianyuShellCoreState;
        newState.featureToggle.features = {
            ...newState.featureToggle.features,
            ...toggleState,
        };
        return newState;
    });

export const DisableFeatureToggleAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        featureName: string;
        disableDepFeatures: boolean;
    }
>()
    .withHandler(function* (action) {
        const newFeatureToggleState: MapOfBoolean = {};

        const featureToggleInfo = yield* StoreUtils.Handler.doSelector(GetFeatureToggleInfo(action.instanceId));
        if (
            !(featureToggleInfo instanceof Missing) &&
            _featureContains(action.params.featureName, featureToggleInfo.features)
        ) {
            newFeatureToggleState[action.params.featureName] = false;

            if (action.params.disableDepFeatures) {
                const fnSetDepFeature = (featureName: string) => {
                    for (const feature of Object.keys(featureToggleInfo.dependencies)) {
                        if (_featureContains(feature, featureToggleInfo.features)) {
                            const depFeatures = featureToggleInfo.dependencies[feature];
                            if (depFeatures.includes(featureName)) {
                                fnSetDepFeature(feature);
                                newFeatureToggleState[feature] = false;
                            }
                        }
                    }
                };

                fnSetDepFeature(action.params.featureName);
            }
        }

        return newFeatureToggleState;
    })
    .withReducer(function (state, toggleState) {
        const newState = ObjectHelper.clone(state) as ITianyuShellCoreState;
        newState.featureToggle.features = {
            ...newState.featureToggle.features,
            ...toggleState,
        };
        return newState;
    });
