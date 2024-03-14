/**@format */

import { IReactProperty } from "./React";

export const REACT_NAVIGATION_DEVELOP_TOGGLE: string = "REACT_NAVIGATION_DEVELOPMENT";
export const REACT_NAVIGATION_PERFORMANCE_TOGGLE: string = "REACT_NAVIGATION_DEVELOPMENT_PERF";

export const REACT_NATIGATION_CLASSIFY = "(React-Navigation)";

export type ReactNavigationSourceIconType = "url" | "inline";

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

export interface IReactNavigationProps {
    props: IReactProperty;
    source: IReactNavigationSource;
    fontMap: Record<number, number>;
}
