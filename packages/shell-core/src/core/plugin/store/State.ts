/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import { AreaCode, MapOfBoolean, MapOfStrings } from "@aitianyu.cn/types";

export interface ITianyuShellEventState extends IterableType {
    loadState: boolean;
    urlHash: string;
    pageResize: number;
}

export interface ITianyuShellFeatureToggleState extends IterableType {
    features: MapOfBoolean;
    dependencies: MapOfStrings;
}

export interface ITianyuShellCoreState extends IterableType {
    event: ITianyuShellEventState;
    featureToggle: ITianyuShellFeatureToggleState;
    language: {
        current: AreaCode;
    };
    compatibility: {
        language: { support: string[]; pending: string[] };
        theme: string[];
    };
}
