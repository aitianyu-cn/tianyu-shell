/**@format */

import React from "react";
import { isMobile } from "shell-core/index";
import { IReactState } from "shell-react/src/model/React";
import { IReactToggleProperty } from "shell-react/src/model/Toggle";

export class ReactToggle extends React.Component<IReactToggleProperty, IReactState> {
    private toggleState: boolean;

    private actualSize: number;
    private additionLenght: number;
    private marginLeft: number;
    private borderRadio: number;

    private isWorking: boolean;

    public constructor(props: IReactToggleProperty) {
        super(props);

        this.isWorking = false;
        this.toggleState = !!props.defaultState;

        this.actualSize = props.size || 50;
        this.additionLenght = props.lineLenght || this.actualSize / 4;
        this.marginLeft = this.toggleState ? this.actualSize + this.additionLenght : 0;
        this.borderRadio =
            typeof this.props.borderRadio === "number"
                ? this.props.borderRadio
                : typeof this.props.type === "undefined" || this.props.type === "default"
                ? this.actualSize / 2
                : 5;
    }

    public override render(): React.ReactNode {
        const { isMobile, baseStyle, innerStyle, selected, buttonStyle } = this.generateStyles();

        return (
            <div style={baseStyle}>
                <div style={innerStyle}>
                    <div style={selected} onClick={isMobile ? this.onClick.bind(this) : undefined}>
                        <div style={buttonStyle} onClick={isMobile ? undefined : this.onClick.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }

    public override componentDidMount(): void {
        // window.setInterval(this.onClick.bind(this), 500);
    }

    private generateStyles() {
        const baseStyle = {
            ...this.props.style,
            height: this.actualSize,
            width: this.actualSize * 2 + this.additionLenght,
        };
        const innerStyle = {
            width: "100%",
            height: "100%",
            borderRadius: this.borderRadio,
            border: this.props.border || "1px var(--ts_ui_blk_7) solid",

            backgroundColor: this.props.unSelectedBackground || "var(--ts_ui_blk_8)",
        };

        const selected = {
            height: this.actualSize,
            width: this.marginLeft + this.actualSize,
            borderRadius: this.borderRadio,
            backgroundColor: this.props.selectedBackground || "var(--ts_ui_blk_17)",
        };

        const buttonStyle = {
            width: this.actualSize,
            height: this.actualSize,
            borderRadius: this.borderRadio,

            backgroundColor: this.props.toggleColor || "var(--ts_ui_blk_2)",
            marginLeft: this.marginLeft,
        };

        return { isMobile, baseStyle, innerStyle, selected, buttonStyle };
    }

    private onClick(): void {
        if (this.isWorking) {
            return;
        }

        this.isWorking = true;
        this.toggleState = !this.toggleState;

        this.onStateChange(this.toggleState);
        this.props.onStateChange?.(this.props.id, this.toggleState);

        const totalLenght = this.actualSize + this.additionLenght;
        const step = totalLenght / 30;
        const fnMove = () => {
            if (this.toggleState && this.marginLeft < this.actualSize + this.additionLenght) {
                this.marginLeft = this.marginLeft + step > totalLenght ? totalLenght : this.marginLeft + step;
                this.forceUpdate();
                setTimeout(fnMove, 1);
            } else if (!this.toggleState && this.marginLeft > 0) {
                this.marginLeft = this.marginLeft - step < 0 ? 0 : this.marginLeft - step;
                this.forceUpdate();
                setTimeout(fnMove, 1);
            } else {
                this.isWorking = false;
            }
        };

        fnMove();
    }

    protected onStateChange(state: boolean): void {}
}
