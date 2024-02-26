/**@format */

import { CallbackActionT } from "@aitianyu.cn/types";

/** Tianyu Shell Default UI Element Event definiation */
export type TianyuUIEvent = {
    [eventName in keyof HTMLElementEventMap]?: CallbackActionT<HTMLElementEventMap[eventName]>;
};
