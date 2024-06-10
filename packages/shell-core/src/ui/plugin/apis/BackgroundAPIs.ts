/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreUIBackground } from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { getBackgroundInstanceId } from "../../tools/InstanceHelper";
import { VERY_DEFAULT_COLOR } from "../handler/BackgroundHandler";
import { BackgroundInterface } from "../interface/BackgroundInterfaceExpose";

export const BackgroundGlobalAPI: ITianyuShellCoreUIBackground = {
    setColor: (color: string) =>
        void getStore().dispatch(BackgroundInterface.color.set(getBackgroundInstanceId(), color)),
    getColor: () => {
        const color = getStore().selecte(BackgroundInterface.color.get(getBackgroundInstanceId()));
        return color instanceof Missing ? VERY_DEFAULT_COLOR : color;
    },
    removeColor: () => void getStore().dispatch(BackgroundInterface.color.remove(getBackgroundInstanceId())),

    setElement: (element: HTMLElement, id?: string) =>
        void getStore().dispatch(BackgroundInterface.html.set(getBackgroundInstanceId(), { element, id })),
    removeElement: () => void getStore().dispatch(BackgroundInterface.html.clear(getBackgroundInstanceId())),
    clear: () => void getStore().dispatch(BackgroundInterface.control.reset(getBackgroundInstanceId())),
};
