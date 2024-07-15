/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import { AreaCode, MapOfBoolean, MapOfStrings, MapOfType } from "@aitianyu.cn/types";

export interface ITianyuShellEventState extends IterableType {
    loadState: boolean;
    urlHash: string;
    pageResize: number;
}

export interface ITianyuShellFeatureToggleState extends IterableType {
    features: MapOfBoolean;
    dependencies: MapOfStrings;
}

export interface ICaptureRecordItem extends IterableType {
    guid: string;
    classify: string;
    id: string;
    /** index of same id and classify capture */
    cid: number;
    /** start performance time */
    start: number;
    /** the end performance time */
    end: number;
    /** to force logger */
    log: boolean;
}

export type ICaptureCIItem = MapOfType<number>;

/** Capture Data Segment of Capture Print */
export interface ICapturePrintSegment {
    /** start performance time */
    start: number;
    /** the end performance time */
    end: number;
    /** total during time */
    during: number;
}

export interface ICapturePrintItem {
    name: string;
    segments: ICapturePrintSegment;
}

export type CaptureOperationType = "start" | "end";

export interface ITianyuShellCaptureState extends IterableType {
    list: ICaptureRecordItem[];
    classifies: MapOfType<ICaptureCIItem>;
    time: number;

    operationKey: number;
    operationType: CaptureOperationType;
    operationMsg: string;
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
    capture: ITianyuShellCaptureState;
}
