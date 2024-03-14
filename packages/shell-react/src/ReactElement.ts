/**@format */

import React from "react";
import { IReactProperty, IReactState } from "./model/React";

export class ReactElement<T> extends React.Component<IReactProperty | T, IReactState> {
    public constructor(props?: IReactProperty | T) {
        super(props || {});
    }
}
