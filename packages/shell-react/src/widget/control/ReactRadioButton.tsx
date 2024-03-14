/**@format */

import React from "react";
import { isMobile } from "shell-core/index";
import { IReactRadioButtonProperty } from "shell-react/src/model/RadioButton";
import { IReactState } from "shell-react/src/model/React";
import { ISingleSelector } from "shell-react/src/model/Selector";
import {
    handle_radioBase,
    handle_radioButton,
    handle_radioContainer,
    handle_radioText,
} from "shell-react/src/style/control/RadioButtonHandler";

export class ReactRadioButton extends React.Component<IReactRadioButtonProperty, IReactState> {
    private selector: ISingleSelector;
    private isLoaded: boolean;
    private isSelected: boolean;

    private isWorking: boolean;
    private opacity: number;

    public constructor(props: IReactRadioButtonProperty) {
        super(props);

        this.isSelected = !!props.selected;
        this.isLoaded = false;
        this.selector = props.group.join(this.onUnselect.bind(this), this.props.id);

        this.isWorking = false;
        this.opacity = this.isSelected ? 100 : 0;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;
        this.selector.leave();
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isLoaded) {
            super.forceUpdate(callback);
        }
    }

    public override render(): React.ReactNode {
        return (
            <div style={handle_radioBase()} onClick={isMobile ? this.onSelect.bind(this) : undefined}>
                <div style={handle_radioContainer(this.props)} onClick={isMobile ? undefined : this.onSelect.bind(this)}>
                    <div style={handle_radioButton(this.props, this.opacity)} />
                </div>
                <div style={handle_radioText(this.props)}>{this.props.value}</div>
            </div>
        );
    }

    private onUnselect(): void {
        if (this.isWorking) {
            return;
        }

        if (this.isSelected) {
            this.isWorking = true;
            this.isSelected = false;

            this.selectionChangeAnimation(false);
        }
    }
    private onSelect(): void {
        if (this.isWorking) {
            return;
        }

        if (this.isSelected) {
            return;
        }

        if (this.selector.select()) {
            this.isWorking = true;
            this.isSelected = true;

            this.selectionChangeAnimation(true);
        }
    }

    private selectionChangeAnimation(direct: boolean): void {
        if (direct) {
            // unselect -> select
            if (this.opacity >= 100) {
                this.isWorking = false;
            } else {
                this.opacity += 3;
                this.forceUpdate();
                window.setTimeout(() => {
                    this.selectionChangeAnimation(true);
                }, 1);
            }
        } else {
            if (this.opacity <= 0) {
                this.isWorking = false;
            } else {
                this.opacity -= 3;
                this.forceUpdate();
                window.setTimeout(() => {
                    this.selectionChangeAnimation(false);
                }, 1);
            }
        }
    }
}
