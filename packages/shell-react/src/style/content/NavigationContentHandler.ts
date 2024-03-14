/**@format */

import React from "react";
import { IAnimationIndex } from "shell-ui/src/common/Declaration";
import { GlobalStyling } from "shell-ui/src/common/GlobalStyling";

export const REACT_NAVIGATION_CONTENT_ID = "ts_global_react_navigation_content";

const REACT_NAVIGATION_CONTENT_BASIC_IN_ANIMATION = `${REACT_NAVIGATION_CONTENT_ID}_basic_in_animation`;

export function handle_basicContainer(): React.CSSProperties {
    return {
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: "var(--ts_ui_major_base_zindex)",
        overflowY: "auto",
        overflowX: "hidden",
        animation: " r_n_c_b_in 0.25s forwards",
    };
}

export function handle_containerTop(): React.CSSProperties {
    return {
        height: "50px",
        width: "100%",
    };
}

export function handle_contentContainer(): React.CSSProperties {
    return {
        height: "calc(100vh - 50px)",
        width: "100%",
    };
}

export function createAnimation(): IAnimationIndex {
    const animations = {
        image: `@keyframes ${REACT_NAVIGATION_CONTENT_BASIC_IN_ANIMATION} {
                    0% {
                        transform: translate3d(0, -100%, 0);
                    }
                    
                    100% {
                        transform: translate3d(0, 0, 0);
                    }
                }
            `,
    };

    return GlobalStyling.insertStylingSheet(animations);
}
