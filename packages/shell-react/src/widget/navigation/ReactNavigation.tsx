/**@format */

import React from "react";
import { IRouterCallbackEvent } from "shell-core/index";
import { IReactNavigationProps, ReactNavigationViewMode, ReactNavigationViewResize } from "shell-react/src/model/Navigation";
import { IReactState } from "shell-react/src/model/React";
import {
    DEFAUTL_NAVIGATION_VIEW_TYPE,
    DEFAULT_NAVIGATION_VIEW_RESIZE,
    DEFAULT_NAVIGATION_VIEW_FONT_MAP,
} from "./navigator/NavigationViewHelper";

export class ReactNavigation extends React.Component<IReactNavigationProps, IReactState> {
    private viewMode: ReactNavigationViewMode;
    private viewResize: ReactNavigationViewResize;
    private viewCurrentMode: ReactNavigationViewMode;

    private fontMap: Record<number, number>;

    public constructor(props: IReactNavigationProps) {
        super(props);

        this.viewMode = this.props.view?.mode || DEFAUTL_NAVIGATION_VIEW_TYPE;
        this.viewResize = this.props.view?.resize || DEFAULT_NAVIGATION_VIEW_RESIZE;
        this.fontMap = this.props.view?.fontMap || DEFAULT_NAVIGATION_VIEW_FONT_MAP;
        // to initial the current view type to auto
        // and this item will be corrected to horizontal or vertical before rendering
        this.viewCurrentMode = "auto";
    }

    public override render(): React.ReactNode {
        return <div></div>;
    }

    private onPageResize(): void {
        // this is work for page resized
    }

    private onHashChanged(ev: IRouterCallbackEvent): void {
        // this is work for hash changed
    }

    private onFallback(ev: IRouterCallbackEvent): void {
        //
    }
}
