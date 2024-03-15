/**@format */

import { isMobile } from "shell-core/index";
import { ReactNavigationViewMode, ReactNavigationViewResize } from "shell-react/src/model/Navigation";

export const DEFAUTL_NAVIGATION_VIEW_TYPE = "auto";
export const DEFAULT_NAVIGATION_VIEW_RESIZE: ReactNavigationViewResize = [
    {
        width: 0,
        heigh: 0,
        mode: "horizontal",
        narrow: true,
    },
    {
        width: 500,
        heigh: 0,
        mode: "horizontal",
        narrow: false,
    },
    {
        width: 1000,
        heigh: 300,
        mode: "vertical",
        narrow: true,
    },
    {
        width: 1000,
        heigh: 600,
        mode: "vertical",
        narrow: false,
    },
];

export const DEFAULT_NAVIGATION_VIEW_FONT_MAP: Record<number, number> = {
    [0]: 15,
    [500]: 17,
    [1000]: 19,
};

export function calcViewMode(
    viewMode: ReactNavigationViewMode,
    viewResize: ReactNavigationViewResize,
): {
    mode: ReactNavigationViewMode;
    narrow: boolean;
} {
    // for vertical mode, the all resize handling is in the vertical navigation itself
    if (viewMode === "vertical") {
        return { mode: "vertical", narrow: false };
    }

    const currentPageWidth = isMobile ? window.outerWidth : window.innerWidth;

    let matchedSize: number = -1;
    let minimum: number = -1;
    for (const item of Object.keys(viewResize)) {
        const itemSize = Number.parseInt(item);
        if (Number.isNaN(itemSize) || itemSize < 0) {
            continue;
        }

        // to find the maximum size
        minimum = minimum > itemSize ? itemSize : minimum;

        const nearWidth = currentPageWidth - itemSize;
        if (nearWidth > 0 && itemSize > matchedSize) {
            matchedSize = itemSize;
        }
    }

    matchedSize = matchedSize === -1 ? minimum : matchedSize;
    if (matchedSize === -1) {
        // not found any matched item, to use default setting
        return calcViewMode(viewMode, DEFAULT_NAVIGATION_VIEW_RESIZE);
    }

    // return view resize setting
    return viewResize[matchedSize];
}

export function calcFontSize(fontSizeMap: Record<number, number>): number {
    const currentPageWidth = isMobile ? window.outerWidth : window.innerWidth;

    let matchedSize: number = -1;
    let minimum: number = -1;
    for (const item of Object.keys(fontSizeMap)) {
        const itemSize = Number.parseInt(item);
        if (Number.isNaN(itemSize) || itemSize < 0) {
            continue;
        }

        // to find the maximum size
        minimum = minimum > itemSize ? itemSize : minimum;

        const nearWidth = currentPageWidth - itemSize;
        if (nearWidth > 0 && itemSize > matchedSize) {
            matchedSize = itemSize;
        }
    }

    matchedSize = matchedSize === -1 ? minimum : matchedSize;
    if (matchedSize === -1) {
        // not found any matched item, to use default setting
        return calcFontSize(DEFAULT_NAVIGATION_VIEW_FONT_MAP);
    }

    // return view resize setting
    return fontSizeMap[matchedSize];
}
