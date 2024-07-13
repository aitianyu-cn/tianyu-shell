/**@format */

import { MapOfBoolean } from "@aitianyu.cn/types";
import { Missing } from "@aitianyu.cn/tianyu-store";
import { ITianyuShell } from "../declares/Declare";
import { FeatureSource, IFeature, IFeatureToggle } from "../declares/Features";
import { getStore } from "../utils/Store";
import { TianyuShellCoreInstanceId, TianyuShellCoreInterface } from "./store/Exports";
import { ITianyuShellFeatureToggleState } from "./store/State";
import { TianyuShellInfraInterface, TianyuShellInfraInstanceId } from "../TianyushellInfraInterfaceExpose";

const _processToggleState = (features: FeatureSource, featureName: string): boolean => {
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

/** Feature toggle implementation */
const _featureToggle: IFeatureToggle = {
    addFeature: function (featureName: string): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.add(TianyuShellCoreInstanceId, {
                features: {
                    [featureName]: false,
                },
                dependencies: {
                    [featureName]: [],
                },
            }),
        );
    },

    addStoreFeatures: function (features: IFeature[]): void {
        const featureInfo: ITianyuShellFeatureToggleState = {
            features: {},
            dependencies: {},
        };
        for (const feature of features) {
            featureInfo.features[feature.name] = feature.isActive;
            featureInfo.dependencies[feature.name] = feature.depFeature;
        }

        getStore().dispatch(TianyuShellCoreInterface.featureToggle.action.add(TianyuShellCoreInstanceId, featureInfo));
    },

    allFeatures: function (): MapOfBoolean {
        const features = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.allFeature(TianyuShellCoreInstanceId),
        );
        return features instanceof Missing ? {} : features;
    },

    enable: function (featureName: string, enableDepFeatures: boolean = false): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.enable(TianyuShellCoreInstanceId, {
                featureName,
                enableDepFeatures,
            }),
        );
    },

    disable: function (featureName: string, disableDepFeatures: boolean = false): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.disable(TianyuShellCoreInstanceId, {
                featureName,
                disableDepFeatures,
            }),
        );
    },

    isActive: function (featureName: string): boolean {
        const isActive = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.isActive(TianyuShellCoreInstanceId, featureName),
        );

        return typeof isActive === "boolean" ? isActive : false;
    },

    contains: function (featureName: string): boolean {
        const containFeature = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.contains(TianyuShellCoreInstanceId, featureName),
        );

        return typeof containFeature === "boolean" ? containFeature : false;
    },

    loadFeatures: function (features: FeatureSource): void {
        const featureInfo: ITianyuShellFeatureToggleState = {
            features: {},
            dependencies: {},
        };
        for (const featureName of Object.keys(features)) {
            const state = _processToggleState(features, featureName);
            featureInfo.features[featureName] = state;
            featureInfo.dependencies[featureName] = features[featureName].depFeature;
        }

        getStore().dispatch(TianyuShellCoreInterface.featureToggle.action.add(TianyuShellCoreInstanceId, featureInfo));
    },
};

function _initTianyuShellFeatureToggle(): void {
    const windowObj = window as any;
    if (!(windowObj.tianyuShell as ITianyuShell)?.core?.featureToggle) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                featureToggle: _featureToggle,
            },
        };
    }
}

const _pluginSetting = getStore().selecte(TianyuShellInfraInterface.getPluginSetting(TianyuShellInfraInstanceId));
const globalize = !(_pluginSetting instanceof Missing) && _pluginSetting.globalize;

globalize && _initTianyuShellFeatureToggle();

export class FeatureToggle {
    /**
     * Add a new feature
     *
     * @param featureName feature name
     */
    public static addFeature(featureName: string): void {
        _featureToggle.addFeature(featureName);
    }
    /**
     * Add a group of features
     *
     * @param features features list
     */
    public static addStoreFeatures(features: IFeature[]): void {
        _featureToggle.addStoreFeatures(features);
    }
    /**
     * Get all features
     *
     * @returns return a features map
     */
    public static allFeatures(): MapOfBoolean {
        return _featureToggle.allFeatures();
    }
    /**
     * To enable a feature.
     * If the enableDepFeatures is set to true, also enable dependent features
     *
     * @param featureName feature name
     * @param enableDepFeatures to enable dependent features
     */
    public static enable(featureName: string, enableDepFeatures: boolean = false): void {
        _featureToggle.enable(featureName, enableDepFeatures);
    }
    /**
     * To disable a feature.
     * If the disableDepFeatures is set to true, also disable dependent features
     *
     * @param featureName feature name
     * @param disableDepFeatures to disable dependent features
     */
    public static disable(featureName: string, disableDepFeatures: boolean = false): void {
        _featureToggle.disable(featureName, disableDepFeatures);
    }
    /**
     * Get the specific feature is enabled or not
     *
     * @param featureName feature name
     *
     * @returns return true if feature is enabled, otherwise false
     */
    public static isActive(featureName: string): boolean {
        return _featureToggle.isActive(featureName);
    }
    /**
     * Get whether the feature does exist
     *
     * @param featureName feature name
     *
     * @returns return true if feature does exist, otherwise false
     */
    public static contains(featureName: string): boolean {
        return _featureToggle.contains(featureName);
    }
    /**
     * Load features by feature map
     *
     * @param features feature map
     */
    public static loadFeatures(features: FeatureSource): void {
        _featureToggle.loadFeatures(features);
    }
}
