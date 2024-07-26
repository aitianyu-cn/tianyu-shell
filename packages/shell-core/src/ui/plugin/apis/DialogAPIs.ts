/** @format */

import { Missing } from "@aitianyu.cn/tianyu-store";
import { CallbackActionT, guid } from "@aitianyu.cn/types";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import {
    ITianyuShellCoreUIDialog,
    ITianyuShellCoreUIDialogLayer,
    ITianyuShellUIDialogCallbackValue,
    TianyuShellUIDialogButtons,
    TianyuShellUIDialogType,
} from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { getDialogInstanceId } from "../../tools/InstanceHelper";
import { DialogInterface } from "../interface/DialogInterfaceExpose";

const DialogLayerGlobalAPI: ITianyuShellCoreUIDialogLayer = {
    count: function (): number {
        const count = getStore().selecte(DialogInterface.layer.count(getDialogInstanceId()));
        return count instanceof Missing ? 0 : count;
    },
    create: async function (): Promise<string | null> {
        const layerId = guid();
        await getStore().dispatch(DialogInterface.layer.add(getDialogInstanceId(), layerId));

        const added = getStore().selecte(DialogInterface.layer.exist(getDialogInstanceId(), layerId));
        return added instanceof Missing || !added ? null : layerId;
    },
    layers: function (): string[] {
        const allLayer = getStore().selecte(DialogInterface.layer.all(getDialogInstanceId()));
        return allLayer instanceof Missing ? [] : allLayer;
    },
    switch: function (layerId: string): void {
        void getStore().dispatch(DialogInterface.layer.switch(getDialogInstanceId(), layerId));
    },
    remove: function (layerId: string): void {
        void getStore().dispatch(DialogInterface.layer.remove(getDialogInstanceId(), layerId));
    },
    current: function (): string {
        const currentLayerId = getStore().selecte(DialogInterface.layer.current.id(getDialogInstanceId()));
        return currentLayerId instanceof Missing ? "" : currentLayerId;
    },
    index: function (): number {
        const index = getStore().selecte(DialogInterface.layer.current.index(getDialogInstanceId()));
        return index instanceof Missing ? 0 : index;
    },
};

export const DialogGlobalAPIs: ITianyuShellCoreUIDialog = {
    layer: DialogLayerGlobalAPI,
    open: function (
        element: string | TianyuUI,
        button?: TianyuShellUIDialogButtons | undefined,
        type?: TianyuShellUIDialogType | undefined,
        close?: boolean | undefined,
        callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue> | undefined,
    ): string {
        const dialogId = guid();
        void getStore().dispatch(
            DialogInterface.open(getDialogInstanceId(), {
                id: dialogId,
                element,
                button,
                type,
                close,
                callback,
            }),
        );

        return dialogId;
    },
    close: function (id: string): void {
        void getStore().dispatch(DialogInterface.close(getDialogInstanceId(), id));
    },
    isOpen: function (id?: string | undefined): boolean {
        const isOpen = getStore().selecte(DialogInterface.isOpen(getDialogInstanceId(), id || ""));
        return isOpen instanceof Missing ? false : isOpen;
    },
};
