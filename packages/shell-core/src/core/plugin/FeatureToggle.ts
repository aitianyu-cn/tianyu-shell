/**@format */

import { MapOfBoolean, MapOfStrings } from "@aitianyu.cn/types";
import { ITianyuShell } from "../declares/Declare";
import { FeatureSource, IFeature, ITianyuShellFeatureToggle } from "../declares/Features";
import { ITianyuShellPluginSetting } from "../declares/Core";
import { TianyuShellProcessor } from "../utils/Processor";

const _featureContains = (featureName: string, features: MapOfBoolean): boolean => {
    return Object.keys(features).includes(featureName);
};

const _setDepFeatures = (featureName: string, state: boolean, features: MapOfBoolean, dependentFeatures: MapOfStrings): void => {
    if (state) {
        // if set the state to be true, should enable the features which are the parents of this feature
        const depFeatures = dependentFeatures[featureName] || [];
        for (const depFeature of depFeatures) {
            if (!_featureContains(depFeature, features)) {
                continue;
            }

            _setDepFeatures(depFeature, state, features, dependentFeatures);
            features[depFeature] = state;
        }
    } else {
        // if set the state to be false, should disable the features which are the children of this feature
        for (const feature of Object.keys(dependentFeatures)) {
            if (!_featureContains(feature, features)) {
                continue;
            }

            const depFeatures = dependentFeatures[feature];
            if (depFeatures.includes(featureName)) {
                _setDepFeatures(feature, state, features, dependentFeatures);
                features[feature] = state;
            }
        }
    }
};

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
const _featureToggle: ITianyuShellFeatureToggle = {
    _features: {},
    _dependentFeatures: {},

    addFeature: function (featureName: string): void {
        if (_featureContains(featureName, this._features)) {
            return;
        }

        this._features[featureName] = false;
    },

    addStoreFeatures: function (features: IFeature[]): void {
        for (const feature of features) {
            if (_featureContains(feature.name, this._features)) {
                continue;
            }

            this._features[feature.name] = feature.isActive;
            this._dependentFeatures[feature.name] = feature.depFeature;
        }
    },

    allFeatures: function (): MapOfBoolean {
        return this._features;
    },

    enable: function (featureName: string, enableDepFeatures: boolean = false): void {
        if (!_featureContains(featureName, this._features)) {
            return;
        }

        if (enableDepFeatures) {
            _setDepFeatures(featureName, true, this._features, this._dependentFeatures);
        }

        this._features[featureName] = true;
    },

    disable: function (featureName: string, disableDepFeatures: boolean = false): void {
        if (!_featureContains(featureName, this._features)) {
            return;
        }

        if (disableDepFeatures) {
            _setDepFeatures(featureName, false, this._features, this._dependentFeatures);
        }

        this._features[featureName] = false;
    },

    isActive: function (featureName: string): boolean {
        if (!_featureContains(featureName, this._features)) {
            return false;
        }

        return this._features[featureName];
    },

    contains: function (featureName: string): boolean {
        return _featureContains(featureName, this._features);
    },

    loadFeatures: function (features: FeatureSource): void {
        for (const featureName of Object.keys(features)) {
            if (_featureContains(featureName, this._features)) {
                continue;
            }
            const state = _processToggleState(features, featureName);
            this._features[featureName] = state;
            this._dependentFeatures[featureName] = features[featureName].depFeature;
        }
    },
};

function _initTianyuShellFeatureToggle(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.featureToggle) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                featureToggle: _featureToggle,
            },
        };
    }
}

const _pluginSetting: ITianyuShellPluginSetting = TianyuShellProcessor.getPluginSetting();
_pluginSetting.globalize && _initTianyuShellFeatureToggle();

export class FeatureToggle {
    /**
     * Add a new feature
     *
     * @param featureName feature name
     */
    public static addFeature(featureName: string): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.addFeature(featureName)
            : _featureToggle.addFeature(featureName);
    }
    /**
     * Add a group of features
     *
     * @param features features list
     */
    public static addStoreFeatures(features: IFeature[]): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.addStoreFeatures(features)
            : _featureToggle.addStoreFeatures(features);
    }
    /**
     * Get all features
     *
     * @returns return a features map
     */
    public static allFeatures(): MapOfBoolean {
        return (
            (_pluginSetting.globalize
                ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.allFeatures()
                : _featureToggle.allFeatures()) || {}
        );
    }
    /**
     * To enable a feature.
     * If the enableDepFeatures is set to true, also enable dependent features
     *
     * @param featureName feature name
     * @param enableDepFeatures to enable dependent features
     */
    public static enable(featureName: string, enableDepFeatures: boolean = false): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.enable(featureName, enableDepFeatures)
            : _featureToggle.enable(featureName, enableDepFeatures);
    }
    /**
     * To disable a feature.
     * If the disableDepFeatures is set to true, also disable dependent features
     *
     * @param featureName feature name
     * @param disableDepFeatures to disable dependent features
     */
    public static disable(featureName: string, disableDepFeatures: boolean = false): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.disable(featureName, disableDepFeatures)
            : _featureToggle.disable(featureName, disableDepFeatures);
    }
    /**
     * Get the specific feature is enabled or not
     *
     * @param featureName feature name
     *
     * @returns return true if feature is enabled, otherwise false
     */
    public static isActive(featureName: string): boolean {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.isActive(featureName)
            : _featureToggle.isActive(featureName);
    }
    /**
     * Get whether the feature does exist
     *
     * @param featureName feature name
     *
     * @returns return true if feature does exist, otherwise false
     */
    public static contains(featureName: string): boolean {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.contains(featureName)
            : _featureToggle.contains(featureName);
    }
    /**
     * Load features by feature map
     *
     * @param features feature map
     */
    public static loadFeatures(features: FeatureSource): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.featureToggle.loadFeatures(features)
            : _featureToggle.loadFeatures(features);
    }
}
