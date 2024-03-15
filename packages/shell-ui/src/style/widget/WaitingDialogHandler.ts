/**@format */

import { IGlobalStyleSheetIndex, Utils } from "shell-core/index";

export const UI_WAITING_DIALOG_ID = "ts_global_ui_wait_dialog";

const TEXT_ANIMATION_KEY = `${UI_WAITING_DIALOG_ID}_t_animation`;
const IMAGE_ANIMATION_KEY = `${UI_WAITING_DIALOG_ID}_i_animation`;

export function handle_basicContainer(elem: HTMLElement): void {
    elem.style.height = "100vh";
    elem.style.width = "100vw";
    elem.style.display = "grid";
    elem.style.textAlign = "center";
    elem.style.alignContent = "center";
    elem.style.alignItems = "center";
    elem.style.alignSelf = "center";
    elem.style.marginLeft = "auto";
    elem.style.marginRight = "auto";
    elem.style.position = "absolute";
    elem.style.backgroundColor = "var(--ts_ui_bgc)";
}

export function handle_text(elem: HTMLElement): void {
    elem.style.color = "var(--ts_ui_blk_6)";
    elem.style.marginLeft = "auto";
    elem.style.marginRight = "auto";
    elem.style.userSelect = "none";
    elem.style.fontSize = "30px";
}

export function handle_waitingIcon(elem: HTMLElement): void {
    elem.style.width = "25%";
    elem.style.marginLeft = "auto";
    elem.style.marginRight = "auto";
    elem.style.marginBottom = "0px";
    elem.style.opacity = "0%";
    elem.style.maxWidth = "150px";
}

export function handle_textAnimation(elem: HTMLElement): void {
    elem.style.fontSize = "20px";
    elem.style.animation = `${TEXT_ANIMATION_KEY} 1s forwards 3s`;
}

export function handle_imageAnimation(elem: HTMLElement): void {
    elem.style.animation = `${IMAGE_ANIMATION_KEY} 2.5s infinite`;
}

export function createAnimation(): IGlobalStyleSheetIndex {
    const animations = {
        image: `@keyframes ${IMAGE_ANIMATION_KEY} {
                    0% {
                        opacity: 0%;
                        transform: rotateY(0deg);
                    }
                    40% {
                        opacity: 100%;
                        transform: rotateY(360deg);
                    }
                    60% {
                        opacity: 100%;
                        transform: rotateY(360deg);
                    }
                    100% {
                        opacity: 0%;
                        transform: rotateY(0deg);
                    }
                }
            `,
        text: `@keyframes ${TEXT_ANIMATION_KEY} {
                0% {
                    opacity: 100%;
                }
                100% {
                    opacity: 0%;
                }
            }`,
    };

    return Utils.GlobalStyling.insertStylingSheet(animations);
}
