/** @format */

import { BackgroundExpose } from "./BackgroundInterfaceExpose";
import { MessageExpose } from "./MessageInterfaceExpose";
import { StoreType } from "./StoreTypes";

export const StoreInterfaceExpose = {
    [StoreType.BACKGROUND_STORE_TYPE]: BackgroundExpose,
    [StoreType.MESSAGE_STORE_TYPE]: MessageExpose,
};
