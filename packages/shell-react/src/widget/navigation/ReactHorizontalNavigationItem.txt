/**@format */

import React from "react";
import { ReactNode } from "react";
import { ReactNavigationItem } from "./ReactNavigationItem";
import { isMobile } from "@aitianyu.cn/tianyu-shell/core";
import { IReactProperty } from "ty-infra/ui/model/React";

import "../../css/horizontal-navigation-item.css";

export class ReactHorizontalNavigationItem extends ReactNavigationItem {
    public constructor(props?: IReactProperty) {
        super(props);
    }

    public override renderForNarrow(): ReactNode {
        const classListOfText: string[] = ["r_hni_t", "r_hni_t_n"];
        // classListOfText.push(this.assist ? "r_hni_t_a" : "r_hni_t_n");

        const basicStyle: string[] = ["r_hni_b"];
        basicStyle.push(this.select ? (isMobile ? "r_hni_b_s_m" : "r_hni_b_s") : "r_hni_b_us");

        return (
            <div className={basicStyle.join(" ")} key={this.id} onClick={this.onClick.bind(this)}>
                {this.iconType === "url" ? (
                    <img className="r_hni_i" src={this.icon} alt={this.key} />
                ) : (
                    <div className="r_hni_i" dangerouslySetInnerHTML={{ __html: this.icon }}></div>

                    // <img className="r_hni_i" src={this.icon} alt={this.key} />
                )}
                <div className={classListOfText.join(" ")}>{this.key}</div>
            </div>
        );
    }
}
