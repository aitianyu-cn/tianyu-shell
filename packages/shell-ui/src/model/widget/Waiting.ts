/**@format */

export interface IWaitingDialogImage {
    data: any;
    type: "base64" | "svg";
}

export interface IWaitingDialogOptions {
    styles?: string[];
    fontStyles?: string[];
    onePlat?: boolean;
}
