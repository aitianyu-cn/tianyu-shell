/**@format */

import { MapOfType } from "@aitianyu.cn/types";
import React, { CSSProperties } from "react";
import { IReactState } from "./React";

export interface IReactContentComponent {}

export class ReactContentComponent extends React.Component<IReactContentComponent, IReactState> {}

export type ReactContentRouterParamGenerater = () => IReactContentComponent;

export interface IReactContentRouter {
    component: typeof React.Component<IReactContentComponent, IReactState>;
    paramGenerater: ReactContentRouterParamGenerater;

    /**
     * This flag means that when the hash is not change
     * whether needs to re-render the view always
     */
    forceUpdate: boolean;
}

export interface IReactContentProperty {
    default: string;
    router: MapOfType<IReactContentRouter>;
    fallback?: IReactContentRouter;
    style: CSSProperties;
}
