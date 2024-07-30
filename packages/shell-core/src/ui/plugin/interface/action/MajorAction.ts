/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ArrayHelper, guid, ObjectHelper } from "@aitianyu.cn/types";
import { IMajorState } from "../state/MajorState";
import { TianyuShellUIMajorPreious } from "shell-core/src/ui/common/Declare";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { StyleHelper } from "shell-core/src/ui/resources/StyleHelper";
import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { generateMajorElement } from "../../handler/MajorHandler";
import * as MessageBundle from "../../../resources/i18n/Message";
import { Log } from "shell-core/src/core/plugin/Console";
import { _GetMajorLayer } from "../selector/MajorSelector";
import { TianyuUIMajorInvalidException } from "shell-core/src/ui/common/UIException";

export const CreateMajorActionCreator = ActionFactor.makeCreateStoreAction<IMajorState>().withReducer(function () {
    return {
        layerId: `${TianyuShellUIMajorPreious}_${guid()}`,
        classList: [],
        styleList: {},
    };
});

export const DestroyManjorActionCreator = ActionFactor.makeDestroyStoreAction();

export const AddClassAction = ActionFactor.makeActionCreator<IMajorState, string[]>().withReducer(function (
    state,
    classNames,
) {
    const newState = ObjectHelper.clone(state) as IMajorState;
    newState.classList = ArrayHelper.merge(newState.classList, classNames);
    return newState;
});

export const AddStyleAction = ActionFactor.makeActionCreator<IMajorState, (string | TianyuUIStyleDeclaration)[]>()
    .withHandler(function* ({ params: styles }) {
        const classNames: string[] = [];
        const styleList: TianyuUIStyleDeclaration[] = [];

        for (const newStyle of styles) {
            if (typeof newStyle === "string") {
                classNames.push(newStyle);
            } else {
                styleList.push(newStyle);
            }
        }

        return {
            classes: classNames,
            styling: styleList,
        };
    })
    .withReducer(function (state, data) {
        const newState = ObjectHelper.clone(state) as IMajorState;
        newState.classList = ArrayHelper.merge(newState.classList, data.classes);
        newState.styleList = StyleHelper.merge(newState.styleList, ...data.styling);
        return newState;
    });

export const RemoveClassAction = ActionFactor.makeActionCreator<IMajorState, string | string[]>()
    .withHandler(function* ({ params: classes }) {
        return Array.isArray(classes) ? classes : [classes];
    })
    .withReducer(function (state, data) {
        const newState = ObjectHelper.clone(state) as IMajorState;
        newState.classList = newState.classList.filter((className) => !data.includes(className));
        return newState;
    });

export const ResetStylingAction = ActionFactor.makeActionCreator<IMajorState>().withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["styleList"], {});
});

export const ResetClassAction = ActionFactor.makeActionCreator<IMajorState>().withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["classList"], []);
});

export const ResetAllAction = ActionFactor.makeActionCreator<IMajorState>().withHandler(function* ({ instanceId }) {
    yield* StoreUtils.Handler.doAction(ResetClassAction(instanceId));
    yield* StoreUtils.Handler.doAction(ResetStylingAction(instanceId));
});

export const AppendMajorElement = ActionFactor.makeActionCreator<IMajorState, HTMLElement | TianyuUI>().withHandler(
    function* ({ instanceId, params: element }) {
        const renderElement = generateMajorElement(element);
        if (!renderElement) {
            Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
            return;
        }

        const layer = yield* StoreUtils.Handler.doSelectorWithThrow(_GetMajorLayer(instanceId));
        if (!layer.layerRoot) {
            throw new TianyuUIMajorInvalidException(layer.layerId);
        }

        layer.layerRoot.appendChild(renderElement);
    },
);

export const AppendElementInto = ActionFactor.makeActionCreator<
    IMajorState,
    {
        target: string | HTMLElement;
        element: HTMLElement | TianyuUI;
    }
>().withHandler(function* ({ params }) {
    let renderElement = generateMajorElement(params.element);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${params.element}`));
        return;
    }

    let rootElement = generateMajorElement(params.target);
    if (!rootElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${params.target}`));
        return;
    }

    rootElement.appendChild(renderElement);
});

export const RemoveMajorElement = ActionFactor.makeActionCreator<
    IMajorState,
    HTMLElement | TianyuUI | string
>().withHandler(function* ({ instanceId, params: element }) {
    let renderElement = generateMajorElement(element, true);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${element}`));
        return;
    }

    const layer = yield* StoreUtils.Handler.doSelectorWithThrow(_GetMajorLayer(instanceId));
    if (!layer.layerRoot) {
        throw new TianyuUIMajorInvalidException(layer.layerId);
    }

    layer.layerRoot.removeChild(renderElement);
});

export const RemoveElementFrom = ActionFactor.makeActionCreator<
    IMajorState,
    {
        target: string | HTMLElement;
        element: string | HTMLElement | TianyuUI;
    }
>().withHandler(function* ({ params }) {
    let renderElement = generateMajorElement(params.element, true);
    if (!renderElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${params.element}`));
        return;
    }

    let rootElement = generateMajorElement(params.target);
    if (!rootElement) {
        Log.error(MessageBundle.getText("TIANYU_UI_MAJOR_GENERATE_NULL_ELEMENT", `${params.target}`));
        return;
    }

    rootElement.removeChild(renderElement);
});
