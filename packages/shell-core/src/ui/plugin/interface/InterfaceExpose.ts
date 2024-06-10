/** @format */

import { BackgroundExpose } from "./BackgroundInterfaceExpose";
import { MessageExpose } from "./MessageInterfaceExpose";
import { StoreType } from "./StoreTypes";
import { StylingExpose } from "./StylingInterfaceExpose";

export const StoreInterfaceExpose = {
    [StoreType.BACKGROUND_STORE_TYPE]: BackgroundExpose,
    [StoreType.MESSAGE_STORE_TYPE]: MessageExpose,
    [StoreType.STYLING_STORE_TYPE]: StylingExpose,
};
