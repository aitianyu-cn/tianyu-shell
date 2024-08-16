/**@format */

import React from "react";
import { IReactState } from "./model/React";

/**
 * Tianyu Shell React Element lite version
 *
 * This is a lite element of React Component without TianyuStore supporting.
 * Element states will be managed by the creater and React itself.
 */
export class ReactLiteElement<P, S extends IReactState = {}> extends React.Component<P, S> {
    public constructor(props: P) {
        super(props);
    }
}
