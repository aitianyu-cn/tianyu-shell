/** @format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { ITianyuShellCoreUIMajor, ITianyuShellCoreUIMajorHelper } from "shell-core/src/core/declares/ui/UserInterface";
import { getStore } from "shell-core/src/core/utils/Store";
import { MajorInterface } from "../interface/MajorInterfaceExpose";
import { getMajorInstanceId } from "../../tools/InstanceHelper";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { Missing } from "@aitianyu.cn/tianyu-store";

export const MajorHelperGlobalAPIs: ITianyuShellCoreUIMajorHelper = {
    addClass: function (...classNames: string[]): void {
        void getStore().dispatch(MajorInterface.layer.addClass(getMajorInstanceId(), classNames));
    },
    addStyle: function (...styles: (string | TianyuUIStyleDeclaration)[]): void {
        void getStore().dispatch(MajorInterface.layer.addStyle(getMajorInstanceId(), styles));
    },
    removeClass: function (className: string): void {
        void getStore().dispatch(MajorInterface.layer.removeClass(getMajorInstanceId(), className));
    },
    resetStyle: function (): void {
        void getStore().dispatch(MajorInterface.layer.resetStyling(getMajorInstanceId()));
    },
    reset: function (): void {
        void getStore().dispatch(MajorInterface.layer.reset(getMajorInstanceId()));
    },
};

export const MajorGlobalAPIs: ITianyuShellCoreUIMajor = {
    helper: MajorHelperGlobalAPIs,

    append: function (element: HTMLElement | TianyuUI): void {
        void getStore().dispatch(MajorInterface.major.append(getMajorInstanceId(), element));
    },
    appendInto: function (target: string | HTMLElement, element: HTMLElement | TianyuUI): void {
        void getStore().dispatch(MajorInterface.major.appendInto(getMajorInstanceId(), { target, element }));
    },
    remove: function (element: HTMLElement | TianyuUI | string): void {
        void getStore().dispatch(MajorInterface.major.remove(getMajorInstanceId(), element));
    },
    removeFrom: function (target: string | HTMLElement, element: HTMLElement | TianyuUI | string): void {
        void getStore().dispatch(MajorInterface.major.removeFrom(getMajorInstanceId(), { target, element }));
    },
    getElementById: function (elemId: string): HTMLElement[] {
        const elementWithMissing = getStore().selecte(
            MajorInterface.major.getElementById(getMajorInstanceId(), elemId),
        );
        return elementWithMissing instanceof Missing ? [] : elementWithMissing;
    },
    getElementByClassName: function (className: string): Element[] {
        const elementWithMissing = getStore().selecte(
            MajorInterface.major.getElementByClassName(getMajorInstanceId(), className),
        );
        return elementWithMissing instanceof Missing ? [] : elementWithMissing;
    },
    getElementByTagName: function (tagName: string): Element[] {
        const elementWithMissing = getStore().selecte(
            MajorInterface.major.getElementByTagName(getMajorInstanceId(), tagName),
        );
        return elementWithMissing instanceof Missing ? [] : elementWithMissing;
    },
    createElement: function (type: keyof HTMLElementTagNameMap, id?: string): TianyuUI {
        return getStore().selecteWithThrow(MajorInterface.major.create(getMajorInstanceId(), { type, id }));
    },
};
