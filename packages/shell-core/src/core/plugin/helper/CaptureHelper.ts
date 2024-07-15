/** @format */

import { ICapturePrintItem } from "../store/State";

export function download(fileName: string, baseTime: number, list: ICapturePrintItem[]): void {
    const result = JSON.stringify({
        config: {
            baseTime: baseTime,
        },
        trace: list,
    });

    // create a hyper link to download
    const link = document.createElement("a");
    if (typeof Blob !== "undefined") {
        // to create a temp file link
        const file = new Blob([result], { type: "text/plain" });
        // set link url
        link.href = URL.createObjectURL(file);
        // set download file name
        link.download = `${fileName}.json`;
        // to virtual click and download file
        link.click();
    }
}

export function captureNameGenerator(classify: string, id: string, count: number): string {
    const cidMsg = count === 0 ? "" : ` (${count})`;
    const captureName = `${classify} - ${id}${cidMsg}`;
    return captureName;
}
