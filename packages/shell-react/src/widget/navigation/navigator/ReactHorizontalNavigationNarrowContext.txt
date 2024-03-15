/**@format */

import React from "react";
import { isMobile } from "@aitianyu.cn/tianyu-shell/core";
import { CallbackAction } from "@aitianyu.cn/types";
import { IReactState } from "ty-infra/ui/model/React";
import { ReactNavigationItem } from "./ReactNavigationItem";

interface IReactHorizontalNavigationNarrowContext {
    normalItems: ReactNavigationItem[];
    assistItems: ReactNavigationItem[];
    fontMap: Record<number, number>;
    fnMouseMoveIn: CallbackAction;
    fnMouseMoveOut: CallbackAction;
}

export class ReactHorizontalNavigationNarrowContext extends React.Component<
    IReactHorizontalNavigationNarrowContext,
    IReactState
> {
    public constructor(props: IReactHorizontalNavigationNarrowContext) {
        super(props);
    }

    public override render(): React.ReactNode {
        const normalRenderItems: React.ReactNode[] = [];
        const assistRenderItems: React.ReactNode[] = [];

        for (const item of this.props.normalItems) {
            normalRenderItems.push(item.renderForNarrow());
        }

        for (const item of this.props.assistItems) {
            assistRenderItems.push(item.renderForNarrow());
        }

        return (
            <div
                className={isMobile ? "r_hn_n_na_c_b_m" : "r_hn_n_na_c_b"}
                onMouseEnter={this.props.fnMouseMoveIn}
                onMouseLeave={this.props.fnMouseMoveOut}>
                <div className="r_hn_n_na_c_in r_hn_na_c_i_c">
                    <div className="r_hn_na_c_i_c">{normalRenderItems}</div>
                    {assistRenderItems.length && (
                        <div className="r_hn_na_c_i_c">
                            {/** this is a split line for assist part */}
                            <div className="r_hn_n_na_c_sp"></div>
                            <div className="r_hn_na_c_i_c">{assistRenderItems}</div>
                            {/** this is a empty line for assist part */}
                            <div></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
