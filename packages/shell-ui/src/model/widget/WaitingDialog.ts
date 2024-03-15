/**@format */

import { IImageData } from "shell-ui/src/common/Declaration";

export interface IWaitingDialogProps {
    text?: string;
    image?: IImageData;
    styles?: string[];
    fontStyles?: string[];
    onePlat?: boolean;
}
