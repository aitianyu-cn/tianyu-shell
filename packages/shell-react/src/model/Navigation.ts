/**@format */

import { IReactProperty } from "./React";

export const REACT_NAVIGATION_DEVELOP_TOGGLE: string = "REACT_NAVIGATION_DEVELOPMENT";
export const REACT_NAVIGATION_PERFORMANCE_TOGGLE: string = "REACT_NAVIGATION_DEVELOPMENT_PERF";

export const REACT_NATIGATION_CLASSIFY = "(React-Navigation)";

export type ReactNavigationSourceIconType = "url" | "inline";

export type ReactNavigationViewMode = "auto" | "horizontal" | "vertical";

export interface IReactNavigationSourceItem {
    key: string;
    icon: any;
    iconType: ReactNavigationSourceIconType;
    assist: boolean;
    index: number;
    url?: string;
}

export interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}

export type ReactNavigationViewResize = {
    width: number;
    heigh: number;
    mode: ReactNavigationViewMode;
    narrow: boolean;
}[];

export interface IReactNavigationViewProps {
    mode?: ReactNavigationViewMode;
    resize?: ReactNavigationViewResize;
    fontMap?: Record<number, number>;
}

export interface IReactNavigationProps {
    props: IReactProperty;
    source: IReactNavigationSource;
    title?: string;
    view?: IReactNavigationViewProps;
}
