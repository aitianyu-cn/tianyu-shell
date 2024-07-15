/**@format */

import { MapOfBoolean } from "@aitianyu.cn/types";
import { FeatureSource, IFeature } from "../declares/Features";
import { FeatureToggleImpl } from "./impl/FeatureToggleImpl";

export class FeatureToggle {
    /**
     * Add a new feature
     *
     * @param featureName feature name
     */
    public static addFeature(featureName: string): void {
        FeatureToggleImpl.addFeature(featureName);
    }
    /**
     * Add a group of features
     *
     * @param features features list
     */
    public static addStoreFeatures(features: IFeature[]): void {
        FeatureToggleImpl.addStoreFeatures(features);
    }
    /**
     * Get all features
     *
     * @returns return a features map
     */
    public static allFeatures(): MapOfBoolean {
        return FeatureToggleImpl.allFeatures();
    }
    /**
     * To enable a feature.
     * If the enableDepFeatures is set to true, also enable dependent features
     *
     * @param featureName feature name
     * @param enableDepFeatures to enable dependent features
     */
    public static enable(featureName: string, enableDepFeatures: boolean = false): void {
        FeatureToggleImpl.enable(featureName, enableDepFeatures);
    }
    /**
     * To disable a feature.
     * If the disableDepFeatures is set to true, also disable dependent features
     *
     * @param featureName feature name
     * @param disableDepFeatures to disable dependent features
     */
    public static disable(featureName: string, disableDepFeatures: boolean = false): void {
        FeatureToggleImpl.disable(featureName, disableDepFeatures);
    }
    /**
     * Get the specific feature is enabled or not
     *
     * @param featureName feature name
     *
     * @returns return true if feature is enabled, otherwise false
     */
    public static isActive(featureName: string): boolean {
        return FeatureToggleImpl.isActive(featureName);
    }
    /**
     * Get whether the feature does exist
     *
     * @param featureName feature name
     *
     * @returns return true if feature does exist, otherwise false
     */
    public static contains(featureName: string): boolean {
        return FeatureToggleImpl.contains(featureName);
    }
    /**
     * Load features by feature map
     *
     * @param features feature map
     */
    public static loadFeatures(features: FeatureSource): void {
        FeatureToggleImpl.loadFeatures(features);
    }
}
