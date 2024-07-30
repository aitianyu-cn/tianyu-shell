/** @format */

import {
    ActionFactor,
    ITianyuStoreInterface,
    ITianyuStoreInterfaceImplementation,
    SelectorFactor,
    StoreUtils,
} from "@aitianyu.cn/tianyu-store";
import {
    AddClassAction,
    AddStyleAction,
    AppendElementInto,
    AppendMajorElement,
    CreateMajorActionCreator,
    DestroyManjorActionCreator,
    RemoveClassAction,
    RemoveElementFrom,
    RemoveMajorElement,
    ResetAllAction,
    ResetClassAction,
    ResetStylingAction,
} from "./action/MajorAction";
import { IMajorState } from "./state/MajorState";
import { StoreType } from "./StoreTypes";
import {
    _GetMajorClassInfo,
    _GetMajorLayer,
    _GetMajorStylingInfo,
    GetElementByClassName,
    GetElementById,
    GetElementByTagName,
    GetMajorClassList,
    GetMajorLayerId,
    GetMajorStylings,
    GetNewElement,
} from "./selector/MajorSelector";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";

export const MajorInterface = {
    core: {
        creator: CreateMajorActionCreator,
        destroy: DestroyManjorActionCreator,
    },

    internal: {
        _resetClasses: ResetClassAction,
        _getMajorLayer: _GetMajorLayer,
        _getMajorClassInfo: _GetMajorClassInfo,
        _getMajorStylingInfo: _GetMajorStylingInfo,
    },

    layer: {
        addClass: AddClassAction,
        addStyle: AddStyleAction,
        removeClass: RemoveClassAction,
        resetStyling: ResetStylingAction,
        reset: ResetAllAction,

        getId: GetMajorLayerId,
        getClasses: GetMajorClassList,
        getStyling: GetMajorStylings,
    },

    major: {
        append: AppendMajorElement,
        appendInto: AppendElementInto,
        remove: RemoveMajorElement,
        removeFrom: RemoveElementFrom,

        getElementById: GetElementById,
        getElementByClassName: GetElementByClassName,
        getElementByTagName: GetElementByTagName,
        create: GetNewElement,
    },
};

export const MajorListenerExpose = {
    internal: {
        _getMajorClassInfo: SelectorFactor.makeVirtualMxingSelector<
            void,
            {
                layer: {
                    layerId: string;
                    layerRoot: HTMLElement | null;
                };
                classNames: string[];
            }
        >(),
        _getMajorStylingInfo: SelectorFactor.makeVirtualMxingSelector<
            void,
            {
                layer: {
                    layerId: string;
                    layerRoot: HTMLElement | null;
                };
                stylings: TianyuUIStyleDeclaration;
            }
        >(),
    },
};

export const MajorExpose = {
    layer: {
        addClass: ActionFactor.makeVirtualAction<IMajorState, string[]>(),
        addStyle: ActionFactor.makeVirtualAction<IMajorState, (string | TianyuUIStyleDeclaration)[]>(),
        removeClass: ActionFactor.makeVirtualAction<IMajorState, string | string[]>(),
        resetStyling: ActionFactor.makeVirtualAction<IMajorState>(),
        reset: ActionFactor.makeVirtualAction<IMajorState>(),

        getId: SelectorFactor.makeVirtualSelector<IMajorState, string>(),
        getClasses: SelectorFactor.makeVirtualSelector<IMajorState, string[]>(),
        getStyling: SelectorFactor.makeVirtualSelector<IMajorState, TianyuUIStyleDeclaration>(),
    },

    major: {
        append: ActionFactor.makeVirtualAction<IMajorState, HTMLElement | TianyuUI>(),
        appendInto: ActionFactor.makeVirtualAction<
            IMajorState,
            {
                target: string | HTMLElement;
                element: HTMLElement | TianyuUI;
            }
        >(),
        remove: ActionFactor.makeVirtualAction<IMajorState, string | HTMLElement | TianyuUI>(),
        removeFrom: ActionFactor.makeVirtualAction<
            IMajorState,
            {
                target: string | HTMLElement;
                element: string | HTMLElement | TianyuUI;
            }
        >(),

        getElementById: SelectorFactor.makeVirtualConstantSelector<HTMLElement[], string>(),
        getElementByClassName: SelectorFactor.makeVirtualConstantSelector<Element[], string>(),
        getElementByTagName: SelectorFactor.makeVirtualConstantSelector<Element[], string>(),
        create: SelectorFactor.makeVirtualConstantSelector<
            TianyuUI,
            {
                type: keyof HTMLElementTagNameMap;
                id?: string;
            }
        >(),
    },
};

MajorInterface as ITianyuStoreInterface<IMajorState>;
MajorListenerExpose as ITianyuStoreInterfaceImplementation;
MajorExpose as ITianyuStoreInterfaceImplementation;

StoreUtils.registerExpose(MajorListenerExpose, StoreType.MAJOR_STORE_TYPE);
StoreUtils.registerExpose(MajorExpose, StoreType.MAJOR_STORE_TYPE);
