/**@format */

import React from "react";
import { IReactRadioButtonProperty } from "shell-react/src/model/RadioButton";

export function handle_radioBase(): React.CSSProperties {
    return {
        display: "flex",
    };
}

export function handle_radioContainer(props: IReactRadioButtonProperty): React.CSSProperties {
    const size = props.size || 16;

    return {
        marginTop: "auto",
        marginBottom: "auto",
        width: size,
        height: size,
        borderRadius: size,
        border: props.border || "1px var(--ts_ui_blk_7) solid",
        backgroundColor: props.color || "#ffffff00",
    };
}

export function handle_radioButton(props: IReactRadioButtonProperty, opacity: number): React.CSSProperties {
    const size = props.size || 16;
    const selectSize = size / 2;

    return {
        width: selectSize,
        height: selectSize,
        borderRadius: selectSize,
        margin: (size - selectSize) / 2,
        opacity: `${opacity}%`,
        backgroundColor: props.selectedColor || "var(--ts_ui_blk_2)",
    };
}

export function handle_radioText(props: IReactRadioButtonProperty): React.CSSProperties {
    return {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: props.insideMargin || 10,
        userSelect: "none" as any,
    };
}
