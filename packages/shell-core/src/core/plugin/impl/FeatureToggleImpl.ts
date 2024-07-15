/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { MapOfBoolean } from "@aitianyu.cn/types";
import { IFeatureToggle, IFeature, FeatureSource } from "../../declares/Features";
import { getStore } from "../../utils/Store";
import { _processToggleState } from "../helper/FeatureToggleHelper";
import { getTianyuShellCoreInstanceId, TianyuShellCoreInterface } from "../store/Exports";
import { ITianyuShellFeatureToggleState } from "../store/State";

/** Feature toggle implementation */
export const FeatureToggleImpl: IFeatureToggle = {
    addFeature: function (featureName: string): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.add(getTianyuShellCoreInstanceId(), {
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

        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.add(getTianyuShellCoreInstanceId(), featureInfo),
        );
    },

    allFeatures: function (): MapOfBoolean {
        const features = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.allFeature(getTianyuShellCoreInstanceId()),
        );
        return features instanceof Missing ? {} : features;
    },

    enable: function (featureName: string, enableDepFeatures: boolean = false): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.enable(getTianyuShellCoreInstanceId(), {
                featureName,
                enableDepFeatures,
            }),
        );
    },

    disable: function (featureName: string, disableDepFeatures: boolean = false): void {
        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.disable(getTianyuShellCoreInstanceId(), {
                featureName,
                disableDepFeatures,
            }),
        );
    },

    isActive: function (featureName: string): boolean {
        const isActive = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.isActive(getTianyuShellCoreInstanceId(), featureName),
        );

        return typeof isActive === "boolean" ? isActive : false;
    },

    contains: function (featureName: string): boolean {
        const containFeature = getStore().selecte(
            TianyuShellCoreInterface.featureToggle.select.contains(getTianyuShellCoreInstanceId(), featureName),
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

        getStore().dispatch(
            TianyuShellCoreInterface.featureToggle.action.add(getTianyuShellCoreInstanceId(), featureInfo),
        );
    },
};
