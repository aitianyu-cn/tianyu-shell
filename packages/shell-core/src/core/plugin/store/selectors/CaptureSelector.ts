/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { CaptureOperationType, ICaptureRecordItem, ITianyuShellCoreState } from "../State";
import { ObjectHelper } from "@aitianyu.cn/types";

export const _GetClassifyId = SelectorFactor.makeParameterSelector<
    ITianyuShellCoreState,
    {
        classify: string;
        id: string;
    },
    number
>(function (state, data) {
    const idCound = state.capture.classifies[data.classify]?.[data.id];
    return typeof idCound === "number" ? idCound : /* istanbul ignore next */ 0;
});

export const _GetCaptureRecord = SelectorFactor.makeParameterSelector<
    ITianyuShellCoreState,
    string,
    ICaptureRecordItem | null
>(function (state, guid) {
    const item = state.capture.list.find((cap) => cap.guid === guid);
    return item || null;
});

export const _GetAllCaptureRecords = SelectorFactor.makeSelector<ITianyuShellCoreState, ICaptureRecordItem[]>(function (
    state,
) {
    return ObjectHelper.clone(state.capture.list);
});

export const _GetCaptureBaseTime = SelectorFactor.makeSelector<ITianyuShellCoreState, number>(function (state) {
    return state.capture.time;
});

export const GetLastOperation = SelectorFactor.makeSelector<
    ITianyuShellCoreState,
    {
        type: CaptureOperationType;
        message: string;
    }
>(function (state) {
    return {
        type: state.capture.operationType,
        message: state.capture.operationMsg,
    };
});
