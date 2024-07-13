/**@format */

import { MapOfBoolean } from "@aitianyu.cn/types";

/** Feature Toggle Item */
export interface IFeature {
    /** Feature Name */
    name: string;
    /** Current Feature Status */
    isActive: boolean;
    /** Dependent Features */
    depFeature: string[];
    /** Default Status */
    defaultOn: boolean;
}

/** Feature Toggle Source Item */
export interface IFeatureSourceItem {
    /** Feature Description */
    description: string;
    /** Feature Default Status */
    defaultOn: boolean;
    /** Enable Version */
    version: string;
    /** Feature Tracking Id */
    reqId: string;
    /** Dependent Features */
    depFeature: string[];
}

/** Feature Source Map */
export type FeatureSource = Record<string, IFeatureSourceItem>;

export interface IFeatureToggle {
    /**
     * Add a new feature
     *
     * @param featureName feature name
     */
    addFeature(featureName: string): void;
    /**
     * Add a group of features
     *
     * @param features features list
     */
    addStoreFeatures(features: IFeature[]): void;
    /**
     * Get all features
     *
     * @returns return a features map
     */
    allFeatures(): MapOfBoolean;
    /**
     * To enable a feature.
     * If the enableDepFeatures is set to true, also enable dependent features
     *
     * @param featureName feature name
     * @param enableDepFeatures to enable dependent features
     */
    enable(featureName: string, enableDepFeatures?: boolean): void;
    /**
     * To disable a feature.
     * If the disableDepFeatures is set to true, also disable dependent features
     *
     * @param featureName feature name
     * @param disableDepFeatures to disable dependent features
     */
    disable(featureName: string, disableDepFeatures?: boolean): void;
    /**
     * Get the specific feature is enabled or not
     *
     * @param featureName feature name
     *
     * @returns return true if feature is enabled, otherwise false
     */
    isActive(featureName: string): boolean;
    /**
     * Get whether the feature does exist
     *
     * @param featureName feature name
     *
     * @returns return true if feature does exist, otherwise false
     */
    contains(featureName: string): boolean;
    /**
     * Load features by feature map
     *
     * @param features feature map
     */
    loadFeatures(features: FeatureSource): void;
}
